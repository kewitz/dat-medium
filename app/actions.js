import medium from 'lib/medium'
import { parseSearchParams } from 'url-search-utils'

const init = (url = window.location.origin) => state => async actions => {
  actions.update({ isLoading: true })
  if (state.isBeaker) {
    await medium.init(url)
    await medium.loadStyle()
    const articles = await medium.preloadArticles()
    const { title, ...info } = await medium.loadInfo()
    actions.update({ articles, info, title })
  }
  actions.update({ isLoading: false })

  actions.navigate()
  window.onhashchange = () => actions.navigate()
}

const navigate = page => {
  const query = parseSearchParams({
    numberparam: 'number',
    strarray: 'array-of-strings',
  })
  if (!page) page = query.page
  return { page }
}

const fork = params => state => async actions => {
  const url = await medium.fork(params)
  window.location = url
}

export default {
  fork,
  init,
  navigate,
  update: newState => newState,
}
