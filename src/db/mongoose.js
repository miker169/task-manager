const mongoose = require('mongoose')
const validator = require('validator');

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api'

mongoose.connect(connectionURL)

const User = mongoose.model('User', {
    name: {
       type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number');
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        validate(value) {
            if(value.toLowerCase().includes('password')){
                throw new Error (`Password cannot contain "password"`)
            }
        }
    }


})


// const me =  new User({
//     name: '   Mike   ',
//     email: 'MIKER179@HOTMAIL.COM',
//     password: 'password '
// })
//
// me.save().then((me) => {
//     console.log(me)
// }).catch(err => {
//     console.log('There was an error: ', err)
// })

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const task = new Task({
    description: "Go to shop for milk               "
})

task.save().then(() => {
    console.log(task)
}).catch(err => {
    console.log('There was an error ', err)
})