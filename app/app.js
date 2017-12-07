import { app } from 'hyperapp'
import actions from 'actions'
import state from 'state'
import view from 'view'

import 'style/style.css'

app({ state, view, actions }).init()
