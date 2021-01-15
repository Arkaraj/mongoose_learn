const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: {
        type: String,
        max: 40,
        min: 3,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    skill: {
        type: String,
        enum: ['cp', 'web_dev', 'data_scientist', 'mobile_dev', 'iot', 'ml', 'ai', 'blockchain', 'robotics', 'vr', 'ar', 'game_dev']
    }
});

const User = mongoose.model('User', Schema);

module.exports = User;