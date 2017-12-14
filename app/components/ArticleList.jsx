import { h } from 'hyperapp'

import Article from 'components/Article'

export default ({ state }) => {
  const shownArticles = state.query.article
    ? state.articles.filter(({ name }) => name === state.query.article)
    : state.articles

  return (
    <section class='articles'>
      { shownArticles.map(Article({ ...state.info })) }
    </section>
  )
}
