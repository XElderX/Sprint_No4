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
let itemsCount = document.querySelector(".list-number");
const inputLine = document.querySelector("input");
const itemList = document.querySelector(".added-Items");
itemList.style.color = "black";
itemList.style.fontSize = "24px"
itemList.style.fontWeight = "bold";
itemList.style.margin = "15px"
const button = document.querySelector(".addItem");
//creating clear all button
const clearAllBtn = document.createElement('button');
button.parentNode.insertBefore(clearAllBtn,button.nextSibling)
clearAllBtn.innerText = "Clear all List"
clearAllBtn.classList.add('btn', 'btn-danger', 'm-3', 'btn-lg')
clearAllBtn.style.display="none";
const updateButton = document.querySelector('.editItem'); // update btn
let tempStore  //variable for edit function

//Events
//add and store to localstorage
button.addEventListener("click", (e) =>{
    e.preventDefault();
    if(inputLine.value!=""){
        if(localStorage.getItem('itemsToShop') === null) {
            items = [];
        }
        else {
            items = JSON.parse(localStorage.getItem('itemsToShop'));
        }
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
        const edit = document.createElement("a"); // edit
        edit.className = 'editIcon'; //edit
        edit.innerHTML = '<i class="fa fa-pencil"></i>';
        edit.style.float = 'right';
        edit.style.marginRight="15px";
        newItem.appendChild(edit);
        itemList.appendChild(newItem);
        inputLine.value = ""
        clearAllBtn.style.display="inline";
    }
    itemsCount.innerText= checkItemsCount();
        clearbtnDisplay();
})


// remove item from the list and localStorage
itemList.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.parentElement.classList.contains('deleteIcon')) {
        //console.log(e.target.parentElement.parentElement)
        e.target.parentElement.parentElement.remove()
        removeItemLocal(e.target.parentElement.parentElement)
        function removeItemLocal(itemDelete) {
            //console.log(itemDelete.textContent)
            let localStorageToRemove =JSON.parse(localStorage.getItem('itemsToShop'));
            //console.log(localStorageToRemove)
            localStorageToRemove.forEach(function(
                item){
                if(itemDelete.textContent === item){
                    localStorageToRemove.splice(localStorageToRemove.indexOf(itemDelete.textContent), 1)
                    localStorage.setItem('itemsToShop', JSON.stringify(localStorageToRemove));
                    itemsCount.innerText= checkItemsCount();
                }  
            })
        };
    }

    itemsCount.innerText= checkItemsCount();
    clearbtnDisplay();
});


// edit event 
itemList.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.parentElement.classList.contains('editIcon')){
        button.style.display = 'none';
        updateButton.style.display = 'inline';
        clearAllBtn.style.display = 'none';
        tempStore = e.target.parentElement.parentElement.textContent;
        inputLine.value = e.target.parentElement.parentElement.textContent;
    }  
    });
//update
    updateButton.addEventListener('click', (e) => {
        if(inputLine.value!=""){
       /*  console.log(tempStore);
        console.log(inputLine.value); */
        function updateItem(itemToUpdate,newItem) {
            let localStorageEdit =JSON.parse(localStorage.getItem('itemsToShop'));  
            localStorageEdit.splice(localStorageEdit.indexOf(itemToUpdate), 1, newItem);
            localStorage.setItem('itemsToShop', JSON.stringify(localStorageEdit));
            while(itemList.firstChild){
                itemList.removeChild(itemList.firstChild);
            }
        };
        updateItem(tempStore, inputLine.value)
        button.style.display = 'inline';
        updateButton.style.display = 'none';
        clearbtnDisplay();
        displayStoragedItems();
    }
    else{
        alert("Please enter valid value")
    }
    inputLine.value ="";
    })


//remove all items 

clearAllBtn.addEventListener('click',(e) => {
    e.preventDefault();

    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
    clearLocalStorage();
    itemsCount.innerText= checkItemsCount();
    clearbtnDisplay();
});

// functions
//Storage load

let displayStoragedItems = ()=>{
    let loadFromStorage = JSON.parse(localStorage.getItem("itemsToShop"));
    if(loadFromStorage != null){
        clearAllBtn.style.display="inline"

        for(i=0; i<loadFromStorage.length; i++) {
            let newItem = document.createElement("li");
            newItem.appendChild(document.createTextNode(loadFromStorage[i]))
            itemList.appendChild(newItem); 
            const linkDelete = document.createElement("a");
            linkDelete.className = 'deleteIcon';//delete
            linkDelete.innerHTML = '<i class="fa fa-trash-o"></i>'; 
            linkDelete.style.color="red";
            linkDelete.style.float ="right";
            newItem.appendChild(linkDelete);
            const edit = document.createElement("a"); // edit
            edit.className = 'editIcon'; //edit
            edit.innerHTML = '<i class="fa fa-pencil"></i>';
            edit.style.float = 'right';
            edit.style.marginRight="15px";
            newItem.appendChild(edit);
        };
        clearbtnDisplay();
        itemsCount.innerText=checkItemsCount();
    }
}

function checkItemsCount () {
    
     if (localStorage.getItem('itemsToShop') === null) {
         
         return 0;
     }
     else {
        return JSON.parse(localStorage.getItem("itemsToShop")).length;
     }
}
//storage clear
function clearLocalStorage(){
    localStorage.clear();
}
//button clear list display
function clearbtnDisplay (){
let check = checkItemsCount ()
check >0 ? clearAllBtn.style.display = "inline" 
: clearAllBtn.style.display = "none" 
}
checkItemsCount();
displayStoragedItems();