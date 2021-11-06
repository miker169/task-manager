// CRUD Create Read update delete
const { MongoClient, ObjectId} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, {
    useNewUrlParser: true,
}, (error, client) => {
    if(error){
        return console.log('Unable to connect to database')
    }
    const db = client.db(databaseName)

   
    // db.collection('users').deleteMany({
    //     age: 43
    // }).then(users => {
    //     console.log(users)
    // }).catch(err => {
    //     console.log('Could not delete')
    // })

    db.collection('tasks').deleteOne({
        description: 'fed the baby'
    }).then(task => {
        console.log(task)
    }).catch(err => {
        console.log(err)
    })
    
})