const { Schema, model } = require('mongoose');

const schema = new Schema({
    content: { type: String, required: true },
    iat: { type: Date, required: true },
    owner: { type: Object, required: true },
});

module.exports = model('Comment', schema);