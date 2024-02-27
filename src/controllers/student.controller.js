const Student=require('../models/student.model')


const addStudents = async (req, res) => {
  const { firstName, lastName, email } = req.body
  const student = new Student({ firstName, lastName, email })
  // const student=new Student({req.body}) don't write this way
  try {
    await student.save()
    res.json(student)
  }
  catch (err) {
    console.log(err);
  }

}

const getAllStudents = async (req, res) => {
  // Execute the query and wait for the result.
  const students = await Student.find().exec()
  res.json(students)
}

const getStudentsByID = async(req,res) => {
  const { id } = req.params
  const student = await Student.findById(id).exec()
  if (!student) {
    res.status(404).json({ error: 'Student not found' })
    return 
  }
  res.json(student)
}

const updateStudentsByID = async(req,res) => {
  const { id } = req.params
  const { firstName, lastName, email } = req.body

  try {
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
  } catch (error) {
    console.error(error)
    res.status(500).json({error: 'An error occurred while updating the student'})
  }
}

const deleteStudentsByID =async (req,res) => {
  const { id } = req.params
  const student = await Student.findByIdAndDelete(id).exec();
  if (!student) {
    res.status(404).json({ error: 'Student not found' });
    return;
  }
  res.sendStatus(204)
}

module.exports = {
  addStudents,
  getAllStudents,
  getStudentsByID,
  updateStudentsByID,
  deleteStudentsByID

}