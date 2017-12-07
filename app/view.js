import { h } from 'hyperapp'

import ArticleList from 'components/ArticleList'
import Footer from 'components/Footer'
import Header from 'components/Header'

export default state => actions =>
  <main>
    <Header {...state} />
    <ArticleList {...state} />
    <Footer />
  </main>
