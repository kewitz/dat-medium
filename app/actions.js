import medium from 'lib/medium'

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

  actions.navigateByHash()
  window.onhashchange = () => actions.navigateByHash()
}

const navigateByHash = page => {
  page = window.location.hash.slice(1)
  window.scrollTo(0, 0)
  return { page }
}

const fork = params => state => async actions => {
  const url = await medium.fork(params)
  window.location = url
}

export default {
  fork,
  init,
  navigateByHash,
  update: newState => newState,
}