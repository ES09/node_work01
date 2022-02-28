// @ts-check
/* eslint-disable no-console */

const express = require('express')
const bodyPaser = require('body-parser')

const userRouter = express.Router()

const app = express()
app.use(bodyPaser.json())

app.set('views', 'src/views')
app.set('view engine', 'pug')

const PORT = 5000

const USERS = {
    3 : {
        nickname : 'foo',
    },
    4 : {
        nickname : 'bar',
    }
}

userRouter.get('/', (req, res) => {
    res.send('user list')
})

userRouter.param('id', (req, res, next, value) => {
    console.log('value : ', value)
    //@ts-ignore
    req.user = USERS[value]
    next()
})

// /users/3
userRouter.get('/:id', (req, res) => {
    const resMimeType = req.accepts(['json', 'html'])
    if(resMimeType === 'json') {
        //@ts-ignore    
        res.send(req.user)
    } else if (resMimeType === 'html') {
        res.render('user-profile', {
            //@ts-ignore  
            nickname: req.user.nickname,
        })
    }
})

userRouter.post('/:id/nickname', (req, res) => {
    //@ts-ignore
    const { user } = req
    const { nickname } = req.body

    user.nickname = nickname
    res.send(`User nickname updated : ${nickname}`)
})

userRouter.post('/users', (req, res) => {
    //register user
})

app.use('/users', userRouter)

app.get('/', (req, res) => {
    res.render('index', {
        message : 'Hello, pug!',
    })
})

app.listen(PORT, () => {
    console.log(`The Express server is listening at port : ${PORT}`)
})