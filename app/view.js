import { h } from 'hyperapp'
import { Router } from 'router'

import ArticleList from 'containers/ArticleList'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Fork from 'containers/Fork'

export default state => actions => {
  const inject = { state, actions }

  return (
    <main>
      <Header {...inject} />
      <Router
        page={state.route.page}
        routes={{
          '/fork': <Fork {...inject} />,
          default: <ArticleList {...inject} />,
        }} />
      <Footer />
    </main>
  )
}
