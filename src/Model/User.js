const { model, Schema } = require('mongoose');

module.exports = model('user_profiles', Schema({
    _id: String,
    data: {
        clientToken : { type: String },
        ApplicationToken : { type: String, default: null }
    }
},{
    versionKey: false
}));