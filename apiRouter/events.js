const router = require('express').Router()

router.post('/api/events', function(req, res) {
  console.log(req.body.challenge)
  if (!req.body.challenge) {
    handleError(res, 'no Challege', 400)
  } else {
    res.status(200).send(req.body.challenge)
  }
})

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log('ERROR: ' + reason)
  res.status(code || 500).json({ error: message })
}

module.exports = router
