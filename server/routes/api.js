const express = require('express')
const { api_register_post, api_login_post, api_todos_post, api_todos_get, api_todos_delete,api_todos_put } = require('../controllers/apiController')

const router = express.Router()

router.post('/register',api_register_post)

router.post('/login',api_login_post)

router.post('/todos',api_todos_post)

router.get('/todos',api_todos_get)

router.delete('/todos/:todo',api_todos_delete)

router.put('/todos/:todo',api_todos_put)

module.exports = router;