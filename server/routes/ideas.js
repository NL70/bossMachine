const express = require('express');
const ideasRouter = express.Router()
const db = require('../db')
const checkMillionDollarIdea = require("../checkMillionDollarIdea")

// GET /api/ideas to get an array of all ideas.
ideasRouter.get('/', (req, res, next) => {
    const ideas = db.getAllFromDatabase('ideas')
    res.status(200).send(ideas)
    next()
})

//POST /api/ideas to create a new idea and save it to the database.
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const name = req.body.name
    const description = req.body.description 
    const numWeeks = req.body.numWeeks
    const weeklyRevenue = req.body.weeklyRevenue
    const idea = db.addToDatabase('ideas', {name: name, description: description, numWeeks: numWeeks, weeklyRevenue: weeklyRevenue})
    if (!name|| !description || !numWeeks || !weeklyRevenue) {
        const idea = db.addToDatabase('ideas', {name: name, description: description, numWeeks: numWeeks, weeklyRevenue: weeklyRevenue})
        res.status(201).send(idea)
        next()
    } else {
        res.status(404).send()
    }
})

// GET /api/ideas/:ideaId to get a single idea by id.
ideasRouter.get('/:ideaId', (req, res, next) => {
    const idea = db.getFromDatabaseById('ideas', req.params.ideaId) 
    if (idea) {
        res.status(200).send(idea)
        next()
    } else {
        res.status(404).send()
    }
})

// PUT /api/ideas/:ideaId to update a single idea by id.
ideasRouter.put('/:ideaId', (req, res, next) => {
    if (db.getFromDatabaseById('ideas', req.params.ideaId)) {
        const id = req.params.ideaId
        const name = req.body.name
        const description = req.body.description 
        const numWeeks = req.body.numWeeks
        const weeklyRevenue = Number(req.body.weeklyRevenue)
        const idea = db.updateInstanceInDatabase('ideas', {id: id, name: name, description: description, numWeeks: numWeeks, weeklyRevenue: weeklyRevenue})
        res.status(200).send(idea)
        next()
    } else {
        res.status(404).send()
    }
})

// DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter.delete('/:ideaId', (req, res, next) => {
    if (db.getFromDatabaseById('ideas', req.params.ideaId)) {
        db.deleteFromDatabasebyId('ideas', req.params.ideaId) 
        res.status(204).send()
        next()
    } else {
        res.status(404).send()
    }
})

module.exports = ideasRouter