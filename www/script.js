// Cardfield animation
class Card {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.z = Math.random() * 1500 + 500;
    this.size = 20;
    this.suit = ['♠', '♣', '♥', '♦'][Math.floor(Math.random() * 4)];
    this.color = this.suit === '♥' || this.suit === '♦' ? '#E74C3C' : '#2C3E50';
  }

  update() {
    this.z -= 10;
    if (this.z <= 0) {
      this.reset();
      this.z = 1500;
    }
    
    const scale = (1500 - this.z) / 1500;
    this.x = this.x + (Math.random() - 0.5) * 2;
    this.y = this.y + (Math.random() - 0.5) * 2;
    
    // Keep within bounds
    if (this.x < 0) this.x = this.canvas.width;
    if (this.x > this.canvas.width) this.x = 0;
    if (this.y < 0) this.y = this.canvas.height;
    if (this.y > this.canvas.height) this.y = 0;
    
    const x = this.x;
    const y = this.y;
    const size = this.size * scale;
    
    this.ctx.fillStyle = this.color;
    this.ctx.font = `${size}px Arial`;
    this.ctx.fillText(this.suit, x, y);
  }
}

// Initialize cardfield
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('cardfield');
  const ctx = canvas.getContext('2d');
  
  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  
  // Create cards
  const cards = Array.from({ length: 100 }, () => new Card(canvas));
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cards.forEach(card => card.update());
    requestAnimationFrame(animate);
  }
  
  animate();
});

// Utility function to scroll to a section smoothly
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// Add smooth scrolling to all internal links
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const sectionId = this.getAttribute("href").substring(1);
      scrollToSection(sectionId);
    });
  });
});

// Tab functionality
document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  // Function to activate a specific tab
  function activateTab(button) {
    // Remove active class from all buttons and panes
    button.closest('.tab-buttons').querySelectorAll('.tab-button').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    button.closest('.tabs').querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.remove('active');
    });

    // Add active class to clicked button and corresponding pane
    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');
    const paneId = button.getAttribute('aria-controls');
    document.getElementById(paneId).classList.add('active');

    // Store the active tab ID in localStorage
    localStorage.setItem('activeExampleTab', paneId);
  }

  // Add click event listeners to all tab buttons
  tabButtons.forEach(button => {
    button.addEventListener('click', () => activateTab(button));
  });

  // Restore the active tab from localStorage on page load
  const savedTabId = localStorage.getItem('activeExampleTab');
  if (savedTabId) {
    const savedButton = document.querySelector(`[aria-controls="${savedTabId}"]`);
    if (savedButton) {
      activateTab(savedButton);
    }
  }
});

// Handle details toggle
document.querySelector('details').addEventListener('toggle', (event) => {
  const details = event.target;
  const isOpen = details.hasAttribute('open');
  
  // Update aria-expanded on the summary
  const summary = details.querySelector('summary');
  summary.setAttribute('aria-expanded', isOpen);
});
