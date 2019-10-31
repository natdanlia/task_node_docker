require('../src/db/mongoose')
const User = require('../src/models/user')

const findUpdate = async (age, id) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const amount = await User.countDocuments({ age })
    return amount
}
findUpdate(33, '5d77debaa353d94da27c8789').then((count)=> console.log(count)).catch(e=>console.log(e))
// User.findByIdAndUpdate('5d77ddc63815114d4bdd38c4', {name: "jj"}).then((updatedDocument)=>{
    
//     return User.countDocuments({name: 'Samad'})
// }).then((countNUmber)=>{
//     console.log(countNUmber)
// }).catch((e) => console.log(e))


