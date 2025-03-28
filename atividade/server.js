const express = require('express');
const app = express();
const methodOverride = require('method-override')
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';
const homeRoutes = require('./routes/homeRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
require('dotenv').config();

app.set('view engine','ejs')
app.set('views','./views')

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/home', homeRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.redirect('/home');
});



app.listen(PORT, () => {
    console.log(`Servidor rodando no http://${HOST}:${PORT}`)
})