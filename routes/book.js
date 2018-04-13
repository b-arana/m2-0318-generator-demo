const express = require("express");
const router = express.Router();
const debug = require("../log")(__filename);

const Book = require("../models/Book");
const Author = require("../models/Author");

/* CRUD -> Create show form */
router.get("/new", (req, res) => {
  res.render("book_new");
});

/* CRUD -> Acquire form params and create the book object in DB */
router.post("/new", (req, res) => {
  const { title, description, author, rating } = req.body;

  const book = new Book({ title, description, author, rating });
  book.save().then(book => {
    console.log("EL LIBRO");
    console.log(book);
    res.redirect("/book");
  });
});

/* CRUD -> Retrieve ALL */
router.get("/", (req, res) => {
  Book.find().then(books => {
    debug(books);
    res.render("book_list", { books });
  });
});

/* CRUD -> Retrieve Detail */
router.get("/:id", (req, res, next) => {
  // Book.findById(req.params.id).then(book => {
  //   console.log(book);
  //   Author.findById(book.author).then(author => {
  //     console.log(author);
  //     res.render("book_detail", { book, author });
  //   })
  // });

  Book.findById(req.params.id)
  .populate('author')
  .then(book => {
    console.log(book)
    res.render("book_detail", { book});
  });
});

/* CRUD -> Udpate, show book update form */
router.get("/:id/edit", (req, res) => {
  Book.findById(req.params.id).then(book => {
    res.render("book_edit", { book });
  });
});

/* CRUD -> Udpate, update the book in DB */
router.post("/:id/edit", (req, res) => {
  const { title, description, author, rating } = req.body;
  const updates = { title, description, author, rating };
  Book.findByIdAndUpdate(req.params.id, updates).then(() => {
    res.redirect("/book");
  });
});

/* CRUD -> Delete the book in DB */
router.get("/:id/delete", (req, res) => {
  Book.findByIdAndRemove(req.params.id).then(() => {
    res.redirect("/book");
  });
});

module.exports = router;
