const { Router } = require('express')
const {addStudents,
  getAllStudents,
  getStudentsByID,
  updateStudentsByID,
  deleteStudentsByID}=require('../controllers/student.controller')

const studentRouter = Router()

studentRouter.get('/',  getAllStudents)
studentRouter.get('/:id', getStudentsByID)
studentRouter.post('/', addStudents)
studentRouter.put('/:id', updateStudentsByID)
studentRouter.delete('/:id', deleteStudentsByID)




module.exports=studentRouter