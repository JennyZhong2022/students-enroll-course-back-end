//verify if it has token and valid 
const{validateToken}=require('../utils/jwt')

module.exports = (role)=>(req, res, next) => {
  const authorization = req.header('Authorization')
  if (!authorization) {
    res.status(401).json({error:'missing authorization header'})
    return
  }
  const [type, token] = authorization.split(' ')
  if (type !== 'Bearer'|| !token) {
    res.status(401).json({error:'invalid token'})
    return
  }

  const payload = validateToken(token)
  if (!payload) { 
    //401 unauthorized 
    res.status(401).json({error:'invalid token'})
    return
  }
 
  // 403 not enough authorized
  if (payload.role !== role) {
    res.status(403).json({ error: 'invalid permission' })
    return
  }

  next()
}