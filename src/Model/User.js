const { model, Schema } = require('mongoose');

module.exports = model('user_profiles', Schema({
    _id: String,
    data: {
        clientToken : { type: String },
        isAdmin: { type: Boolean, default: false },
    }
},{
    versionKey: false
}));

/**
 * @INFO
 * Bot Coded by Bear#3437 | https://github.com/bearts
 * @INFO
 * Tamako Tech | https://tamako.tech/
 * @INFO
 */