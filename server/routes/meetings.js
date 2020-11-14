const express = require('express');
const meetingsRouter = express.Router()
const db = require('../db')

// GET /api/meetings to get an array of all meetings.
meetingsRouter.get('/', (req, res, next) => {
    const meetings = db.getAllFromDatabase('meetings')
    res.status(200).send(meetings)
    next()
})

// POST /api/meetings to create a new meeting and save it to the database.
meetingsRouter.post('/', (req, res, next) => {
    const created = db.createMeeting()
    const meeting = db.addToDatabase('meetings', created)
    res.status(201).send(meeting)
})

// DELETE /api/meetings to delete all meetings from the database.
meetingsRouter.delete('/', (req, res, next) => {
    db.deleteAllFromDatabase('meetings')
    res.status(204).send()
})

module.exports = meetingsRouter