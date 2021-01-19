const {Schema, model} = require('mongoose');

const ErrorSchema = new Schema(
    {
        description: String,
        date: { type: Date, default: Date.now},
        errortype: String
    },
    {
        versionKey: false
    }
);

module.exports = model('Error',ErrorSchema);
