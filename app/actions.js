import medium from 'lib/medium'
import { getQuery } from 'lib/QueryRouter'

const init = (url = window.location.origin) => state => async actions => {
  actions.update({ isLoading: true })
  if (state.isBeaker) {
    await medium.init(url)
    await medium.loadStyle()
    const { title, ...info } = await medium.loadInfo()
    const articles = await medium.preloadArticles()
    actions.update({ articles, info, title })
  }
  actions.update({ isLoading: false })
  actions.navigate()
}

const navigate = page => state => actions => {
  const query = getQuery()
  actions.update({ query })
}

const fork = params => state => async actions => {
  const url = await medium.fork(params)
  window.location = url
}

const update = newState => newState

export default {
  fork,
  init,
  navigate,
  update,
}
