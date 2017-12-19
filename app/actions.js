import medium from 'lib/medium'
import router from 'router'

const init = (url = window.location.href) => state => async actions => {
  actions.update({ isLoading: true })
  router(state, actions)
  if (state.isBeaker) {
    await medium.init(url)
    await medium.loadStyle()
    const { title, ...info } = await medium.loadInfo()
    const articles = await medium.preloadArticles()
    actions.update({ articles, info, title })
  }
  actions.update({ isLoading: false })
}

const route = route => {
  window.history.pushState({}, '', `?${route.page}`)
  return { route }
}

const fork = params => state => async actions => {
  const url = await medium.fork(params)
  window.location = url
}

const update = newState => newState

export default {
  fork,
  init,
  route,
  update,
}
