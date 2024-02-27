const Course = require('../models/course.model')
const Student=require('../models/student.model')



const addCourse = async(req, res) => { 
  const {code, name, description } = req.body
  const course = new Course({code, name, description })
  
  try {
    await course.save()
  } catch (error) {
    console.error(error)
  }
}



const getAllCourses = async(req, res) => {
  const courses = await Course.find().exec()
  res.json(courses)
 }


const getCoursesByID = async( req, res) => {
  const { id } = req.params
  const course = await Course.findById(id).populate('students','firstName lastName email').exec() 
  
  if (!course) {
    res.status(404).json({ error: 'Course not found' })
    return
  }

  res.json(course)

 }


const updateCoursesByID = async(req, res) => { 
  const{id}=req.params
  const { name, description } = req.body
  
  try {
    const course = await Course.findByIdAndUpdate(id, {
      name,
      description
    },  {
      new: true  //add this to update the new data
    }).exec()

    if (!course) {
      res.status(400).json({ error: 'course not found' })
      return
    }
    res.json(course)

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An error occurred while updating the course' })
  }
}


const deleteCoursesByID =async(req, res) => {
  const { id } = req.params
  const course = await Course.findByIdAndDelete(id).exec()
   
  if (!course) {
    res.status(404).json({ error: 'Course not found' })
    return
  }
  await Student.updateMany({
    courses: id
  }, {
    $pull: {
    courses:id
  }}).exec()
  res.sendStatus(204)
 }


module.exports = {
  addCourse,
  getAllCourses,
  getCoursesByID,
  updateCoursesByID,
  deleteCoursesByID
  
}