import { h } from 'hyperapp'

import ArticleList from 'components/ArticleList'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Fork from 'containers/Fork'

export default state => actions => {
  const inject = { state, actions }
  return (
    <main>
      <Header {...inject} />
      { (state.page === 'fork')
        ? <Fork {...inject} />
        : <ArticleList {...inject} /> }
      <Footer />
    </main>
  )
}
