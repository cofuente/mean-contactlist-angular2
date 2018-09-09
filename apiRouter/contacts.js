const router = require('express').Router()
var mongodb = require('mongodb')
const { db } = require('../server')
var ObjectID = mongodb.ObjectID
var CONTACTS_COLLECTION = 'contacts'

router.get('/api/contacts', function(req, res) {
  db.collection(CONTACTS_COLLECTION)
    .find({})
    .toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, 'Failed to get contacts.')
      } else {
        res.status(200).json(docs)
      }
    })
})

router.post('/api/contacts', function(req, res) {
  var newContact = req.body
  newContact.createDate = new Date()

  if (!req.body.name) {
    handleError(res, 'Invalid user input', 'Must provide a name.', 400)
  } else {
    db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(
      err,
      doc
    ) {
      if (err) {
        handleError(res, err.message, 'Failed to create new contact.')
      } else {
        res.status(201).json(doc.ops[0])
      }
    })
  }
})

/*  "/api/contacts/:id"
   *    GET: find contact by id
   *    PUT: update contact by id
   *    DELETE: deletes contact by id
   */

router.get('/api/contacts/:id', function(req, res) {
  db.collection(CONTACTS_COLLECTION).findOne(
    { _id: new ObjectID(req.params.id) },
    function(err, doc) {
      if (err) {
        handleError(res, err.message, 'Failed to get contact')
      } else {
        res.status(200).json(doc)
      }
    }
  )
})

router.put('/api/contacts/:id', function(req, res) {
  var updateDoc = req.body
  delete updateDoc._id

  db.collection(CONTACTS_COLLECTION).updateOne(
    { _id: new ObjectID(req.params.id) },
    updateDoc,
    function(err, doc) {
      if (err) {
        handleError(res, err.message, 'Failed to update contact')
      } else {
        updateDoc._id = req.params.id
        res.status(200).json(updateDoc)
      }
    }
  )
})

router.delete('/api/contacts/:id', function(req, res) {
  db.collection(CONTACTS_COLLECTION).deleteOne(
    { _id: new ObjectID(req.params.id) },
    function(err, result) {
      if (err) {
        handleError(res, err.message, 'Failed to delete contact')
      } else {
        res.status(200).json(req.params.id)
      }
    }
  )
})

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log('ERROR: ' + reason)
  res.status(code || 500).json({ error: message })
}
module.exports = router
