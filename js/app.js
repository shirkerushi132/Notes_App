//   Author: Rushikesh Shirke 
//   contact: shirkerushi132@gmail.com

console.log('Hello User, This is a Notes App. Created by Rushikesh Shirke');

showNotes();

// If user wants to add a note, add it to local storage

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    // notesObj.push(addTxt.value.toLowerCase());
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    // console.log(notesObj);
    showNotes();
});

// function to showNotes

function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="notecard my-2 mx-2 card" style="width: 18rem;">
        <!-- <img src="..." class="card-img-top" alt="..."> -->
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id="${index}" onclick="deleteNotes(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
      </div>            `
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Noting to show! Use "Add Note" button to add the notes.`
    }
}

// function  to deleteNOtes

function deleteNotes(index) {
    // console.log('I m deleting', index);

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// search function

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    // console.log('To be searched', inputVal);
    let noteCards = document.getElementsByClassName('notecard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})