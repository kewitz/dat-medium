import { h } from 'hyperapp'

import Article from 'components/Article'

export default ({ actions, state, ...props }) => {
  const isPermalink = state.query.article
  let articles = state.articles
  if (isPermalink) {
    articles = articles.filter(a => a.name === state.query.article)
  }

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
