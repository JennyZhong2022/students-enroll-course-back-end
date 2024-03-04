const jwt = require('jsonwebtoken')

const secret='secret'

const payload = {
  id: 123,
  name:'Dan'
}

// access token -> 1d, 7d, 30d
// refresh token -> access token expires shorter-> 15mins / 1 day

const token=jwt.sign(payload, secret, {expiresIn: '1m'})

console.log(token);

