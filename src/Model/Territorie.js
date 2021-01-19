const {Schema, model} = require('mongoose');

const TerritorieSchema = new Schema(
    {
        name: String,
        start:
            {
                x: Number,
                y: Number,
            },
        end:
            {
                x: Number,
                y: Number,
            },
        area: Number,
        painted_area: Number
    },
    {
        versionKey: false
    }
);

module.exports = model('Territorie',TerritorieSchema);
