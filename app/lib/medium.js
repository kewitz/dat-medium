import 'lib/DatArchive'
import { parse, renderInline } from 'lib/parser'
import { appendCSS, byDate, isMarkdown } from 'lib/helpers'
import path from 'path'

const debug = require('debug')('medium')

class Medium {
  constructor () {
    if (!Medium._) Medium._ = this
    return Medium._
  }

  async init (url) {
    // Refreshing in Beaker adds a '?' to the URL, so strip out the location origin and any extra ?
    this.basePath = url.replace(window.location.origin, '').replace('?', '')
    this.dat = await new window.DatArchive(url)
  }

  async loadArticle ({ name, ...file }) {
    debug('Loading article', name)
    const body = await this.dat.readFile(path.resolve(this.basePath, `articles/${name}`))
    const parsed = parse(body)
    if (!parsed.date) parsed.date = moment(file.stat.mtime)
    return { ...file, name, ...parsed }
  }

  async preloadArticles () {
    const files = await this.dat.readdir(path.resolve(this.basePath, 'articles'), { recursive: true, stat: true })
    const articles = await Promise.all(files.filter(isMarkdown).map(file => this.loadArticle(file)))
    return articles.sort(byDate)
  }

  async loadInfo () {
    const info = await this.dat.getInfo()
    const blog = await this.dat.readFile(path.resolve(this.basePath, 'blog.json'))
      .then(
        config => JSON.parse(config),
        () => { console.error('blog.json not found') }
      )
    // markdown-it breaks if trying to render an empty string, so make sure we have at least a space
    blog.author = blog.author && renderInline(blog.author || ' ')
    info.description = renderInline(info.description || ' ')
    debug('Info loaded:', { ...info, ...blog })
    return { ...info, ...blog }
  }

  async loadStyle () {
    const exists = await this.dat.exists('/style.css')
    if (exists) {
      appendCSS('/style.css')
      debug('Custom style.css loaded.')
    }
  }

  async fork ({ author, description, photo, title }) {
    const fork = await window.DatArchive.fork(this.dat.url, { title, description })
    // Clean Everything
    await fork.unlink(this.blog.display)
    await fork.rmdir('articles', { recursive: true })
    // Create Files
    const blog = { author }
    await fork.mkdir('articles')
    if (photo) {
      blog.display = `/author.${photo.ext}`
      await fork.writeFile(blog.display, photo.data, { encoding: 'base64' })
    }
    await fork.writeFile('/blog.json', JSON.stringify(blog))
    // Create Default Post
    const date = (new Date()).toISOString().slice(0, 10)
    await fork.writeFile('articles/hello.md', `date: ${date}\ntitle: First Post\n\nThis is my first post.`)
    await fork.commit()
    return fork.url
  }
}

const instance = new Medium()

export default instance
