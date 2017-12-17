import { h } from 'hyperapp'

import Article from 'components/Article'

export default ({ actions, state, ...props }) => {
  const isPermalink = state.route.article
  const articles = isPermalink
    ? state.articles.filter(a => a.name === isPermalink)
    : state.articles

  return (
    <section class='articles'>
      {
        articles.map(article =>
          Article({ ...article, ...state.info })
        )
      }
    </section>
  )
}
