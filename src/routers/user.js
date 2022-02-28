const express = require('express')

const userRouter = express.Router()


const USERS = {
    3 : {
        nickname : 'foo',
        profileImage : undefined
    },
    4 : {
        nickname : 'bar',
        profileImage : undefined
    }
}

userRouter.get('/', (req, res) => {
    res.send('user list')
})

userRouter.param('id', (req, res, next, value) => {
    //@ts-ignore
    const user = USERS[value]
    if(!user) {
        const err =  new Error('User Not Found!')
        err.statusCode = 404

        throw err
    }

    req.user = user
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
            userId: req.params.id,
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