const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
        validator: function (value) {
            // Simple email regex pattern
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
        },
        message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
     myEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'   // Referencing the Event model
    }]
}, { timestamps: true });

module.exports = mongoose.model('Users', UserSchema);