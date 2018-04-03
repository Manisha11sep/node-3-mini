const express = require('express');
const bodyParser = require('body-parser');
const mc = require( `./controllers/messages_controller` );
const session = require('session');

const {createInitalSession} = require './middlewares/session.js'
const app = express();

app.use( bodyParser.json() );
app.use( express.static( `${__dirname}/../build` ) );
app.use(session({
    secret: 'aaabbc',
    resave: 'false',
    saveUninitalized: 'true',
    cookie: {
        maxAge: 1000*10,

    }
}));

app.use(createInitalSession);

app.post( "/api/messages", mc.create );
app.get( "/api/messages", mc.read );
app.put( "/api/messages", mc.update );
app.delete( "/api/messages", mc.delete );

const port = process.env.PORT || 3000
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );