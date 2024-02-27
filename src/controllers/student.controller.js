const Student = require('../models/student.model')
const Course = require('../models/course.model')
const NotFoundException = require('../exceptions/NotFoundException')


// const catchAllErrors = (routerHandler) => {
//   return async(req,res,next) => {
//      try {
//       await routerHandler(req,res,next)
//      } catch (error) {
//       next(error)
//      }
//   }
// }   can use that to try catch each crud in routes

const addStudents = async (req, res) => {
  const { firstName, lastName, email } = req.body
  const student = new Student({ firstName, lastName, email })
  // const student=new Student({req.body}) don't write this way
 
    await student.save()
    res.json(student)
 
  

}

const getAllStudents = async (req, res) => {
  // Execute the query and wait for the result.
  const students = await Student.find().exec()
  res.json(students)
}



const getStudentsByID = async (req, res) => {

    const { id } = req.params;
    const student = await Student.findById(id).exec();
    if (!student) {
      throw new NotFoundException('Student not found');
      
    }
    res.json(student);

};


const updateStudentsByID = async(req,res) => {
  const { id } = req.params
  const { firstName, lastName, email } = req.body


    const student = await Student.findByIdAndUpdate(id,
      {
        firstName,
        lastName,
        email,
      },
      {
        new: true  //add this to update the new data
      }
    ).exec()

    if (!student) {
      res.status(404).json({ error: 'Student not found' })
      return
    }
    res.json(student)

    console.error(error)
    res.status(500).json({error: 'An error occurred while updating the student'})
 
}

const deleteStudentsByID =async (req,res) => {
  const { id } = req.params
  const student = await Student.findByIdAndDelete(id).exec();
  if (!student) {
    res.status(404).json({ error: 'Student not found' });
    return;
  }
  await Course.updateMany({
    students:student._id
  }, {
    $pull: {
      students:student._id
    }
  })
  res.sendStatus(204)
}

// POST /v1/students/:studentId/courses/:courseId

const addStudentToCourse = async(req, res) => {
  const { studentId, courseId } = req.params
  
  //make sure student and course though id can be found
  const student = await Student.findById(studentId).exec()
  const course = await Course.findById(courseId).exec()
  
  if (!student || !course) {
    res.status(404).json({ error: 'Student or course not found' })
    return
  }


  //add course to student,addToSet to ensure that a student or course is only added once, preventing duplicates in the arrays.
  student.courses.addToSet(courseId)
  //add student to course
  course.students.addToSet(studentId)

  // save
  await student.save()
  await course.save()
 
  res.json(student)
}





const removeStudentFromCourse = async (req, res) => {
  const { studentId, courseId } = req.params
    //make sure student and course though id can be found
    const student = await Student.findById(studentId).exec()
    const course = await Course.findById(courseId).exec()
    
    if (!student || !course) {
      res.status(404).json({ error: 'Student or course not found' })
      return
    }
  
    student.courses.pull(courseId)
    //add student to course
  course.students.pull(studentId)
  
  await student.save()
  await course.save()
 
  res.sendStatus(204)
}

module.exports = {
  addStudents,
  getAllStudents,
  getStudentsByID,
  updateStudentsByID,
  deleteStudentsByID,
  addStudentToCourse,
  removeStudentFromCourse
}