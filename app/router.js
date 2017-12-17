import { h } from 'hyperapp'
import nanorouter from 'nanorouter'

const router = nanorouter({ default: '/404' })

export const Link = ({ to, ...props }, children) =>
  <a class='Link' onclick={() => router(to)} {...props}>{children}</a>

export const Router = ({ page, routes }) => routes[page] || routes.default

export default (state, actions) => {
  router.on('/', () => actions.route({ page: '/' }))
  router.on('/fork', () => actions.route({ page: '/fork' }))
  router.on('/article/:article', ({ article }) =>
    actions.route({ page: `/article/${article}`, article }))

  router(window.location.search.slice(1))
}
