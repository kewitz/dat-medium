import { parse } from 'lib/parser'
import { byDate, isMarkdown, logAndReturn } from 'lib/helpers'

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
    const info = await this.dat.getInfo()
    const blog = await this.dat.readFile('/blog.json')
      .then(
        config => JSON.parse(config),
        () => { console.error('/blog.json not found') }
      )
    return { ...info, ...blog }
  }
}

const instance = new Medium()

export default instance
