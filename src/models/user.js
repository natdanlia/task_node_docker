const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Number must be greater that zero!')
            }
        }
    },
    email: {
        required: true,
        // trim: true,
        // lowercase: true,
        unique: true,
        type: String,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("please enter a valid email")
            }
        }
    },

    password: {
        type: String,
        required: true,
        // trim: true, 
        minlength: 6,

        validate(value) {
            if (value.includes('password')) {
                throw new Error("password can not contain the word password")
            }
        }
    }
})
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if(!user){
        throw new Error('unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('unable to login')
    }

    return user

}

// Hasht the plain text password before saving 

userSchema.pre('save', async function (next) {
    const user = this 

     if(user.isModified('password')){
         user.password = await bcrypt.hash(user.password, 8)
     }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User