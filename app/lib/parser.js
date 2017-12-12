import moment from 'moment'
import markdownIt from 'markdown-it'
import implicitFigures from 'markdown-it-implicit-figures'

export const md = markdownIt({
  html: true,
  linkify: true,
})

md.use(implicitFigures, { figcaption: true })

const WORDS_PER_MINUTE = 130

const calculateDuration = text => {
  const words = text.match(/\w+/g).length
  return moment
    .duration(words / WORDS_PER_MINUTE, 'minutes')
    .asMinutes()
}

const parseHeaders = header =>
  header
    .split('\n')
    .reduce((acc, field) => {
      const [ key, ...values ] = field.split(':')
      return { ...acc, [key]: values.join('').trim() }
    }, {})

export const parse = article => {
  let date, fields, header, text
  const hasHeaders = article.match(/^\w+:/)
  if (hasHeaders) {
    [ header, ...text ] = article.split('\n\n')
    fields = parseHeaders(header)
    date = fields.date && moment(fields.date)
    text = text.join('\n\n')
  } else text = article
  const body = md.render(text)
  const duration = calculateDuration(text)

  return { ...fields, body, date, duration }
}
