const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

class Application{

    constructor()
    {
        this.server = express();
        
        //docker connection
        mongoose.connect('mongodb://vitta:vitta123@mongo-database:27017/squares-database',
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });

         // debbuger connection
         /*mongoose.connect('mongodb://vitta:vitta123@127.0.0.1:27017/squares-database',
         {
           useNewUrlParser: true,
           useUnifiedTopology: true,
         }); */
        this.middlewares();
        this.routes();
    }

    middlewares()
    {
        this.server.use(express.json());        
    }

    routes()
    {
        this.server.use(routes);
    }

    
}
module.exports = new Application().server;