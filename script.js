const addBtn = document.getElementById("add");
const submitBtn = document.getElementById("submit");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

addBtn.addEventListener('click', openAddModal);
overlay.addEventListener('click', closeAddModal);
submitBtn.addEventListener('click', closeAddModal);

let myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function openAddModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeAddModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}