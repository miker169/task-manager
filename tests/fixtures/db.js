const mongoose = require("mongoose");
const jwt =  require("jsonwebtoken");
const USER = require("../../src/models/user");
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike2',
    email: 'mike2@example.com',
    password: 'MyPass123',
    tokens: [
        {
            token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
        }
    ]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Andrew',
    email: 'andrew@example.com',
    password: 'myHouse099',
    tokens: [
        {
            token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET)
        }
    ]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First Task',
    completed: false,
    owner: userOneId
}

const taskTwo= {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second Task',
    completed: true,
    owner: userOneId
}

const taskThree= {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third Task',
    completed: true,
    owner: userTwoId
}

const setupDatabase = async () => {
    await USER.deleteMany()
    await Task.deleteMany()
    await new USER(userOne).save()
    await new USER(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = { userOneId, userOne, setupDatabase, taskOne, userTwo}