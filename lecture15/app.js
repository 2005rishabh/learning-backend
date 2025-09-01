const exp = require('express');
const app = exp();
const path = require('path');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(exp.static(path.join(__dirname, 'public')));
app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('index');
})

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});