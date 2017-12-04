import { h } from 'hyperapp'
import Logo from 'components/Logo'

export default ({ title }) =>
  <header>
    <div class='container wide'>
      <Logo size='40px' />
      {title}
    </div>
  </header>
