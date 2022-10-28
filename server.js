import express from 'express'
import http from 'http'
import expressStaticGzip from 'express-static-gzip'

const port = '4200'

const app = express()

app.set('port', port)

// Serve any static build files, offering Brotli compressed versions if supported
app.use(
  expressStaticGzip('dist', {
    enableBrotli: true,
    index: 'dist/index.html',
    orderPreference: ['br'],
  }),
)

// Handle React routing
app.get('/*', (_req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.sendFile('dist/index.html', { root: '.' })
})

const server = http.createServer(app)

server.listen(port, () => console.info(`Listening on port ${port}`))
