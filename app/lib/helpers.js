export const byDate = (a, b) => {
  const dateA = a.date || a.stat.ctime
  const dateB = b.date || b.stat.ctime
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

export const appendStyle = css => {
  const style = document.createElement('style')
  style.innerHTML = css
  document.head.appendChild(style)
}
