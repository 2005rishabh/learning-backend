const exp = require('express');
const app = exp();

app.get('/', (req, res) => {
    res.send('Hello, World!');
})
app.listen(() => {
    console.log('Server is running on http://localhost:3000');
});

app.listen(4000);