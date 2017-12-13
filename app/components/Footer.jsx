import { h } from 'hyperapp'
import { version } from '../../package.json'
import Logo from 'components/Logo'

export default () =>
  <footer>
    <Logo size='20px' /> v.{ version }
  </footer>
