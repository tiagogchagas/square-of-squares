const Error = require('../Model/Error');

class ErrorController
{

    async territoryOverlayError(req,res){
        let _message = 'this new territory overlays another territory.';
        const error = await Error.create({
           description: _message,
           errortype: 'territory-overlay', 
        });
        return res.json({message: _message});
    }

    async incompleteDataError(req,res){
        let _message = 'if it misses the start, end or name fields!';
        const error = await Error.create({
            description: _message,
            errortype: 'incomplete-data', 
         });
        return res.json({message: _message});
    }

    async territoryNotFoundError(req,res){
        let _message = 'this territory was not found.';
        const error = await Error.create({
            description: _message,
            errortype: 'territory-not-found', 
         });
        return res.json({message: _message});
    }

    async squareNotFoundError(req,res)
    {
        let _message = 'this square does not belong to any territory.';
        const error = await Error.create({
            description: _message,
            errortype: 'square-not-found', 
         });
        return res.json({message: _message});
    }

    async nameAlreadyUsed(req,res)
    {
        let _message = 'this territory name is already in use.';
        const error = await Error.create({
            description: _message,
            errortype: 'territory-overlay', 
         });
        return res.json({message: _message});
    }

};

module.exports = new ErrorController();