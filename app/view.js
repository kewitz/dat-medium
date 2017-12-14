import { h } from 'hyperapp'

import ArticleList from 'components/ArticleList'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Fork from 'containers/Fork'

export default state => actions =>
  <main>
    <Header {...state} />
    { (state.page === 'fork')
      ? <Fork {...actions} />
      : <ArticleList {...state} /> }
    <Footer />
  </main>
