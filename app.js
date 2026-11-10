const express = require('express');
const path = require('path');
const clientRoutes = require('./routes/client/clientRoutes');
const adminRoutes = require('./routes/admin/adminRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminRoutes);
app.use('/', clientRoutes);

app.use((req, res) => {
  res.status(404).render('client/404', { pageTitle: 'Page Not Found | Veron Crest' });
});

module.exports = app;
