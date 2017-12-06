import { h } from 'hyperapp'
import Logo from 'components/Logo'

export default ({ title }) =>
  <header>
    <div class='container wide'>
      <a href='#'>
        <div class='brand'>
          <Logo size='40px' />
          {title}
        </div>
      </a>
    </div>
  </header>
