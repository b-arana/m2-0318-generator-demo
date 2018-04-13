require("dotenv").config();

const mongoose = require('mongoose');
const Book = require('../models/Book');
const Author = require('../models/Author');
const books_data = require('./book_data');

const dbURL = process.env.DBURL;
mongoose.connect(dbURL).then(() =>{
    console.log(`Connected to db ${dbURL}`);
    Book.collection.drop();


    books_data.forEach(book_data => {
        let author = new Author(book_data.author)
        .save()
        .then( author => {
            let book =  new Book({
                title: book_data.title,
                author: author._id,
                rating: book_data.rating,
                description: book_data.description
            })
            .save()
            .then( () => console.log("Created book"))
        })
    })
    //mongoose.disconnect();
})
