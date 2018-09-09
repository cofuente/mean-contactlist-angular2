const apiRouter = require('express').Router()

// don't forget that these are already mounted on /api!
apiRouter.use('/events', require('./events'))
apiRouter.use('/interactions', require('./interactions'))
apiRouter.use('/contacts', require('./contacts'))

module.exports = apiRouter
