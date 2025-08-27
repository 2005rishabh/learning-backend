const exp = require('express');
const app = exp();
const path = require('path');
const userModel = require('./models/user');

app.use(exp.static(path.join(__dirname, 'public')));
app.use(exp.json())
app.use(exp.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); 

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/read', async (req, res) => {
    let users = await userModel.find();
    res.render('read', {users});
})

app.post('/create', async (req, res) => {
    let {name, email, image} = req.body;
    let newU = await userModel.create({
        name, email, image
    })

    res.send(newU);
})

app.listen(3000);