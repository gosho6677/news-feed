const { Schema, model } = require('mongoose');

const schema = new Schema({
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
    likes: [{ type: String }],
    owner: { type: Object, required: true },
    iat: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

module.exports = model('Post', schema);