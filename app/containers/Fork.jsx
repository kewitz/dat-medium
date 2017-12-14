import { h } from 'hyperapp'
import { parseForm } from 'lib/helpers'

import 'style/fork.css'
import Form from 'components/Fork/Form'

export default ({ fork }) => {
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
      <Form onSubmit={onSubmit} />
    </section>
  )
}
