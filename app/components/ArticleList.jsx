import { h } from 'hyperapp'

import Article from 'components/Article'

export default ({ articles, info }) =>
  <section class='articles'>
    <div class='container'>
      {articles.map(Article(info))}
    </div>
  </section>
