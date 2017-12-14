import { h } from 'hyperapp'
import { parseForm } from 'lib/helpers'

import 'style/fork.css'
import PhotoPicker from 'components/Fork/PhotoPicker'

export default ({ fork }) => {
  const setup = {}
  const update = key => value => { setup.key = value }
  const onSubmit = e => {
    e.preventDefault()
    const form = parseForm(e)
    const { image, author, title, description } = form
    let photo
    if (image) {
      const [ , ext, data ] = image.match(/data:image\/(\w+);base64,(.*)$/)
      photo = { data, ext }
    }
    fork({ author, description, photo, title })
  }

  return (
    <section id='fork'>
      <form onsubmit={onSubmit}>
        <h1>Fork new dat-medium</h1>
        <PhotoPicker onload={update('image')} />
        <input type='text' id='author' placeholder='Author' />
        <input type='text' id='title' placeholder='Title' />
        <input type='text' id='description' placeholder='Description' />
        <input type='submit' class='button' value='Create' />
      </form>
    </section>
  )
}
