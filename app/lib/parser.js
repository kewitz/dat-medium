import moment from 'moment'
import markdownIt from 'markdown-it'

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

export const parse = article => {
  const [ header, ...text ] = article.split('\n\n')
  const mdBody = text.join('\n\n')
  const body = md.render(mdBody)
  const words = mdBody.match(/\w+/g).length
  const duration = moment.duration(words / WORDS_PER_MINUTE, 'minutes').asMinutes()
  const fields = parseHeaders(header)
  const date = moment(fields.date)

  return Object.assign({}, fields, { body, date, duration })
}
