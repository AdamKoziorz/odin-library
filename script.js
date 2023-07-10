// ---------------------
// Book and Library Model
// ---------------------

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function Library() {
  let books = [];

  this.addBook = function(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    books.push(newBook);
  }

  this.removeBook = function(title, author) {
    books = books.filter((book) => (book.title !== title) && (book.author !== author));
  }

  this.getAllBooks = function() {
    return books;
  }

  this.getBook = function(title, author) {
    return books.find((book) => (book.title === title) && (book.author === author));
  }

  this.existBook = function(title, author) {
    return books.some((book) => (book.title === title) && (book.author === author));
  }
}

const libraryModel = new Library();



// ---------------------
// Book and Library View
// ---------------------

const addForm = document.getElementById("modal-form");
const addBtn = document.getElementById("add");
const submitBtn = document.getElementById("submit");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const library = document.getElementById("library");

addBtn.addEventListener('click', openAddModal);
overlay.addEventListener('click', closeAddModal);
submitBtn.addEventListener('click', submitBook);

const resetLibraryView = () => {
  library.innerHTML = "";
}

const updateLibraryView = () => {
  resetLibraryView();
  const books = libraryModel.getAllBooks();
  for (let book of books) {
    generateBookView(book);
  }
}

// Given a book, generates a book card in the DOM and adds it to the library view
const generateBookView = (book) => {
    const bookCard = document.createElement('div');
    const info = document.createElement('div');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const buttons = document.createElement('div');
    const readBtn = document.createElement('button');
    const removeBtn = document.createElement('button');
  
    bookCard.classList.add('book');
    info.classList.add('book-info');
    buttons.classList.add('book-buttons');
    readBtn.onclick = toggleRead;
    removeBtn.onclick = removeBook;
  
    title.textContent = book.title;
    author.textContent = `By: ${book.author}`;
    pages.textContent = `${book.pages} pages`;
    removeBtn.textContent = 'Remove';
  
    if (book.isRead) {
      readBtn.textContent = 'Read';
      bookCard.classList.add('read');
      readBtn.classList.add('read');
    } else {
      readBtn.textContent = 'Not Read';
      bookCard.classList.add('not-read');
      readBtn.classList.add('not-read');
    }
  
    info.appendChild(title)
    info.appendChild(author)
    info.appendChild(pages)
    bookCard.appendChild(info);
    buttons.appendChild(readBtn);
    buttons.appendChild(removeBtn);
    bookCard.appendChild(buttons);
    library.appendChild(bookCard);
}

// Validates the add book form - only adding the book if it is unique (title, author)
// and if all required information has been filled out
function submitBook(e) {
  if (addForm.checkValidity()) {
    e.preventDefault();
    
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById("isRead").checked;

    if (!libraryModel.existBook(title, author)) {
      libraryModel.addBook(title, author, pages, isRead);
      updateLibraryView();
      closeAddModal();
    } else {
      alert("Book already exists!");
    }
  }
}

function toggleRead(e) {
  const title = e.target.parentNode.parentNode.firstChild.firstChild.innerHTML;
  const author = e.target.parentNode.parentNode.firstChild.firstChild.nextSibling.innerHTML.replaceAll("By: ", '');
  const book = libraryModel.getBook(title, author);
  book.isRead = !book.isRead;
  updateLibraryView();
}

function removeBook(e) {
  const title = e.target.parentNode.parentNode.firstChild.firstChild.innerHTML;
  const author = e.target.parentNode.parentNode.firstChild.firstChild.nextSibling.innerHTML.replaceAll("By: ", '');
  libraryModel.removeBook(title, author);
  updateLibraryView();
}


function openAddModal() {
  addForm.reset()
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeAddModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}