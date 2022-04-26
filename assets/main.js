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
let items = []; // local storage variable to store items
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
    items.push(inputLine.value);//storage
    localStorage.setItem('itemsToShop', JSON.stringify(items));//storage
    const linkDelete = document.createElement("a");
    linkDelete.className = 'deleteIcon';
    linkDelete.innerHTML = '<i class="fa fa-trash-o"></i>'; 
    linkDelete.style.color="red";
    linkDelete.style.float ="right";
    newItem.appendChild(linkDelete);
    itemList.appendChild(newItem);
    inputLine.value = ""
})
//Storage load

let displayStoragedItems = ()=>{
    let loadFromStorage = JSON.parse(localStorage.getItem("itemsToShop"));
    if(loadFromStorage != null){

        for(i=0; i<loadFromStorage.length; i++) {
            let newItem = document.createElement("li");
            newItem.appendChild(document.createTextNode(loadFromStorage[i]))
            itemList.appendChild(newItem); 
            const linkDelete = document.createElement("a");
            linkDelete.className = 'deleteIcon';
            linkDelete.innerHTML = '<i class="fa fa-trash-o"></i>'; 
            linkDelete.style.color="red";
            linkDelete.style.float ="right";
            newItem.appendChild(linkDelete);
        };
        items=loadFromStorage;
    }

}
displayStoragedItems();
