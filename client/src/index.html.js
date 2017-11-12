import React from 'react'
import { renderToString } from 'react-dom/server'
import Loading from './components/Loading'

export default function({ htmlWebpackPlugin }) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Sombrio</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <style>
      body {
        font-family: 'Indie Flower', cursive;
        margin: 0;
        user-select: none;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <div id="root">${renderToString(<Loading />)}</div>
  </body>
  </html>
  `
}
