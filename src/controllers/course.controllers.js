const Course = require('../models/course.model')
const Student=require('../models/student.model')
const Joi=require('joi')


const addCourse = async (req, res) => { 
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    code: Joi.string().pattern(/^[a-zA-Z]+[0-9]+$/).message('Invalid code format').required()

  })
  const validBody = await schema.validateAsync(req.body, {
    allowUnknown: true,
    stripUnknown:true
  })

  // const {code, name, description } = req.body
  const course = new Course(validBody)
  
  try {
    await course.save()
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while saving the course', error: error.message });
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