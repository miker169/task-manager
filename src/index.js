const express = require('express')
require('./db/mongoose')


const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const port = process.env.port || 3000






app.listen(port, () => {
    console.log("Server is up on port "+ port)
} )


// const jwt = require('jsonwebtoken')
//
// const myFunc = async () => {
//     const token = jwt.sign({_id: "abcdefghije"}, "thisismynewcourse", {expiresIn: '7 days'})
//     console.log(token);
//
//     console.log(jwt.verify(token, "thisismynewcourse"))
// }
//
// myFunc()
