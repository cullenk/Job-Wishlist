// jshint esversion: 8
const overlay = document.getElementById('overlay');

const addNewJobButton = document.querySelector('.add-jobs-button');
const addJobForm = document.querySelector('form');
const submitNewJobButton = document.querySelector('.submit-job-button');

const removeForm = document.querySelector('.remove-job-form');

const companyName = document.querySelector('.company-name');
const jobTitle = document.querySelector('.job-title');

const totalJobContainer = document.querySelector('.total-jobs');
const jobCards = document.querySelector('.job-cards');

const logoUrls = document.querySelectorAll('.company-logo');

const clearAllButton = document.querySelector('.clear-all-button');
const clearAllForm = document.querySelector('.clear-all-form');
const clearButtonInForm = document.querySelector('.clear-button');

// Storage

//Check to see if there are items in storage, if so, parse them and get them. If not, set an empty array for us to work with in this session
let jobArray = localStorage.getItem('jobItems') ? JSON.parse(localStorage.getItem('jobItems')) : [];

//jobItems is our custom key, and the cards are in the jobArray (parsed to strings) as our values. Set everything into localStorage
localStorage.setItem('jobItems', JSON.stringify(jobArray));

//Get the items in our storage, if any, for when the page loads. We need to parse these from the string format so we can work with the data.
const jobData = JSON.parse(localStorage.getItem('jobItems'));

//loop through our data saved in the array from the previous sessions and recreate cards for them.
  jobData.forEach(job => {
    createJobCard(job.company, job.title, job.key, job.time); //It'll match the index of the title array since they were put in together. Just pass that to the function call.
});

// Open the job form
addNewJobButton.addEventListener('click', () => {
  addJobForm.classList.add('active');
  overlay.classList.add('active');
});

// Event Listener for inside the form
addJobForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let company = companyName.value;
  let title = jobTitle.value;
  let key = Math.random().toString(36).substr(2, 9);
  let time = new Date().toISOString();

  let job = {
    company: company,
    title: title,
    key: key,
    time: time
  };

  addJobForm.classList.remove('active');
  overlay.classList.remove('active');
  createJobCard(company, title, key, time); //Call the create card function with the user's values passed.
  jobArray.push(job);
  getTotalJobs();
  localStorage.setItem('jobItems', JSON.stringify(jobArray));
  addJobForm.reset();
});



//Function to create the company cards elements.
function createJobCard(company, title, key, time){
var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
const card = `
  <div id="${key}" class="job-card-container" style="background-color:${randomColor};">
  <div class="job-card-content">
    <img class="company-logo" src="//logo.clearbit.com/${company}.com" alt="${company} logo">
    <div class="job-card-text">
      <h1 class="job-card-company">${company}</h1>
      <h2 class="job-card-title">${title}</h2>
    </div>
    <div class="fas fa-trash fa-2x clickable"></div>
  </div>
  <div class="job-card-time-stamp">
    <p>Added <time class="timeago" datetime="${time}"></time></p>
  </div>
  </div>
  `;
  jobCards.innerHTML += card;
  jQuery(document).ready(function() {
       $("time.timeago").timeago();
     });
  //Add to the total job count and recall the function to display it.
  getTotalJobs();
  this.addEventListener('click', clickMe);
}

function getTotalJobs(){
  const total = jobArray.length;
  if (total == 1) {
    totalJobContainer.innerHTML = total + ' JOB';
} else {
    totalJobContainer.innerHTML = total + ' JOBS';
 }
}

//click functionality for trash icon
function clickMe(e) {
  if($(event.target).hasClass('clickable')){
    deletePrompt(e);
  }
}

// REMOVING CARDS

//clear all cards
clearAllButton.addEventListener('click', (e) => {
  clearPrompt();
});

//Delete prompt for entire card list
function clearPrompt(e){
  const clearButton = document.querySelector('.clear-button');
  const cancelButton = document.querySelector('.clear-cancel-button');
  overlay.classList.add('active');
  clearAllForm.classList.add('active');

clearButton.addEventListener('click', () => {
  jobArray.splice(0, jobArray.length);
  localStorage.clear();
  jobCards.innerHTML = '';
  getTotalJobs();
  overlay.classList.remove('active');
  clearAllForm.classList.remove('active');
});

cancelButton.addEventListener('click', () => {
  overlay.classList.remove('active');
  clearAllForm.classList.remove('active');
});
}


function deletePrompt(e) {
  let card = e.target;
  const deleteButton = document.querySelector('.delete-button');
  const cancelButton = document.querySelector('.cancel-button');
  overlay.classList.add('active');
  removeForm.classList.add('active');

  deleteButton.addEventListener('click', () => {
    let cardKey = card.parentElement.parentElement.id;
    card.parentElement.parentElement.remove();
    overlay.classList.remove('active');
    removeForm.classList.remove('active');

    for (let i = 0; i < jobArray.length; i++)
    if (jobArray[i].key === cardKey) {
      jobArray.splice(i, 1);
      break;
   }

    getTotalJobs();
    localStorage.setItem('jobItems', JSON.stringify(jobArray));
  });

  cancelButton.addEventListener('click', () => {
    overlay.classList.remove('active');
    removeForm.classList.remove('active');
  });
}
