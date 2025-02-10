// Navbar Functionality
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

// Toggle Hamburger Menu
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close Navbar on Link Click (for mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
const resultMessage = document.getElementById('result');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Disable the submit button to prevent multiple submissions
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    // Get form data
    const formData = new FormData(contactForm);

    try {
      // Send form data to Web3Forms
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      // Display success or error message
      if (data.success) {
        resultMessage.innerHTML = `
          <p class="success">Thank you! Your message has been sent successfully.</p>
        `;
        contactForm.reset(); // Clear the form
      } else {
        resultMessage.innerHTML = `
          <p class="error">Oops! Something went wrong. Please try again later.</p>
        `;
      }
    } catch (error) {
      resultMessage.innerHTML = `
        <p class="error">Oops! Something went wrong. Please try again later.</p>
      `;
    } finally {
      // Re-enable the submit button
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    }
  });
}

// Typing Animation for Hero Section
const typingText = document.querySelector('.typing-animation');
if (typingText) {
  const professions = ["A passionate Machine Learning Engineer", "A passionate Data Scientist", "A passionate AI Enthusiast", "A passionate Python Developer"];
  let index = 0;
  let charIndex = 0;

  const type = () => {
    if (charIndex < professions[index].length) {
      typingText.textContent += professions[index].charAt(charIndex);
      charIndex++;
      setTimeout(type, 50);
    } else {
      setTimeout(erase, 1000);
    }
  };

  const erase = () => {
    if (charIndex > 0) {
      typingText.textContent = professions[index].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 50);
    } else {
      index = (index + 1) % professions.length;
      setTimeout(type, 500);
    }
  };

  // Start the Typing Animation
  type();
}

// // Dark Mode Toggle
// const themeToggle = document.getElementById('theme-toggle');
// const themeIcon = document.getElementById('theme-icon');
// const body = document.body;

// // Check for saved theme in localStorage
// const savedTheme = localStorage.getItem('theme');
// if (savedTheme === 'dark-mode') {
//   body.classList.add('dark-mode');
//   themeIcon.classList.remove('fa-moon');
//   themeIcon.classList.add('fa-sun');
// }

// // Toggle Dark Mode
// themeToggle.addEventListener('click', () => {
//   body.classList.toggle('dark-mode');
//   if (body.classList.contains('dark-mode')) {
//     themeIcon.classList.remove('fa-moon');
//     themeIcon.classList.add('fa-sun');
//     localStorage.setItem('theme', 'dark-mode');
//   } else {
//     themeIcon.classList.remove('fa-sun');
//     themeIcon.classList.add('fa-moon');
//     localStorage.setItem('theme', 'light-mode');
//   }
// });