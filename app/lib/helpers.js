export const byDate = (a, b) => {
  const dateA = a.date || a.stat.mtime
  const dateB = b.date || b.stat.mtime
  return dateA > dateB ? -1 : 1
}

export const isMarkdown = ({ name }) =>
  name.match(/\.md$/i)

export const logAndReturn = defaultReturn => err => {
  console.error(err)
  return defaultReturn
}

export const setInnerHtml = html => element => {
  element.innerHTML = html
}

export const makeElement = ({ tag, ...props }) =>
  Object.assign(document.createElement(tag), props)

export const appendCSS = href => {
  const link = makeElement({
    tag: 'link',
    rel: 'stylesheet',
    type: 'text/css',
    href,
  })
  document.head.appendChild(link)
}

export const parseForm = event =>
  Array
    .from(event.target)
    .map(({ id, value }) => ({ [id]: value }))
    .reduce((acc, v) => ({ ...acc, ...v }), {})

export const call = fn => e => e(fn)
