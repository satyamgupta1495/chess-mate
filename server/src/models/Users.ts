import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate: {
            validator: (value) => {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Please enter a valid email address.'
        }
    },
    password: {
        type: String,
        require: [true, 'password is required!'],
        minlength: [6, 'Password must be at least 6 characters long.']
    }
})

export const Users = mongoose.model('Users', userSchema)