// @ts-check
/* eslint-disable no-console */

const express = require('express')
const bodyPaser = require('body-parser')

const app = express()
app.use(bodyPaser.json())

app.set('views', 'src/views')
app.set('view engine', 'pug')

const PORT = 5000

const userRouter = require('./routers/user')

app.use('/users', userRouter)
app.use('/public', express.static('src/public'))


app.get('/', (req, res) => {
    res.render('index', {
        message : 'Hello, pug!',
    })
})

app.listen(PORT, () => {
    console.log(`The Express server is listening at port : ${PORT}`)
})