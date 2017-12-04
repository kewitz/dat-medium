import {
  loadInfo,
  preloadArticles,
} from 'lib/parser'

const init = (url = window.location.origin) => state => async actions => {
  actions.update({ isLoading: true })
  if (state.isBeaker) {
    const dat = await new window.DatArchive(url)
    const articles = await preloadArticles(dat)
    const info = await loadInfo(dat)
    actions.update({ info, dat, articles })
  }
  actions.update({ isLoading: false })
}

export default {
  init,
  update: newState => newState,
}
