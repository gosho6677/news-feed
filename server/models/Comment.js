const { Schema, model } = require('mongoose');

const schema = new Schema({
    description: { type: String, required: true },
    iat: { type: String, required: true },
    owner: { type: Object, required: true },
});

module.exports = model('Comment', schema);