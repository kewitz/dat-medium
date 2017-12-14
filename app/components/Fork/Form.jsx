import { h } from 'hyperapp'

import 'style/fork.css'
import PhotoPicker from 'components/Fork/PhotoPicker'

export default ({ onSubmit }) =>
  <form onsubmit={onSubmit}>
    <h1>Fork new dat-medium</h1>
    <PhotoPicker />
    <input type='text' id='author' placeholder='Author' />
    <input type='text' id='title' placeholder='Title' />
    <input type='text' id='description' placeholder='Description' />
    <input type='submit' class='button' value='Create' />
  </form>
