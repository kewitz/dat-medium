import { h } from 'hyperapp'

import Article from 'components/Article'

export default ({ articles, info, page }) => {
  const shownArticles = page
    ? articles.filter(({ name }) => name === page)
    : articles

  return (
    <section class='articles'>
      <div class='container'>
        { shownArticles.map(Article({ ...info })) }
      </div>
    </section>
  )
}
