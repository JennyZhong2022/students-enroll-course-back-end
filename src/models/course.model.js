const { Schema, model } = require('mongoose')

const courseSchema = new Schema({
  _id: {
    alias: 'code', // code is another name of _id-> virtual property
    type: String,
    required: true,
    uppercase: true
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: 'Course description'
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref:'Student'
      
  }
  ]
},
  {
  timestamps:true
})

const Course = model('Course', courseSchema)

module.exports=Course