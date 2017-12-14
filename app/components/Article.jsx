import { h } from 'hyperapp'
import { setInnerHtml } from 'lib/helpers'

const Author = ({ author }) =>
  author
    ? <div class='author' oncreate={setInnerHtml(author)} />
    : null

const Date = ({ date }) =>
  date
    ? <div class='date'>{date.format('MMMM Do, Y')}</div>
    : null

const Display = ({ display }) =>
  display
    ? <div class='display'><img src={display} /></div>
    : null

export default props => {
  return (
    <article key={props.name} oncreate={props.oncreate}>
      <header>
        {Display(props)}
        <div class='meta'>
          <div class='author'>{Author(props)}</div>
          {Date(props)}
          <div class='duration'>{Math.ceil(props.duration)} min read</div>
        </div>
      </header>
      <h1 class='title'>
        <a href={`?article=${props.name}`}>
          {props.title}
        </a>
      </h1>
      <div
        class='body'
        oncreate={setInnerHtml(props.body)}
      />
    </article>
  )
}
