// Clock and date
const date = new Date().toDateString() ;
const setdate = document.querySelector(".setdate");
setdate.innerHTML = date;

setInterval(function(){
const time = new Date().toLocaleTimeString();
const settime = document.querySelector(".settime");
settime.innerHTML = time;
},500);

//Variables and styling them

const inputLine = document.querySelector("input");
const itemList = document.querySelector(".added-Items");
itemList.style.color = "black";
itemList.style.fontSize = "24px"
itemList.style.fontWeight = "bold";
itemList.style.margin = "15px"
const button = document.querySelector(".addItem");

//Events

button.addEventListener("click", (e) =>{
    e.preventDefault();
    let newItem = document.createElement("li");
    newItem.textContent = inputLine.value;
    itemList.appendChild(newItem);
    inputLine.value = ""
})
