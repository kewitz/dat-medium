import { h } from 'hyperapp'

import ArticleList from 'components/ArticleList'
import Footer from 'components/Footer'
import Header from 'components/Header'

export default state => actions => {
  return (
    <main>
      <Header {...state.info} />
      <ArticleList {...state} />
      <Footer />
    </main>
  )
}
