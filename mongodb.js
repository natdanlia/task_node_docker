

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectID

const id = new ObjectId()
// console.log(id)
// console.log(id.getTimestamp())
 

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useNewUrlParser: true, useCreateIndex: true}, (error, client) => {
    if(error){
        return console.log('unable to connent to database')
    }
    const db = client.db(databaseName)



    db.collection('users').findOne({ name: 'Vikram'}, (err, user)=>{
        if(err){
            return console.log('Could not find user')
        }
        console.log('this is the user', user)
    })

    db.collection('users').find({age:32}).count((err, users) => {
        console.log(users)
    })

    db.collection('tasks').find({}).sort({_id: 2}).limit(1).toArray((err, users)=>{
        if(err){
           return console.log('hopa')
        }

        console.log(users)

    })


    db.collection('tasks').find({completed: true}).toArray((err, users)=>{
        console.log(users)
    })



   db.collection('users').updateOne(
        { _id: new ObjectId("5d69777e2eb8eb01537a5aca") }, 
        {$set: {
            name: "Mikekdkdkdkdk",
            age:333
            }
        }).then((respose) => {
            console.log(respose)
        }).catch((reject)=> {
            console.log(reject)
        })

    db.collection('users').updateOne(
        { _id: new ObjectId("5d69777e2eb8eb01537a5aca") },
        {
            $inc: {
                age: 455
            }
        }).then((respose) => {
            console.log(respose)
        }).catch((reject) => {
            console.log(reject)
        })


    db.collection('tasks').updateMany(
        {completed: true}, 
        {$set: {
            completed: false
            }
        }).then((resolve) => console.log(resolve))
        .catch((reject) => console.log(reject))

    db.collection('users').deleteMany(
        { age: 1243}
    ).then(resolve => console.log(resolve))
    .catch(reject => console.log(reject))

    db.collection('tasks').deleteOne(
        {description: 'cook food'}
    ).then(console.log)
    .catch(console.log)























    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Vikram',
    //     age: 32
    // }, (error, result) => {
    //     if(error){
    //         return console.log('unable to insert user')
    //     }
    //     console.log(result.ops)
    // })

//     db.collection('users').insertMany([
//         {
//             name: 'jen',
//             age: 28
//         },
//         {
//             name: 'Gunter',
//             age: 55
//         }
//     ], (error, result) => {
//         if (error) {
//             return console.log('uanble to insert documents')
//         }
//         console.log(result.ops)
//     })

// 



// db.collection('tasks').insertMany([
//     {
//         description: "cook food",
//         completed: false,
//     },
//     {
//         description: 'wash dishes',
//         completed: true
//     },
//     {
//         description: 'car wash',
//         completed: true
//     }
// ], (error, result)=>{
//     if(error){
//         return console.log("cannot insert to database")
//     }
//     console.log(result.ops)
// })

})



