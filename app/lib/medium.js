import moment from 'moment'
import { parse, renderInline } from 'lib/parser'
import { appendStyle, byDate, isMarkdown } from 'lib/helpers'

const debug = require('debug')('medium')

class Medium {
  constructor () {
    if (!Medium._) Medium._ = this
    return Medium._
  }

  async init (url) {
    this.dat = await new window.DatArchive(url)
  }

  async loadArticle ({ name, ...file }) {
    debug('Loading article', name)
    const body = await this.dat.readFile(`/articles/${name}`)
    const parsed = parse(body)
    if (!parsed.date) parsed.date = moment(file.stat.mtime)
    return { ...file, name, ...parsed }
  }

  async preloadArticles () {
    debug('Pre-loading articles...')
    const files = await this.dat.readdir('/articles', { recursive: true, stat: true })
    const articles = await Promise.all(files.filter(isMarkdown).map(file => this.loadArticle(file)))
    return articles.sort(byDate)
  }

  async loadInfo () {
    debug('Loading info...')
    const info = await this.dat.getInfo()
    const blog = await this.dat.readFile('/blog.json')
      .then(
        config => JSON.parse(config),
        () => { console.error('/blog.json not found') }
      )
    blog.author = renderInline(blog.author)
    info.description = renderInline(info.description)
    debug('Info loaded:', { ...info, ...blog })
    return { ...info, ...blog }
  }

  async loadStyle () {
    debug('Loading style...')
    return this.dat.readFile('/style.css')
      .then(appendStyle)
      .catch(() => { debug('/style.css not found') })
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
