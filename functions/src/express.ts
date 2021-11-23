import express from 'express';
const app: express.Express = express();

app.use(express.json);
app.use(express.urlencoded({extended: true}));

app.get('/devices', (req, res) => {

});
