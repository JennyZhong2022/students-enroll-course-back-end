const { Schema, model } = require('mongoose')

const studentSchema = new Schema({
  firstName: {
    type: String,
    require:true,
  },
  lastName: {
    type: String,
    require:true,
  },
  email: {
    type: String,
    
  }
}, {
  timestamps:true
})

const Student = model('Student', studentSchema)

module.exports=Student