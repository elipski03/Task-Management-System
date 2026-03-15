const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    name: {
        type: String,
    },
    googleId: {
        type: String,
    },
    authType: {
        type: String,
    },
    
    creationDate: {
        type: Date,
        default: Date.now,
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
});

UserSchema.pre('save', async function () {
  if (this.password && this.isModified('password'))
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

module.exports = mongoose.model('User', UserSchema);