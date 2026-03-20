const Reminder = require('../models/reminderModel');
const Task = require('../models/taskModel');
const Meeting = require('../models/meetingModel');
const transporter = require('../utils/mailer');

const runReminders = async () => {
  const now = new Date();
  const reminders = await Reminder.find({
    remindAt: { $lte: now },
    sent: false,
  });

  for (const reminder of reminders) {
    let users = [];
    let task = null,
      meeting = null;

    if (reminder.taskId) {
      task = await Task.findOne({ _id: reminder.taskId }).populate(
        'assigneeIds'
      );
      users = task.assigneeIds;
    }
    if (reminder.meetingId) {
      meeting = await Meeting.findOne({
        _id: reminder.meetingId,
      }).populate('attendeeIds');
      users = meeting.attendeeIds;
    }

    const taskHtml = (name) => {
      return `
        <p>Hi ${name},</p> </br></br>
        <p>This is a reminder that ${task.title} is due on ${task.dueDate}.</p>
      `;
    };

    const meetingHtml = (name) => {
      return `
        <p>Hi ${name},</p> </br></br>
        <p>You have a scheduled meeting on ${meeting.date}.</p>
      `;
    };

    for (const user of users) {
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: user.email,
        subject: `🔔 Reminder Alert`,
        html: task ? taskHtml(user.name) : meetingHtml(user.name),
      });

      console.log(`Reminder sent to user ${user._id}`);
    }

    await Reminder.findByIdAndUpdate(reminder._id, { sent: true });
  }

  // console.log(`${reminders.length} reminders sent at ${new Date()}`);
};

module.exports = runReminders;
