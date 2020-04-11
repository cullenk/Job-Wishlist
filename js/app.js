// jshint esversion: 8

const addNewJobButton = document.querySelector('.add-jobs-button');
const addJobForm = document.querySelector('.add-job-form');
const removeForm = document.querySelector('.remove-form');
const submitNewJobButton = document.querySelector('.submit-job-button');
const overlay = document.getElementById('overlay');
const companyName = document.querySelector('.company-name');
const jobTitle = document.querySelector('.job-title');
const jobCards = document.querySelector('.job-cards');
const totalJobContainer = document.querySelector('.total-jobs');
const clearAllButton = document.querySelector('.clear-all-button');
let totalJobs = 0;

// Storage

let companiesArray = localStorage.getItem('companyItems') ? JSON.parse(localStorage.getItem('companyItems')) : []; //Check to see if there are items in storage, if so, parse them and get them. If not, set an empty array for us to work with in this session
let titlesArray = localStorage.getItem('titleItems') ? JSON.parse(localStorage.getItem('titleItems')) : [];

localStorage.setItem('companyItems', JSON.stringify(companiesArray)); //Items is our custom key, and the cards are in the itemsArray (parsed to strings) as our values. Set everything into localStorage
const companyData = JSON.parse(localStorage.getItem('companyItems')); //Get the items in our storage, if any, for when the page loads. We need to parse these from the string format so we can work with the data.
localStorage.setItem('titleItems', JSON.stringify(titlesArray));
const titleData = JSON.parse(localStorage.getItem('titleItems'));

console.log(companyData);
console.log(titleData);

//loop through our data saved in the array from the previous sessions and recreate cards for them.
  companyData.forEach(item => {
  let companyIndex = companyData.indexOf(item); //get the index of each item in the company array
  console.log(companyIndex);
  createJobCard(companyData[companyIndex], titleData[companyIndex]); //It'll match the index of the title array since they were put in together. Just pass that to the function call. 
});

// Open the job form
addNewJobButton.addEventListener('click', () => {
  addJobForm.classList.add('active');
  overlay.classList.add('active');
});

// Event Listener for inside the form

submitNewJobButton.addEventListener('click', (e) => {
  e.preventDefault();
  let company = companyName.value;
  let title = jobTitle.value;
  addJobForm.classList.remove('active');
  overlay.classList.remove('active');
  createJobCard(company, title); //Call the create card function with the user's values passed.
  companiesArray.push(company); //Add these values to our itemsArray
  titlesArray.push(title); //Add these values to our itemsArray

  localStorage.setItem('companyItems', JSON.stringify(companiesArray));
  localStorage.setItem('titleItems', JSON.stringify(titlesArray)); //Update our local storage to remember these new additions in the array.
  addJobForm.reset();
});

//Function to create the company cards elements.
function createJobCard(company, title){
var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
const dateNow = new Date();
const usableTime = dateNow.toISOString();
const trash = document.querySelector('.trash-button');
const card = `
  <div class="job-card-container" style="background-color:${randomColor};">
  <div class="job-card-content">
    <i class="fas fa-copyright fa-3x"></i>
    <div class="job-card-text">
      <h1 class="job-card-company">${company}</h1>
      <h2 class="job-card-title">${title}</h2>
    </div>
    <div class="trash-button">
    <i class="fas fa-trash fa-2x"></i>
    </div>
  </div>
  <div class="job-card-time-stamp">
    <p>Added <time class="timeago" datetime="${usableTime}"></time></p>
  </div>
  </div>
  `;
  jobCards.innerHTML += card;
  jQuery(document).ready(function() {
       $("time.timeago").timeago();
     });
  //Add to the total job count and recall the function to display it.
  totalJobs++;
  getTotalJobs();
  //Add click functionality to the delete button on each card made

}

function getTotalJobs(){
  const total = parseInt(totalJobs);
  if (total == 1) {
  totalJobContainer.innerHTML = total + ' JOB';
} else {
  totalJobContainer.innerHTML = total + ' JOBS';
 }
}


// Remove Job Card

clearAllButton.addEventListener('click', () => {
  localStorage.clear();
  jobCards.innerHTML = '';
  totalJobs = 0;
  getTotalJobs();
});

function deletePrompt(e) {
  const removeButton = document.querySelector('.remove-button');
  const cancelButton = document.querySelector('.cancel-button');
  overlay.classList.add('active');
  removeForm.classList.add('active');
}

function deleteCard() {
  localStorage.remove();
}
