import deepEqual from 'deep-equal'
import { call } from 'lib/helpers'
import { parseSearchParams } from 'url-search-utils'

export const Route = (props, children) => conditional =>
  conditional(props)
    ? children
    : null

export const getQuery = () => parseSearchParams({
  numberparam: 'number',
  strarray: 'array-of-strings',
})

export const Router = (props, children) => {
  const query = parseSearchParams({
    numberparam: 'number',
    strarray: 'array-of-strings',
  })
  const queried = p => deepEqual(p, query)
  const isDefault = p => p.default
  const isEmpty = a => a.length === 0
  const notNull = e => e !== null
  const matches = fn => children.map(call(fn)).filter(notNull)

  const byPath = matches(queried)
  return isEmpty(byPath) ? matches(isDefault) : byPath
}
