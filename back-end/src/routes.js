const express = require('express')
const OrgController = require('./controllers/OrgController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')
const routes = express.Router()

routes.post('/login', SessionController.login);

routes.get('/ongs', OrgController.index)
routes.post('/ongs', OrgController.create)

routes.get('/incidents', IncidentController.index)
routes.post('/incidents', IncidentController.create)
routes.delete('/incidents/:id', IncidentController.delete)

routes.get('/ong/incidents', ProfileController.index)

module.exports = routes