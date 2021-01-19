const { Router } = require('express');
const TerritorieController = require('./Controller/TerritorieController');
const SquareController = require('./Controller/SquareController');
const ErrorController = require('./Controller/ErrorController');
const DashboardController = require('./Controller/DashboradController');
const routes = new Router();

routes.get('/territories', TerritorieController.getTerritories);
routes.post('/territories', TerritorieController.storeNewTerritorie);
routes.delete('/territories/:id', TerritorieController.deleteTerritorie);
routes.get('/territory/:id', TerritorieController.getPaintedSquares);

routes.get('/squares/:x/:y', SquareController.getSquare);
routes.get('/squares', SquareController.getAllSquares);
routes.delete('/squares', SquareController.deleteSqueres);
routes.patch('/squares/:x/:y/paint', SquareController.paintSquare);

routes.get('/territories/not-found', ErrorController.territoryNotFoundError);
routes.get('/squares/not-found', ErrorController.squareNotFoundError);
routes.get('/territories/territorie-format-invalid', ErrorController.incompleteDataError);
routes.get('/territories/territory-overlay', ErrorController.territoryOverlayError);
routes.get('/territories/territory-name-used', ErrorController.nameAlreadyUsed);

routes.get('/dashboard/mostPaintedArea', DashboardController.mostPaintedArea);
routes.get('/dashboard/mostProportionalPaintedArea', DashboardController.mostProportionalPaintedArea);
routes.get('/dashboard/lastFiveErrors', DashboardController.lastFiveErrors);
routes.get('/dashboard/PaintedAreaTotalArea', DashboardController.PaintedAreaTotalArea);
routes.get('/dashboard/lastFivePainted', DashboardController.lastFivePaintedSquares);

module.exports = routes;