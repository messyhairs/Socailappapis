const mongoose = require('mongoose');
const User = mongoose.model('Appusers', {
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = User