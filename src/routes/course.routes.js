const { Router } = require('express')

const{addCourse,
  getAllCourses,
  getCoursesByID,
  updateCoursesByID,
  deleteCoursesByID } = require('../controllers/course.controllers')
   

const courseRouter = Router()
  
courseRouter.get('/',getAllCourses)
courseRouter.get('/:id',getCoursesByID)
courseRouter.post('/',addCourse)
courseRouter.put('/:id',updateCoursesByID)
courseRouter.delete('/:id',deleteCoursesByID)


module.exports=courseRouter