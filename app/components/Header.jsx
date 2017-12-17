import { h } from 'hyperapp'
import Logo from 'components/Logo'
import { Link } from 'router'

export default ({ state }) =>
  <header>
    <div class='container wide'>
      <Link to='/'>
        <div class='brand'>
          <Logo size='40px' />
          {state.title}
        </div>
      </Link>
      <Link to='/fork' class='button small'>Fork</Link>
    </div>
  </header>
