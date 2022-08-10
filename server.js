if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

const methodOverride = require('method-override');

const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors');
const booksRouter = require('./routes/books');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', __dirname + '/layouts/layout');

app.use(expressLayouts);
app.use('/', express.static(__dirname + '/public'));
app.use('/deps', express.static(__dirname + '/node_modules'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(methodOverride('_method'));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDb'));

app.use('/', indexRouter);
app.use('/authors', authorsRouter);
app.use('/books', booksRouter);

app.listen(process.env.PORT || 3000);
