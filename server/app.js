import React from 'react'
import { StaticRouter as Router } from 'react-router'
import Context from 'react-context-component'

import render from './render'
import App from '../shared/components/App'

const ErrorPage = ({ error }) => (
  <div>
    <h1>Oops there was an error</h1>
    <h2>{ error.toString() }</h2>
    <p>{ error.stack }</p>
  </div>
)

const reactApp = (req, res) => {
  const context = {}
  let HTML
  let status = 200

  const setStatus = (newStatus) => {
    status = newStatus
  }

  try {
    HTML = render(
      <Context setStatus={setStatus}>
        <Router context={context} location={req.url}>
          {/* Hint, what component should we render here? */}
        </Router>
      </Context>
    )
  } catch (error) {
    HTML = render(<ErrorPage error={error} />)
    status = 500
  }

  if (context.url) {
    res.redirect(301, context.url)
  } else {
    res.status(status).send(HTML)
  }
}

export default reactApp
