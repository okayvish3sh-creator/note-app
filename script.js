// GET HTML ELEMENTS

const newNote = document.getElementById("newNote");

const notesList = document.getElementById("notesList");

const welcome = document.getElementById("welcome");

const editor = document.getElementById("editor");





const content = document.getElementById("content");

const category = document.getElementById("category");

const search = document.getElementById("search");

const deleteBtn = document.getElementById("deleteBtn");

const favoriteBtn = document.getElementById("favoriteBtn");

const themeBtn = document.getElementById("themeBtn");

const wordCount = document.getElementById("wordCount");

const date = document.getElementById("date");

const saveStatus = document.getElementById("saveStatus");


// LOAD NOTES FROM LOCAL STORAGE

let notes = JSON.parse(localStorage.getItem("myNotes")) || [];

let currentNote = null;


// SAVE NOTES

function saveNotes() {

    localStorage.setItem("myNotes", JSON.stringify(notes));

    saveStatus.innerText = "Saved ✓";

}


// SHOW WELCOME SCREEN

function showWelcome() {

    editor.classList.remove("active");

    welcome.style.display = "flex";

    currentNote = null;

}


// OPEN EDITOR

function showEditor() {

    welcome.style.display = "none";

    editor.classList.add("active");

}


// DISPLAY NOTES

function displayNotes() {

    notesList.innerHTML = "";

    notes.forEach(function(note) {

        const card = document.createElement("div");

        card.className = "note-card";

        if (currentNote && currentNote.id === note.id) {
            card.classList.add("active");
        }

        const heading = document.createElement("h3");

        heading.textContent = note.title || "Untitled Note";

        if (note.favorite) {
            heading.textContent += " ❤️";
        }

        const paragraph = document.createElement("p");

        paragraph.textContent = note.content.substring(0, 80);

        const bottom = document.createElement("div");

        bottom.className = "card-bottom";

        const categoryText = document.createElement("span");

        categoryText.textContent = note.category;

        const dateText = document.createElement("span");

        dateText.textContent = new Date(note.date).toLocaleDateString();

        bottom.append(categoryText, dateText);

        card.append(heading, paragraph, bottom);

        card.onclick = function() {

            openNote(note.id);

        };

        notesList.appendChild(card);

    });

}


// CREATE NEW NOTE

function createNote() {

    const note = {

        id: Date.now(),

        title: "",

        

        content: "",

        category: "Personal",

        favorite: false,

        date: new Date().toISOString()

    };

    notes.unshift(note);

    saveNotes();

    openNote(note.id);

}

newNote.onclick = createNote;


// OPEN EXISTING NOTE

function openNote(id) {

    currentNote = notes.find(function(note) {

        return note.id === id;

    });

    if (!currentNote) return;

    showEditor();

    title.value = currentNote.title;


    content.value = currentNote.content;

    category.value = currentNote.category;

    favoriteBtn.innerText = currentNote.favorite ? "❤️" : "♡";

    date.innerText = new Date(currentNote.date).toLocaleString();

    updateWordCount();

    displayNotes();

}


// EDIT AND AUTO SAVE

function updateNote() {

    if (!currentNote) return;

    currentNote.title = title.value;

  

    currentNote.content = content.value;

    currentNote.category = category.value;

    currentNote.date = new Date().toISOString();

    saveNotes();

    updateWordCount();

    displayNotes();

    date.innerText = new Date(currentNote.date).toLocaleString();

}


// AUTO SAVE EVENTS

title.addEventListener("input", updateNote);


content.addEventListener("input", updateNote);

category.addEventListener("change", updateNote);


// DELETE NOTE

deleteBtn.onclick = function() {

    if (!currentNote) return;

    if (confirm("Do you want to delete this note?")) {

        notes = notes.filter(function(note) {

            return note.id !== currentNote.id;

        });

        saveNotes();

        showWelcome();

        displayNotes();

        title.value = "";

       

        content.value = "";

    }

};


// FAVOURITE NOTE

favoriteBtn.onclick = function() {

    if (!currentNote) return;

    currentNote.favorite = !currentNote.favorite;

    favoriteBtn.innerText = currentNote.favorite ? "❤️" : "♡";

    saveNotes();

    displayNotes();

};


// SEARCH NOTES

search.addEventListener("input", function() {

    const value = search.value.toLowerCase();

    notesList.innerHTML = "";

    notes.forEach(function(note) {

        const text = (
            note.title + " " +
            note.content + " " +
            
            note.category
        ).toLowerCase();

        if (text.includes(value)) {

            const card = document.createElement("div");

            card.className = "note-card";

            if (currentNote && currentNote.id === note.id) {
                card.classList.add("active");
            }

            const heading = document.createElement("h3");

            heading.textContent = note.title || "Untitled Note";

            if (note.favorite) {
                heading.textContent += " ❤️";
            }

            const paragraph = document.createElement("p");

            paragraph.textContent = note.content.substring(0, 80);

            card.append(heading, paragraph);

            card.onclick = function() {

                openNote(note.id);

            };

            notesList.appendChild(card);

        }

    });

});


// WORD COUNT

function updateWordCount() {

    const words = content.value.trim().split(/\s+/).filter(Boolean);

    wordCount.innerText = words.length + " words";

}


// DARK MODE

themeBtn.onclick = function() {

    document.body.classList.toggle("dark");

    const darkMode = document.body.classList.contains("dark");

    localStorage.setItem("darkMode", darkMode);

    themeBtn.innerText = darkMode ? "☀ Light Mode" : "🌙 Dark Mode";

};


// LOAD DARK MODE

if (localStorage.getItem("darkMode") === "true") {

    document.body.classList.add("dark");

    themeBtn.innerText = "☀ Light Mode";

}


// INITIAL APP SCREEN

displayNotes();

showWelcome();