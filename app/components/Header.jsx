import { h } from 'hyperapp'
import Logo from 'components/Logo'

export default ({ info, title }) =>
  <header>
    <div class='container wide'>
      <a href='/'>
        <div class='brand'>
          <Logo size='40px' />
          {title}
        </div>
      </a>
      <a href='?page=fork' class='button small'>Fork</a>
    </div>
  </header>
