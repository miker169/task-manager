require('../src/db/mongoose');

const User = require('../src/models/user');
const Task = require('../src/models/task');


const UpdateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id,{age})
    const totalUpdatedUsers = await User.countDocuments({age});
    return totalUpdatedUsers;
}

// UpdateAgeAndCount("6189303b57bc7809307b2fd2", 11).then(count => {
//     console.log(count);
// });

const deleteTaskandCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const totalIncompleteTasks = await Task.countDocuments({completed: false});
    return totalIncompleteTasks;
}

deleteTaskandCount("618a7f5fd73155396602d3e5").then(count => {
    console.log("Total completed tasks " + 0)
})

// Task.findByIdAndDelete("618938b5a63b0940fd34b110")
//     .then(task => {
//         console.log(task);
//         return Task.countDocuments();
//     })
//     .then(tasks => {
//         console.log(tasks);
//     })
//     .catch(err => {
//         console.log(err);
//     })