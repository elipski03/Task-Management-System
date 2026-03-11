const mongoose = require('mongoose');

const ReminderSchema = mongoose.Schema({
    remindTime: {
        type: Date,
        required: true,
    },
    sent: {
        type: Boolean,
        default: false,
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        default: null,
    },
});

module.exports = mongoose.model('Reminder', ReminderSchema);