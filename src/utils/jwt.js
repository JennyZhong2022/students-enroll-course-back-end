const jwt = require('jsonwebtoken')

const secret = process.env.JWT_KEY

const generateToken = (payload) => {
  return jwt.sign(payload, secret, {expiresIn:'1d'})

}

const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret)
    return decoded
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  generateToken,validateToken
}