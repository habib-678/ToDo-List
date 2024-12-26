let textInput = document.querySelector('#text_input');
let button = document.querySelector('#submit_button');
let taskList = document.querySelector('#task_list');

window.addEventListener('load', () => {
  document.getElementById('text_input').value = '';
  showTask();
});

button.addEventListener('click', ()=>{
  let textInputValue = textInput.value.trim();

  if(textInputValue !== ''){
    let list = document.createElement('li');
    let listTime = document.createElement('span');
    listTime.classList.add('time')

    let currentTime = new Date().toLocaleTimeString();
    listTime.innerHTML = currentTime;
    list.appendChild(listTime);
    
    list.classList = 'todo'; 
    list.innerHTML = textInputValue + `<img src="delete.png" class="deleteBtn">`;

    taskList.appendChild(list);


    list.addEventListener('click', ()=>{
      list.classList.toggle('checked');
      saveData(); 
    })
    let listDeletaBtn = list.querySelector('.deleteBtn');
    listDeletaBtn.addEventListener('click', function(){
      list.remove(); 
      saveData(); 
    })
  }
  else{
    alert('You Have to Write Something!')
  }
  textInput.value = '';
  saveData(); 
});

function saveData() {
  // Remove event listeners before saving
  taskList.querySelectorAll('.deleteBtn').forEach(btn => {
    btn.removeEventListener('click', deleteTask);
  });

  // Save the current HTML structure
  localStorage.setItem('Data', taskList.innerHTML);
}

function showTask() {
  // Load tasks from localStorage
  let data = localStorage.getItem('Data');
  if (data) {
    taskList.innerHTML = data;

    // Reattach event listeners and restore checked status
    taskList.querySelectorAll('.deleteBtn').forEach(btn => {
      btn.addEventListener('click', deleteTask);
    });

    taskList.querySelectorAll('li').forEach((listItem) => {
      listItem.addEventListener('click', () => {
        listItem.classList.toggle('checked');
        saveData();  // Save after toggling the checked status
      });
    });
  }
}

// Delete task functionality
function deleteTask() {
  this.closest('li').remove();  // Remove the task
  saveData();  // Save after removing an item
}