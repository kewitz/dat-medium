import moment from 'moment'
import markdownIt from 'markdown-it'
import { byDate, isMarkdown, logAndReturn } from 'lib/helpers'

export const md = markdownIt({
  html: true,
  linkify: true,
})

const WORDS_PER_MINUTE = 130

const parseHeaders = header =>
  header
    .split('\n')
    .reduce((acc, field) => {
      const [ key, ...values ] = field.split(':')
      return Object.assign({}, acc, { [key]: values.join('').trim() })
    }, {})

const parse = article => {
  const [ header, ...text ] = article.split('\n\n')
  const mdBody = text.join('\n\n')
  const body = md.render(mdBody)
  const words = mdBody.match(/\w+/g).length
  const duration = moment.duration(words / WORDS_PER_MINUTE, 'minutes').asMinutes()
  const fields = parseHeaders(header)
  const date = moment(fields.date)

  return Object.assign({}, fields, { body, date, duration })
}

export const preloadArticles = async dat => {
  const parseFile = async file => {
    const body = await dat.readFile(`/articles/${file.name}`)
    return { ...file, ...parse(body) }
  }
  const parseFiles = files =>
    Promise.all(files.filter(isMarkdown).map(parseFile))
  const sortArticles = articles => articles.sort(byDate)

  return dat.readdir('/articles', { recursive: true, stat: true })
    .then(parseFiles, logAndReturn([]))
    .then(sortArticles)
}

export const loadInfo = async dat => {
  const info = await dat.getInfo()
  const blog = await dat.readFile('/blog.json')
    .then(
      config => JSON.parse(config),
      () => { console.error('/blog.json not found') }
    )
  return { ...info, ...blog }
}
