import React from 'react'
import { renderToString } from 'react-dom/server'

export default (component, state) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>TBA</title>
    <link rel="stylesheet" href="/reset.css" />
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body class="p2">
    <div id="component">${renderToString(component)}</div>
    <script>
      window.app = {
        state: ${JSON.stringify(state)}
      };
    </script>
    <script src="/bundle.js"></script>
  </body>
  </html>
`
