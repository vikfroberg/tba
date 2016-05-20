import React from 'react'
import { renderToString } from 'react-dom/server'

export default (component, state) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>TBA</title>
    <style type="text/css">
      *:not(style):not(title) {
        margin: 0;
        padding: 0;
        background: none;
        color: inherit;
        line-height: 1.5;
        font-family: sans-serif;
        text-align: left;
        font-weight: normal;
        font-size: 16px;
        list-style: none;
        border: none;
        border-radius: 0;
        text-decoration: none;
        box-sizing: border-box;
        -webkit-appearance: none;
      }
      input {
        display: block;
      }
    </style>
  </head>
  <body>
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
