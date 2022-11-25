//getting all requiered elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllbtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
    let userData = inputBox.value;//getting user entered value
    if(userData.trim() != 0){//if user values aren't only spaces
        addBtn.classList.add("active"); //active the add button
    }else {
        addBtn.classList.remove("active");//unactive the add button
    }
}
showTasks();

//if user click on the add button
addBtn.onclick = () => {
    let userData = inputBox.value;//getting user entered value
    let getLocal = localStorage.getItem("New Todo"); // getting localstorage
    if(getLocal == null){//creating blank array
        listArr = [];
    }else {
        listArr = JSON.parse(getLocal);//transforming json string into as js object
    }
    listArr.push(userData);//pushing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into json string
    showTasks();//calling showTasks function 
}

//function to add task list inside ul
function showTasks(){
    let getLocalStorageData = localStorage.getItem("New todo"); //getting localstorage
    if(getLocalStorageData == null){//creating blank array
        listArr =[];//creating blanc array
    }else {
        listArr = JSON.parse(getLocalStorageData);//transforming json string into as js object
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length;//passing the length value in pendingNumb
    if(listArr.length > 0){//if array length is greater than 0
        deleteAllbtn.classList.add("active");// active the clearAll button
    }else {
        deleteAllbtn.classList.remove("active");//unactive the clearAll button
    }

    let newLiTag = "";
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span  onclick="deleteTask(${index})"; ><i class="fa-solid fa-trash"></i></span></li>`;
    });
    todoList.innertHTML = newLiTag;//addin new li tag inside ul tag
    inputBox.value = ""; //once task added leave the input filed blank 
}

//delete task function
function deleteTask(){
    let getLocalStorageData = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorageData);
    listArr.splice(index, 1);//delete or remove the particular indexed li
    //after remove the li again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr));//transforming js object into a json string
    showTasks();//calling showTasks function

}

//delete all tasks function 
deleteAllbtn.onclick = () => {
    listArr = []; //empty an array
    //after delete all task again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr));//transforming js object into a json string
    showTasks();//calling showTasks function
}