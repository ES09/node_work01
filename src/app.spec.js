/** eslint-disable no-undef */
/** eslint-disable node/no-unpublished-require */

const supertest = require('supertest')
const app = require('./app')

const request = supertest(app)

test('retrieve user json test', async () => {
    const result = await request.get('/users/3').accept('application/json')
    expect(result.body).toMatchObject({
        nickname : expect.any(String)
    })
})

// 정규식 테스트
test('retrieve user page test', async () => {
    const result = await request.get('/users/3').accept('text/html')
    expect(result.text).toMatch(/^<html>.*<\/html>$/)
})

test('update nickname test', async () => {
    const newNickname = 'newNickname'

    const res = await request
        .post('/users/3/nickname')
        .send({ nickname : newNickname })
    expect(res.status).toBe(200)

    const userResult = await request.get('/users/3').accept('application/json')
    expect(userResult.status).toBe(200)
    expect(userResult.body).toMatchObject({
        nickname : newNickname
    })
})