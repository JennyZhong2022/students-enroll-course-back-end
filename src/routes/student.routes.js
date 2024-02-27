const { Router } = require('express')
const {addStudents,
  getAllStudents,
  getStudentsByID,
  updateStudentsByID,
  deleteStudentsByID,
  addStudentToCourse,
  removeStudentFromCourse} = require('../controllers/student.controller')

const studentRouter = Router()

studentRouter.get('/',  getAllStudents)
studentRouter.get('/:id', getStudentsByID)
studentRouter.post('/', addStudents)
studentRouter.put('/:id', updateStudentsByID)
studentRouter.delete('/:id', deleteStudentsByID)
studentRouter.post('/:studentId/courses/:courseId',addStudentToCourse)
studentRouter.delete('/:studentId/courses/:courseId',removeStudentFromCourse)

module.exports=studentRouter