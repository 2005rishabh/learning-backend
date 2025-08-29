const exp = require('express');
const app = exp();
const path = require('path');
const userModel = require('./models/user');

app.use(exp.static(path.join(__dirname, 'public')));
app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Home (Create User Form)
app.get('/', (req, res) => {
    res.render('index');
});

// Read Users
app.get('/read', async (req, res) => {
    let users = await userModel.find();
    res.render('read', { users });
});

// Create User
app.post('/create', async (req, res) => {
    let { name, email, image } = req.body;
    await userModel.create({ name, email, image });
    res.redirect('/read');
});

// Delete User
app.get('/delete/:id', async (req, res) => {
    await userModel.findByIdAndDelete(req.params.id);
    res.redirect('/read');
});

// Edit User - Show Form
app.get('/edit/:id', async (req, res) => {
    let user = await userModel.findById(req.params.id);
    res.render('edit', { user });
});

// Edit User - Submit Changes
app.post('/edit/:id', async (req, res) => {
    let { name, email, image } = req.body;
    await userModel.findByIdAndUpdate(req.params.id, { name, email, image });
    res.redirect('/read');
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
