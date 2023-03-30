

/**
 * CSCI2720/ESTR2106 Assignment 1
 * Bootstrap Web Page with a Web Form
 *
 * I declare that the assignment here submitted is original
 * except for source material explicitly acknowledged,
 * and that the same or closely related material has not been
 * previously submitted for another course.
 * I also acknowledge that I am aware of University policy and
 * regulations on honesty in academic work, and of the disciplinary
 * guidelines and procedures applicable to breaches of such
 * policy and regulations, as contained in the website.
 *
 * University Guideline on Academic Honesty:
 *   http://www.cuhk.edu.hk/policy/academichonesty
 * Faculty of Engineering Guidelines to Academic Honesty:
 *   https://www.erg.cuhk.edu.hk/erg/AcademicHonesty
 *
 * Student Name: xxx <LU Yixi>
 * Student ID  : xxx <1155144481>
 * Date        : xxx <2022-10-07>
 */

// task 0 special
function ShowSpecial(){
    
    var s = document.getElementById('special');
    if (s.style.display === 'none') {
        s.style.display = 'block';
    } else {
        s.style.display = 'none';
    }
}

//task1 Align
let click = 1;

function ChangeAlign(){
    var s = document.querySelectorAll('section h2');
    if(click == 1){
    
        s.forEach((heading) => {
            heading.classList.remove("text-start");
            heading.classList.add("text-center");
        })
    }
    if(click == 2){
        s.forEach((heading) => {
            heading.classList.remove("text-center");
            heading.classList.add("text-end");
        })
    }
    if(click == 3){
        s.forEach((heading) => {
            heading.classList.remove("text-end");
            heading.classList.add("text-start");
        })
    }
    click++;
    if (click > 3) click = 1;
}

//task2 new hobby
function NewHobby(){
    var s = document.getElementById('hobbylist');
    let new_hobby = window.prompt("Enter your new hobby");
    if (new_hobby != "" && new_hobby != null) {
        let li = document.createElement("li");
        li.innerHTML = new_hobby;
        li.classList.add("list-group-item");
        s.appendChild(li);
    }else{
        alert("invalid input");
    }
}

//task3 Scroll
var s = document.querySelector('.progress');
function Scroll(){
    if (s.style.display === 'none') {
        s.style.display = 'flex';
    } else {
        s.style.display = 'none';
    }
}
const progress_bar = document.querySelector(".progress-bar");
function ScrollUpdate() {
    let percent = (window.scrollY / (document.body.clientHeight - window.innerHeight)) * 100;
    progress_bar.style.width = `${percent}%`;
}

function processform() {
    //check Vallidaity
    let valid = true;
    var s = document.querySelector("#new-email");
    if(!s.checkValidity()){
        alert("Email address is invalid");
        s.classList.add("is-invalid");
        valid = false;
    }else{
        s.classList.remove("is-invalid");
    }

    var s = document.querySelector("#new-comment");
    if(!s.checkValidity()){
        alert("Please enter your comment");
        s.classList.add("is-invalid");
        valid = false;
    }else{
        s.classList.remove("is-invalid");
    }
    if(!valid){return;}

    // set up a new element
    let newComment = document.createElement("div");
    let element = '<div><svg height="100" width="100"><circle cx="50" cy="50" r="40"></svg></div><div><h5></h5><p></p></div>';
    newComment.innerHTML = element;

    // set the classes of the div and its children div's
    newComment.className = "d-flex";
    newComment.querySelectorAll("div")[0].className = "flex-shrink-0"; // 1st div
    newComment.querySelectorAll("div")[1].className = "flex-grow-1"; // 2nd div

    // increment the comment id
    let lastComment = document.querySelector("#comments").lastElementChild; // instead of lastChild for div element
    newComment.id = 'c' + (Number(lastComment.id.substr(1)) + 1);

    // change contents of <h5> and <p> according to form input with id
    newComment.querySelector("h5").innerHTML = document.querySelector("#new-email").value;
    newComment.querySelector("p").innerHTML = document.querySelector("#new-comment").value;

    // draw circle
    let color = document.querySelectorAll("input[name=new-color]:checked")[0].value; // look for checked radio buttons
    newComment.querySelector("circle").setAttribute("fill", color);

    // append to #comment
    document.querySelector("#comments").appendChild(newComment);

    // reset the form to clear contents
    document.querySelector("form").reset();
    savefile();

}

function loadfile() {
    fetch('./comments.txt')
    .then(res => res.text())
    .then(txt => document.querySelector("#comments").innerHTML = txt);
  }
  
function savefile() {
    fetch('./comments.txt', {
    method: 'PUT',
    body: document.querySelector("#comments").innerHTML
    });
}