const Territorie = require('../Model/Territorie');
const Square = require('../Model/Square');
class TerritorieController
{

    async getTerritories(req,res){
        const territorie = await Territorie.find();
        var registerCount = territorie.length;
        return res.json({count: registerCount, territorie});
    }

    async getTerritoryById(req,res){
        const { id } = req.params;
        const territorie = await Territorie.findOne({_id: id});
        if(territorie == null)
        {
            return res.redirect('/territories/not-found');
        }
        else
        {
            return res.json(territorie);
        }
    }

    async getPaintedSquares(req,res)
    {
        const { id } = req.params;
        const squares = await Square.find({territorie: id, painted: true});
        const territorie = await Territorie.findById({_id: id});
        var registerCount = squares.length;

        return res.json(
            {
                data: {
                    id: territorie._id,
                    name: territorie.name,
                    start: territorie.start,
                    end: territorie.end,
                    area: territorie.area,
                    painted_area: registerCount,
                    painted_squares: squares
                }, 
                erro: false
            }
        
        );
    }

    async storeNewTerritorie(req,res)
    {
      const {name, start, end} = req.body;
    
      if(verifyIfIsSquareFormat(start.x, start.y, end.x, end.y) == false)
      {
        return res.redirect('/territories/territorie-format-invalid');
      }

      if(name == null || start == null || end == null)
      {
        return res.redirect('/territories/territorie-format-invalid'); 
      }

      //Verify if position is occupated
      const territories = await Territorie.find();
      for(var i=0; i < territories.length; i++)
      {
          const _actualTerritorie = territories[i];
          //In this case means x y coordinate is occupated.
          if((start.x <= _actualTerritorie.end.x && start.y <= _actualTerritorie.end.y))
          {
            return res.redirect('/territories/territory-overlay');
          }
          if(String(name) == String(_actualTerritorie.name))
          {
              return res.redirect('/territories/territory-name-used');
          }
      }

     const territorie = await Territorie.create({
          name, start, end, area: calculateSquareArea(start.x, start.y, end.x, end.y), painted_area: 0,
      });

      // Initialize territorie squares;
      for(var i = start.x; i < end.x; i++)
      {
        for(var j = start.y; j < end.y; j++)
        {
            const newSquare = await Square.create({
                x:i,y:j, painted:false, territorie: territorie._id, 
            });
        }
      }
 
      return res.json({territorie, error: false});
    }

    async deleteTerritorie(req,res)
    {
       const { id } = req.params;
       
       try
       {
            await Territorie.findByIdAndDelete({_id: id});
            //Remove every squares in this territorie
            await Square.deleteMany({territorie: id});
            return res.json({ erro: false});
       }
       catch(e)
       {
            return res.redirect('/territories/not-found');
       }
    }
};

async function territorieOverlay(startX, startY)
{
    const territorie = await Territorie.find();
    var _return = false;
    for(var i=0; i < territories.length; i++)
    {
        const _actualTerritorie = territories[i];
        //In this case means x y coordinate is occupated.
        if(startX < _actualTerritorie.end.x || startY < _actualTerritorie.end.y)
        {
            _return = true;
        }
    }

    return _return;
};

function calculateSquareArea(startX, startY, endX, endY)
{
    var calcX = endX - startX;
    var calcY = endY - startY;
    var area = calcX * calcY;
    return area;
};

function verifyIfIsSquareFormat(startX, startY, endX, endY)
{
    var _return = false;

    var calcX = endX - startX;
    var calcY = endY - startY;
    
    if(calcX == calcY)
    {
        _return = true;
    }

    return _return;
};

module.exports = new TerritorieController();