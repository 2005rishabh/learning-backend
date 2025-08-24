const exp = require('express');
const app = exp();
const path = require('path');

app.set('case sensitive routing', true);  // 👈 add this

app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));
app.use(exp.static(path.join(__dirname,'public')));
app.set("view engine", "ejs");

app.get('/', (req,res) => {
    console.log('Received a GET request');
    res.render('index');
});

app.get('/', (req,res) => {
    console.log('Received a GET request');
    res.render('index');
});

app.get('/public/:username', (req,res) => {
    const username = req.params.username;
    console.log(`Received request for username: ${username}`);

    if (username === 'amit') {
        res.send("this is rishabh's page");
    } else {
        res.send("this is not rishabh's page");
    }
});

app.listen(4000);
