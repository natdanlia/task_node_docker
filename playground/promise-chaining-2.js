const Task = require('../src/models/task')
require('../src/db/mongoose')


const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count
}

deleteTaskAndCount('5d7aab94d931ec6a16448719').then(console.log)




// Task.findByIdAndRemove('5d7944e99a82f275d3483774').then((doc) => {
//     console.log(doc)
//     return Task.countDocuments({completed: false})
// }).then(number=>console.log(number))
// .catch(e=>console.log(e))