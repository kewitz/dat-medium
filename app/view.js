import { h } from 'hyperapp'

import ArticleList from 'components/ArticleList'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Fork from 'components/Fork/Form.jsx'

export default state => actions =>
  <main>
    <Header {...state} />
    { (state.page === 'fork') && <Fork {...actions} /> }
    <ArticleList {...state} />
    <Footer />
  </main>
