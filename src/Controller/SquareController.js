const Square = require('../Model/Square');
const Territorie = require('../Model/Territorie');
const SquareLog = require('../Model/SquareLog');

class SquareController
{

    async getAllSquares(req,res){
        const square = await Square.find();
        var registerCount = square.length;
        return res.json({count: registerCount, square});
    }

    async deleteSqueres(req,res){
        await Square.remove({});
        const square = await Square.find();
        var registerCount = square.length;
        return res.json({count: registerCount, square});
    }

    async getSquare(req,res){
        const{x,y} = req.params;

        //Search if square already add in Database
        const square = await Square.findOne({x: x, y: y});

        if(square == null)
        {
            return res.redirect('/squares/not-found');
        }

        return res.json({data: {x: square.x, y: square.y, painted: square.painted}, error: false});
    }

    async paintSquare(req,res)
    {
        const{x,y} = req.params;

        //Search if square already add in Database
        const square = await Square.findOne({x: x, y: y});

        if(square == null)
        {
            return res.redirect('/squares/not-found');
        }
        //Don't paint same square again, just return actual status
        if(square.painted)
        {
            return res.json({data: {x: square.x, y: square.y, painted: square.painted}, error: false});  
        }
        const retSquare = await Square.findOneAndUpdate({x: x, y: y},{painted: true}, {new: true});
        const logSquare = await SquareLog.create({square: retSquare._id});
        var _territorieId = String(retSquare.territorie);
        const _updatedTerritory = await Territorie.findOne({_id: _territorieId});
        var _paintedArea = _updatedTerritory.painted_area + 1;
        const territorie = await Territorie.findOneAndUpdate({_id: _territorieId}, {painted_area: _paintedArea});     
        return res.json({data: {x: retSquare.x, y: retSquare.y, painted: retSquare.painted}, error: false});
    }

};

module.exports = new SquareController();