import { h } from 'hyperapp'

export default () => {
  const reader = new window.FileReader()
  reader.onload = e => {
    document
      .querySelector('#displayPicture img')
      .setAttribute('src', e.target.result)
    document
      .querySelector('#displayPicture #image')
      .setAttribute('value', e.target.result)
  }

  const handleFileSelect = e => {
    const file = e.target.files[0]
    if (file.type.match('image.*')) reader.readAsDataURL(file)
  }

  const selectImage = () => {
    document
      .querySelector('#displayPicture input')
      .click()
  }

  return (
    <div id='displayPicture' onclick={selectImage}>
      <svg class='overlay' style='width:24px;height:24px' viewBox='0 0 24 24'>
        <path fill='#FFFFFF' d='M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M6,20H15L18,20V12L14,16L12,14L6,20M8,9A2,2 0 0,0 6,11A2,2 0 0,0 8,13A2,2 0 0,0 10,11A2,2 0 0,0 8,9Z' />
      </svg>
      <img />
      <input type='file' id='file' name='file[]' onchange={handleFileSelect} />
      <input type='hidden' id='image' />
    </div>
  )
}
