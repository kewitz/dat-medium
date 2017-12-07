import { h } from 'hyperapp'

import 'style/fork.css'
import PhotoPicker from 'components/Fork/PhotoPicker'

export default ({ fork }) => {
  const setup = {}
  const update = key => value => { setup.key = value }
  const onSubmit = e => {
    e.preventDefault()

    const [ , image, author, title, description ] = Array.from(e.target).map(a => a.value)
    const [ , ext, data ] = image.match(/data:image\/(\w+);base64,(.*)$/)
    const photo = { ext, data }
    fork({ author, description, photo, title })
  }

  return (
    <section id='fork'>
      <form onsubmit={onSubmit}>
        <h1>Fork new dat-medium</h1>
        <PhotoPicker onload={update('image')} />
        <input type='text' name='author' placeholder='Author' />
        <input type='text' name='title' placeholder='Title' />
        <input type='text' name='description' placeholder='Description' />
        <input type='submit' class='button' value='Create' />
      </form>
    </section>
  )
}
