const app = require('express');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
const Book = require('../models/book');
const Author = require('../models/author');

// const uploadPath = path.join('public', Book.coverImageBasePath);
const imageMimeTypes = ['image/jpeg', 'image/gif', 'image/png'];

const router = app.Router();

// const upload = multer({
//     dest: uploadPath,
//     fileFilter: (res, file, callback) => {
//         callback(null, imageMimeTypes.includes(file.mimetype));
//     },
// });

router.get('/', async (req, res) => {
    let query = Book.find();
    if (req.query.title != null && req.query.title != '') {
        query = query.regex('title', new RegExp(req.query.title, 'i'));
    }
    if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
        query = query.gte('publishedDate', req.query.publishedAfter);
    }
    if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
        query = query.lte('publishedDate', req.query.publishedBefore);
    }
    try {
        const books = await query.exec();
        res.render('books/index', {
            books: books,
            searchOptions: req.query,
        });
    } catch {
        res.redirect('/');
    }
});

router.get('/new', async (req, res) => {
    renderNewPage(res, new Book());
});

//router.post('/new', upload.single('cover'), async (req, res) => {
router.post('/new', async (req, res) => {
    //const fileName = req.file != null ? req.file.filename : null;
    console.log(req.file);
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishedDate: new Date(req.body.publishedDate),
        pageCount: req.body.pageCount,
        description: req.body.description,
        //  coverImage: fileName,
    });
    saveCover(book, req.body.cover);

    try {
        const newBook = await book.save();
        //res.redirect(`/books/${newBook.id}`);
        res.redirect('/books');
    } catch {
        // if (book.coverImage != null) {
        //     removeBookCover(book.coverImage);
        // }
        renderNewPage(res, book, true);
    }
});

async function renderNewPage(res, book, hasError = false) {
    try {
        const authors = await Author.find({});
        const params = {
            book: book,
            authors: authors,
        };
        if (hasError) params.errorMessage = 'Error creating book';
        res.render('books/new', params);
    } catch {
        res.redirect('/books');
    }
}

// function removeBookCover(filename) {
//     fs.unlink(path.join(uploadPath, filename), (err) => {
//         if (err) {
//             console.error(err);
//         }
//     });
// }

function saveCover(book, coverEncoded) {
    if (coverEncoded == null) return;
    const cover = JSON.parse(coverEncoded);
    if (cover != null && imageMimeTypes.includes(cover.type)) {
        book.coverImage = new Buffer.from(cover.data, 'base64');
        book.coverImageType = cover.type;
    }
}

module.exports = router;
