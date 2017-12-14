import { h } from 'hyperapp'
import { Router, Route } from 'lib/QueryRouter'

import ArticleList from 'components/ArticleList'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Fork from 'containers/Fork'

export default state => actions => {
  const inject = { state, actions }

  return (
    <main>
      <Header {...inject} />
      <Router>
        <Route page='fork'>
          <Fork {...inject} />
        </Route>
        <Route default>
          <ArticleList {...inject} />
        </Route>
      </Router>
      <Footer />
    </main>
  )
}
