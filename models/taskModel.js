const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    completion: {
        type: String,
        enum: ['Not Complete', 'Complete'],
        default: 'Not Complete',
    },
    occurrence: {
        type: Number,
        default: 1,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
        default: null
    }
    
})