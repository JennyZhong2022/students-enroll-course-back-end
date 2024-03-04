const User = require('../models/user.model')
const { generateToken } = require('../utils/jwt')
// const bcrypt = require('bcrypt')


const register = async (req, res) => {
  const { username, password } = req.body
  
  // const hashedPassword= bcrypt.hash(password,12)
  const user = new User({ username, password })
  await user.hashPassword()
  await user.save()

  const token=generateToken({_id:user._id, username})

  res.status(201).json({token})
}

const login = async(req, res) => {
  const { username, password } = req.body
  const user=await User.findOne({ username }).exec()
  
  if (!user) {
    res.status(401).json({ error: 'Invalid credentials' })
    return
  } 


  if (!(await user.validatePassword(password))) {
    res.status(401).json({ error: 'Invalid credentials password' })
    return
  }

// role:'admin' is hard coding, this role can be written in user schema 
  const token=generateToken({_id:user._id, username, role:'admin'})

  res.json({ token })
}

module.exports = {
  register,login
} 