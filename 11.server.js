const express = require('express');
const { engine } = require ('express-handlebars');

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");
app.use(express.static('public'))

app.get('/bars', (req, res) => {
//Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
res.render('d3-titanic-bars',{ title: 'D3 Titanic Bars', layout: false });
});

app.get('/cloud', (req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('d3-titanic-cloud',{ title: 'D3 Titanic Cloud', layout: false });
    });

app.listen(3000);        
