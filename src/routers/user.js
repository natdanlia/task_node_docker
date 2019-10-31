const express = require('express')
const User = require('../models/user')

const router = new express.Router()


//the best and modern way to do this is through async await

router.post('/users', async (req, res) => {
    const newUser = new User(req.body)
    try {
        const user = await newUser.save()
        res.send(user)
    } catch (e) {
        res.send(e)
    }
})

router.post('/users/login', async (req,res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    } catch(e){
        res.status(400).send(e)
    }
})


router.get('/users', async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch {
        res.status(500).send('could not find users')
    }
})

router.get('/users/:id', async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(400).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/users/:id', async (req, res) => {
    const id = req.params.id
    // console.log('this is req body', req.body)

    //dddfdf

    const keys = ['age', 'name', 'email', 'password']
    const itemsUpdated = Object.keys(req.body)

    const goUpdate = itemsUpdated.every((item) => keys.includes(item))

    if (!goUpdate) {
        return res.status(400).send({ error: "invalid update" })
    }
    try {
        const user = await User.findById(req.params.id)

        itemsUpdated.forEach((update) => {
            user[update] = req.body[update]
        })

        await user.save()



        // const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

//this is an old way of working through promises chaining

// app.get('/users', (req, res)=>{
//     User.find({}).then((users)=>{
//        res.send(users) 
//     }).catch((e)=> res.status(500).send(e))
// })


// app.get('/users/:id', (req, res) => {
//     const _id = req.params.id
//     User.findById(_id).then((user) => {
//         if (!user) {
//             return res.send(404).send()
//         }
//         res.send(user)
//     }).catch((e) => res.status(500).send(e))
// })
// app.post('/users', (req, res) => {
//     const newUser = new User(req.body)
//     newUser.save().then(() => res.send(newUser))
//         .catch((e) => {
//             res.status(400)
//             res.send(e)
//         })
// })






module.exports = router

