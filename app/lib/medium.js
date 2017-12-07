import { parse } from 'lib/parser'
import { appendStyle, byDate, isMarkdown, logAndReturn } from 'lib/helpers'

class Medium {
  constructor () {
    if (!Medium._) Medium._ = this
    return Medium._
  }

  async init (url) {
    this.dat = await new window.DatArchive(url)
  }

  async preloadArticles () {
    const parseFile = async file => {
      const body = await this.dat.readFile(`/articles/${file.name}`)
      return { ...file, ...parse(body) }
    }
    const parseFiles = files =>
      Promise.all(files.filter(isMarkdown).map(parseFile))
    const sortArticles = articles => articles.sort(byDate)

    return this.dat.readdir('/articles', { recursive: true, stat: true })
      .then(parseFiles, logAndReturn([]))
      .then(sortArticles)
  }

  async loadInfo () {
    this.info = await this.dat.getInfo()
    this.blog = await this.dat.readFile('/blog.json')
      .then(
        config => JSON.parse(config),
        () => { console.error('/blog.json not found') }
      )
    return { ...this.info, ...this.blog }
  }

  async loadStyle () {
    return this.dat.readFile('/style.css')
      .then(appendStyle)
      .catch(() => { console.error('/style.css not found') })
  }

  async fork ({ author, description, photo, title }) {
    const fork = await window.DatArchive.fork(this.dat.url, { title, description })
    const display = `/author.${photo.ext}`
    await fork.unlink(this.blog.display)
    await fork.rmdir('articles', { recursive: true })
    await fork.mkdir('articles')
    await fork.writeFile(display, photo.data, { encoding: 'base64' })
    await fork.writeFile('/blog.json', JSON.stringify({ author, display }))
    const date = (new Date()).toISOString().slice(0, 10)
    await fork.writeFile('articles/hello.md', `date: ${date}\ntitle: First Post\n\nThis is my first post.`)
    await fork.commit()
    return fork.url
  }
}

const instance = new Medium()

export default instance
