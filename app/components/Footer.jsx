import { h } from 'hyperapp'
import { version } from '../../package.json'

export default () =>
  <footer>
    <div class='container wide'>
      Powered by dat-medium v.{ version }
    </div>
  </footer>
