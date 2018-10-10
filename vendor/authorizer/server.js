const express = require('express')
const app = express()
const addRequestId = require('express-request-id')()

// Always have a request ID.
app.use(addRequestId)

// Skip authentication for open endpoints and static files
app.all([
  // root path
  /^\/auth\/?$/,

  // Ambassador diagnostics
  /^\/auth\/ambassador\/v0\/diag\/?$/,

  // static files
  /\.(js|css|ico|jpe?g|png|svg)$/
], (req, res) => res.send("OK (skip auth)"))

// Require authentication for all peatio requests
app.all('/auth', (req, res) =>
  // TODO: check for a "x-peatio-dev" header and return default user data
  res.send('OK (authenticated)'))

// Everything else is okay without auth
app.all('*', (req, res) => res.send("OK (skip auth)"))

app.listen(8005, () =>
  console.log('Starting Peatio devauthz server on localhost:8005'))
