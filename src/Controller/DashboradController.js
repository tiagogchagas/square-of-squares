const Square = require('../Model/Square');
const Territorie = require('../Model/Territorie');
const Error = require('../Model/Error');
const SquareLog = require('../Model/SquareLog');

class DashboardController
{

    async mostPaintedArea(req,res){
        const territories = await Territorie.find().sort({"painted_area":-1});
        return res.json({territories});
    }

    async  mostProportionalPaintedArea(req,res){
        const _listTerritories = await Territorie.find();
        var _territores = [];

        for(var i=0; i < _listTerritories.length; i++)
        {
            var _proportion = _listTerritories[i].area / _listTerritories[i].painted_area
            var _object =
            {
                name: _listTerritories[i].name,
                start: _listTerritories[i].start,
                end: _listTerritories[i].end,
                area: _listTerritories[i].area,
                painted_area: _listTerritories[i].painted_area,
                proportion:_proportion
            };
            _territores.push(_object);
        }

        let territories = _territores.sort(sortByProperty("proportion"));
        return res.json({territories});

    }

    async  lastFiveErrors(req,res){
        const errorList = await Error.find().sort({date: - 1}).limit(5);
        return res.json({errorList});
    }

    async  lastFivePaintedSquares(req,res){
        const squareLog = await SquareLog.find().sort({date: - 1}).limit(5);
        var lastSquares = [];
        for(var i=0; i < squareLog.length; i++)
        {
            const square = await Square.findOne({_id: squareLog[i].square}); 
            var _object =
            {
                square_id: squareLog[i].square,
                x: square.x,
                y: square.y,
                date: squareLog[i].date
            };
            lastSquares.push(_object);
        }
        return res.json({lastSquares});
    }

    async PaintedAreaTotalArea(req,res)
    {
        const territories = await Territorie.find();
        var totalPaintedArea = 0;
        var totalArea =0;

        for(var i=0; i < territories.length; i++)
        {
            totalPaintedArea += territories[i].painted_area;
            totalArea += territories[i].area;
        }

        var _finalValue = totalPaintedArea / totalArea;

        return res.json({total : _finalValue});
        
    }

};

function sortByProperty(property){  
    return function(a,b){  
       if(a[property] < b[property])  
          return 1;  
       else if(a[property] > b[property])  
          return -1;  
   
       return 0;  
    }  
 }

module.exports = new DashboardController();