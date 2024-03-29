const { Router } = require('express')
const studentRouter = require('./student.routes.js')
const courseRouter=require('./course.routes.js')
const authRouter = require('./auth.routes.js')
const authGuard = require('../middleware/authGuard.js')
const roleGuard = require('../middleware/roleGuard.js')

const v1Router = Router()

v1Router.use('/students', studentRouter)
// v1Router.use('/courses', authGuard, courseRouter)
v1Router.use('/courses', roleGuard('admin'), courseRouter)
v1Router.use('/auth',authRouter)

module.exports=v1Router 