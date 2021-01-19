const {Schema, model} = require('mongoose');

const SquareSchema = new Schema(
    {

        x: Number,
        y: Number,
        painted: Boolean,
        territorie:
        {
            type: Schema.Types.ObjectId,
            ref: 'Territorie'
        }
    },
    {
        versionKey: false
    }
);

module.exports = model('Square',SquareSchema);
