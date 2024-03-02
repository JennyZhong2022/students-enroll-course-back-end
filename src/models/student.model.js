const { Schema, model } = require('mongoose')
const Joi=require('joi')

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
    //customized validation 
    validate: [
      {
      
        validator: function(emailValue) {
          // Joi validation returns an object with an error property if validation fails
          const { error } = Joi.string().email().validate(emailValue);  
          // If error is undefined, validation passed
          return error === undefined;
        },
        message: 'Invalid email format', // Custom error message

      }

    ]
    
  },
  courses: [
    {
      type: String,
      ref:'Course'
    }
  ]
}, {
  timestamps:true
})

const Student = model('Student', studentSchema)

module.exports=Student