// can set up an individual file to bcrypt , so it can be reused

const bcrypt=require('bcrypt')

const hashPassword = async (rawPassword) => {
  return bcrypt.hash(rawPassword, 12)
}

module.exports = {
  hashPassword
}
