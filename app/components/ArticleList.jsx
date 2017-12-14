import { h } from 'hyperapp'

import Article from 'components/Article'

export default ({ state }) => {
  const shownArticles = state.page
    ? state.articles.filter(({ name }) => name === state.page)
    : state.articles

  return (
    <section class='articles'>
      { shownArticles.map(Article({ ...state.info })) }
    </section>
  )
}
