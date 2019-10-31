const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/task-manger-api', {useNewUrlParser: true, useUnifiedTopology: true} )













// const Locations = mongoose.model("Locations", {
//     name: {
//         type: String,
//         required: true
//     },
//     rating: {
//         type: Number,
//         validate(value){
//             if(value > 5 || value < 1){
//                 throw new Error("RATING MUST BE BETWEEN 1 AND 5")
//             }
//         }
//     }
// })

// const oldEbbit = new Locations(
//     {
//         name: "bole",
//         rating:5
//     }
// )

// oldEbbit.save().then(()=>console.log(oldEbbit))
// .catch((err)=>{console.log(err)})































