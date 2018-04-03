const express = require('express');
const bodyParser = require('body-parser');
const mc = require( `./controllers/messages_controller` );
const session = require('express-session');

const {createInitalSession} = require('./middlewares/session.js');
const filter = require('./middlewares/filter.js');
const app = express();

app.use( bodyParser.json() );
app.use( express.static( `${__dirname}/../build` ) );
app.use(session({
    secret: 'aaabbc',
    resave: false,
    saveUninitalized: true,
    cookie: {
        maxAge: 1000*10,

    }
}));

app.use(createInitalSession);
app.use((req,res, next) => {
    if(req.method ==='POST' || req.method ==='PUT'){
        filter(req,res, next);
    }
    else
    next();
});

app.post( "/api/messages", mc.create );
app.get( "/api/messages", mc.read );
app.put( "/api/messages", mc.update );
app.delete( "/api/messages", mc.delete );

app.get("/api/messages/history", mc.history);



const port = process.env.PORT || 3000
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );