const { Timestamp } = require('mongodb')
const { Schema, model } = require('mongoose')

const courseSchema = new Schema({
  _id: {
    alias:'code', // code is another name of _id-> virtual property
    type: String,
    require: true,
    uppercase:true
  },
  name: {
    type: String,
    require:true,
  },
  description: {
    type: String,
    default:'Course description'
  } 
},
  {
  timestamps:true
})

const Course = model('Course', courseSchema)

module.exports=Course