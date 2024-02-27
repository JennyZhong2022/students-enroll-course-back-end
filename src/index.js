require('dotenv').config()
const express = require('express')
const v1Router=require('./routes')
const connectToDB = require('./utils/db')
const unknownError = require('./middleware/unknownErrors')
const validationError = require('./middleware/validationError')
const notFoundError = require('./middleware/notFoundError')

const PORT = process.env.PORT || 3000


const app = express()

app.use(express.json())
app.use('/v1', v1Router)

app.use(validationError)  //this needs to be placed before unknownErrors.
app.use(notFoundError)
app.use(unknownError)





connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
  })
})

