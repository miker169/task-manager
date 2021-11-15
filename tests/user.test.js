const request = require('supertest');
const app = require('../src/app');
const USER = require('../src/models/user')

const { userOne, userOneId, setupDatabase} = require('./fixtures/db')

beforeEach( setupDatabase)

test('Should sign up a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Mike',
        email: 'mike@example.com',
        password: 'MyPass123'
    }).expect(201)

    // Assert that the database was changed correctly
    const user = await USER.findById(response.body.user._id)
    expect(user._id).not.toBeNull()

    // Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Mike',
            email: 'mike@example.com'
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('MyPass123')
})

test('Should login existing user', async () => {
   const response =  await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await USER.findById(response.body.user._id)

    expect(user.tokens[1].token).toBe(response.body.token)
})

test('Should not log in non existent user', async  () => {
    await  request(app).post('/users/login').send({
        email: userOne.email,
        password: 'thisisnotmypassword'
    }).expect(400)
})
test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for an unauthenticateduser', async () => {
    try {
        await request(app)
            .get('/users/me')
            .send()
            .expect(401)
    }catch(e) {
        console.log('error', e)
        console.log(e)
    }

})

test('Should delete account for user', async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await USER.findById(userOneId);
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('should upload avatar', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await USER.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('should update user name field', async () => {
    const newUserName = 'Magic Mike'
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({name: newUserName})
        .expect(200)

    const user = await USER.findById(userOneId)
    expect(user.name).toBe(newUserName)
})

test('should not update an invalid field', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({location: 'New York'})
        .expect(400)
})