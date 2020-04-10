// jshint esversion: 8

const addNewJobButton = document.querySelector('.add-jobs-button');
const form = document.querySelector('.add-job-form');
const submitNewJobButton = document.querySelector('.submit-job-button');
const overlay = document.getElementById('overlay');
const companyName = document.querySelector('.company-name');
const jobTitle = document.querySelector('.job-title');
const jobCards = document.querySelector('.job-cards');
const totalJobContainer = document.querySelector('.total-jobs');
let totalJobs = 0;

// Storage


// Open the job form

addNewJobButton.addEventListener('click', () => {
  form.classList.add('active');
  overlay.classList.add('active');
});

// Clicking continue in the form

submitNewJobButton.addEventListener('click', (e) => {
  e.preventDefault();
  let company = companyName.value;
  let title = jobTitle.value;
  form.classList.remove('active');
  overlay.classList.remove('active');
  createJobCard(company, title);
  form.reset();
});

//Create the html for the job cards

function createJobCard(company, title){
var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
const dateNow = new Date();
const usableTime = dateNow.toISOString();
const card = `
  <div class="job-card-container" style="background-color:${randomColor};">
  <div class="job-card-content">
    <i class="fas fa-copyright fa-3x"></i>
    <div class="job-card-text">
      <h1 class="job-card-company">${company}</h1>
      <h2 class="job-card-title">${title}</h2>
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
  totalJobs++;
  getTotalJobs();
}

function getTotalJobs(){
  const total = parseInt(totalJobs);
  if (total <= 1) {
  totalJobContainer.innerHTML = total + ' JOB';
} else {
  totalJobContainer.innerHTML = total + ' JOBS';
 }
}
