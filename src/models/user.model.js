const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required:true
  }
}
)

userSchema.methods.hashPassword = async function () {
  this.password=await bcrypt.hash(this.password,12)
}

// can't be arrow function.  this.password = userDocument.hashPassword()

// or you can write bcrypt.hash in controllers

userSchema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password)
}

const User = model('User', userSchema)

module.exports=User
