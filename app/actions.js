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

  actions.navigateByHash()
  window.onhashchange = () => actions.navigateByHash()
}

const navigateByHash = page => {
  page = window.location.hash.slice(1)
  window.scrollTo(0, 0)
  return { page }
}

export default {
  init,
  navigateByHash,
  update: newState => newState,
}
