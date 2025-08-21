const exp = require('express');
const app = exp();

app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get('/', (req,res) => {
    console.log('Received a GET request');
    res.render('index');
    
})

app.listen(4000);
