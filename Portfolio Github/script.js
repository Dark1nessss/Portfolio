// script.js

// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
      duration: 1000,
      once: true,
  });
});

// Initialize Particles.js
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});

// Navbar scroll animation
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
  } else {
      navbar.classList.remove('scrolled');
  }
});

// Smooth scrolling for navbar links
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

// Typing effect script
function consoleText(words, id, colors) {
if (colors === undefined) colors = ['#fff'];
let visible = true;
const con = document.getElementById('console');
let letterCount = 1;
let x = 1;
let waiting = false;
const target = document.getElementById(id);
target.setAttribute('style', 'color:' + colors[0]);
window.setInterval(function() {
  if (letterCount === 0 && waiting === false) {
    waiting = true;
    target.innerHTML = words[0].substring(0, letterCount);
    window.setTimeout(function() {
      const usedColor = colors.shift();
      colors.push(usedColor);
      const usedWord = words.shift();
      words.push(usedWord);
      x = 1;
      target.setAttribute('style', 'color:' + colors[0]);
      letterCount += x;
      waiting = false;
    }, 1000);
  } else if (letterCount === words[0].length + 1 && waiting === false) {
    waiting = true;
    window.setTimeout(function() {
      x = -1;
      letterCount += x;
      waiting = false;
    }, 1000);
  } else if (waiting === false) {
    target.innerHTML = words[0].substring(0, letterCount);
    letterCount += x;
  }
}, 120);
window.setInterval(function() {
  if (visible === true) {
    con.className = 'console-underscore hidden';
    visible = false;
  } else {
    con.className = 'console-underscore';
    visible = true;
  }
}, 400);
}

consoleText(['Hi! My name is Dmytro Bohutskyy', 'I am a Programmer'], 'text', ['white', 'white']);

// Fetch GitHub projects and display them
async function fetchGitHubProjects() {
  try {
      const response = await axios.get('https://api.github.com/users/Dark1nessss/repos');
      const projects = response.data;
      const projectList = document.getElementById('project-list');

      projects.forEach(project => {
          const projectElement = document.createElement('div');
          projectElement.className = 'project';
          projectElement.innerHTML = `
              <h3>${project.name}</h3>
              <p>${project.description}</p>
              <a href="${project.html_url}" target="_blank">View on GitHub</a>
          `;
          projectList.appendChild(projectElement);
      });
  } catch (error) {
      console.error('Error fetching GitHub projects:', error);
  }
}

fetchGitHubProjects();
