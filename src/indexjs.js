const now = new Date();

const options = { year:'numeric',month:'long',day:'numeric' };
const formattedDate = now.toLocaleDateString('en-US',options);

const timeoptions = { hour:'numeric',minute:'numeric',second:'numeric' };
const formattedTime = now.toLocaleTimeString('en-US',timeoptions);

document.getElementById('current-time').innerHTML = formattedTime;
document.getElementById('current-date').innerHTML = formattedDate;

document.getElementById('current-date-task').innerHTML = formattedDate;


// $ WHEN YOU PRESS ADD TASK IT WILL POP UP A CARD 
document.getElementById('addtask-button').addEventListener('click', function(){
    document.getElementById('addtask').style.display = 'block';
})

// $ WHEN YOU CLICK THE CANCEL AT THE ADD TASK CARD IT WILL GO BACK TO
// $ MAIN PAGE
document.getElementById('canceltask-button').addEventListener('click', function(){
    document.getElementById('addtask').style.display = 'none';
})

document.getElementById('confirmtask-button').addEventListener('click', function(){
    const TASKTITLE = document.querySelector('.add-title').value;
    const TASKDESCRIPTION = document.querySelector('.description').value;

    // $ CREATE A NEW CARD/DIV TO PUT IN THE TODO LIST
    const NEWTASK = document.createElement('div');
    NEWTASK.classList.add('cardtask');

    NEWTASK.innerHTML = `
        <h1>${TASKTITLE}</h1>
        <p>${TASKDESCRIPTION}</p>
        <button id="todo">To do</button>
        <button id="next">Next</button>
        <button id="back">Back</button>
        <p id="current-date-task">${formattedDate}</p>
    `;

    document.querySelector('.todo-card').appendChild(NEWTASK);

    document.querySelector('.add-title').value = '';
    document.querySelector('.description').value = '';
    


    document.getElementById('addtask').style.display = 'none';



    NEWTASK.querySelector('#next').addEventListener('click', function () {
        const statusButton = NEWTASK.querySelector('#todo');
        const inProgress = NEWTASK.parentElement.classList.contains('inprogress-container-card');
        const onApproval = NEWTASK.parentElement.classList.contains('onapproval-container-card');

        if (inProgress) {
            document.querySelector('.onapproval-container-card').appendChild(NEWTASK);
            statusButton.textContent = 'Done'; 
        } else if (onApproval) {
            NEWTASK.remove(); 
        } else {
            document.querySelector('.inprogress-container-card').appendChild(NEWTASK);
            statusButton.textContent = 'In Progress'; 
        }
    });

    // Handle the "Back" button click
    NEWTASK.querySelector('#back').addEventListener('click', function () {
        const statusButton = NEWTASK.querySelector('#status-button');
        const inProgress = NEWTASK.parentElement.classList.contains('inprogress-container-card');
        const onApproval = NEWTASK.parentElement.classList.contains('onapproval-container-card');

        if (onApproval) {
            document.querySelector('.inprogress-container-card').appendChild(NEWTASK);
            statusButton.textContent = 'In Progress';
        } else if (inProgress) {
            document.querySelector('.todo-card').appendChild(NEWTASK);
            statusButton.textContent = 'To do'; 
        }
    });


});