const router = require('express').Router()
const { createMessageAdapter } = require('@slack/interactive-messages')
const secret = require('../secret')

const slackInteractions = createMessageAdapter(
  process.env.SLACK_SIGNING_SECRET || secret
)

router.use('/slack/actions', slackInteractions.expressMiddleware())

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log('ERROR: ' + reason)
  res.status(code || 500).json({ error: message })
}

module.exports = router
