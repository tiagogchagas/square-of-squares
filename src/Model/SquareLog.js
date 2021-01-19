const {Schema, model} = require('mongoose');

const SquareLogSchema = new Schema(
    {

        date: { type: Date, default: Date.now},
        square:
        {
            type: Schema.Types.ObjectId,
            ref: 'Squere'
        }
    },
    {
        versionKey: false
    }
);

module.exports = model('SquareLog',SquareLogSchema);
