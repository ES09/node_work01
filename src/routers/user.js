const express = require('express')

const userRouter = express.Router()


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

module.exports = userRouter