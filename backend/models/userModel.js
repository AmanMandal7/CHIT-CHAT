const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp')

const userModel = mongoose.model({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: { type: String, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" },

},
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userModel);
module.exports = User;