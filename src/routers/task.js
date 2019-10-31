const express = require('express')
const Task = require('../models/task')

const router = new express.Router()

// app.post('/tasks', (req, res)=>{
//     const newTask = new Task(req.body)
//     newTask.save().then(()=> {res.status(201).send(newTask)})
//     .catch((e)=> res.status(400).send(e))
// })

// app.get('/tasks', (req, res) => {
//     Task.find({}).then((users) => {
//         res.send(users)
//     }).catch((e)=> {
//         res.status(500).send(e)
//     })
// })

// app.get('/tasks/:id',(req,res) => {
//     const _id = req.params.id
//     Task.findById(_id).then((task)=>{
//         if(!task){
//             return res.status(404).send()
//         }
//         res.send(task)
//     }).catch((e)=>{
//         res.status(500).send(e)
//     })

// })



router.post('/tasks', async (req, res) => {
    const newTask = new Task(req.body)
    try {
        const task = await newTask.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', async (req, res) => {
    const id = req.params.id
    try {
        const task = await Task.findById(id)
        if (!task) {
            return res.status(400).send()
        }
        res.send(task)

    }
    catch (e) {
        res.status(500).send(e)
    }

})




router.patch('/tasks/:id', async (req, res) => {
    const id = req.params.id
    const updatee = Object.keys(req.body)
    const keys = ['description', 'completed']
    const qualifiedUpdate = updatee.every((item) => keys.includes(item))

    if (!qualifiedUpdate) {
        return res.status(400).send({ error: 'the item you are trying' })
    }
    try {
        // const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        const task = await Task.findById(id)
        
        updatee.forEach((update) => task[update] = req.body[update])
        await task.save()

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/tasks/:id', async (req, res) => {
    console.log('from delete')
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).send()
        }
        res.send({ task })
    } catch (e) {
        res.status(500).send(e)
    }
})


module.exports = router