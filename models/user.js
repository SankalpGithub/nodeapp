import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requrie: true
    }, 

    username: {
        type: String,
        require: true,
        unique: true
    },

    email: {
        type: String,
        requrie: true,
        unique: true,
    },

    password: {
        type: String,
        require: true
    },

    otp: {
        type: Number,
        require: true
    },

    verify: {
        type: Boolean,
        require: true
    }
})

const user = mongoose.model("Users", userSchema);

export default user;
