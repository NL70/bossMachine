const express = require('express');
const minionsRouter = express.Router()
const db = require('../db')

// GET /api/minions to get an array of all minions
minionsRouter.get('/', (req, res, next) => {
    const minions = db.getAllFromDatabase('minions')
    res.status(200).send(minions)
    next()
})

// POST /api/minions to create a new minion and save it to the database.
minionsRouter.post('/', (req, res, next) => {
    const name = req.body.name
    const title = req.body.title
    const weaknesses = req.body.weaknesses
    const salary = req.body.salary
    if (!name || !title || !weaknesses || !salary) {
        const minion = db.addToDatabase('minions', {name: name, title: title, weaknesses: weaknesses, salary: salary})
        res.status(201).send(minion)        
        next()
    }
    res.status(404).send()
})

//GET /api/minions/:minionId to get a single minion by id.
minionsRouter.get('/:minionId', (req, res, next) => {
    const minion = db.getFromDatabaseById('minions', req.params.minionId) 
    if (minion) {
        res.status(200).send(minion)
        next()
    } else {
        res.status(404).send()
    }
})

// PUT /api/minions/:minionId to update a single minion by id.
minionsRouter.put('/:minionId', (req, res, next) => {
    console.log(req.params.minionId)
    if (db.getFromDatabaseById('minions', req.params.minionId)) {
        const name = req.body.name
        const title = req.body.title
        const salary = req.body.salary
        const weaknesses = req.body.weaknesses
        const id = req.params.minionId
        const minion = db.updateInstanceInDatabase('minions', {id: id, name: name, title: title, salary: salary, weaknesses: weaknesses})        
        res.status(200).send(minion)
        next()
    } else {
        res.status(404).send()
    }
})

// DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete('/:minionId', (req, res, next) => {
    if (db.getFromDatabaseById('minions', req.params.minionId)) {
        db.deleteFromDatabasebyId('minions', req.params.minionId) 
        res.status(204).send()
        next()
    } else {
        res.status(404).send()
    }
})


module.exports = minionsRouter