// Cardfield animation
class Card {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.reset();
  }

  reset() {
    // Start from random position across the screen
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.z = Math.random() * 2000 + 1000;
    this.size = 20;
    this.suit = ['♠', '♣', '♥', '♦'][Math.floor(Math.random() * 4)];
    this.color = this.suit === '♥' || this.suit === '♦' ? '#E74C3C' : '#FFFFFF';
    
    // Calculate random angle for straight line movement
    this.angle = Math.random() * Math.PI * 2;
    this.speed = 2 + Math.random() * 2;
  }

  update() {
    this.z -= 20;
    if (this.z <= 0) {
      this.reset();
      this.z = 3000;
    }
    
    // Stronger perspective effect
    const scale = Math.pow((3000 - this.z) / 3000, 2) * 3;
    
    // Move in straight line based on angle, but reduce lateral movement as z decreases
    const lateralSpeed = this.speed * (this.z / 3000);
    this.x += Math.cos(this.angle) * lateralSpeed;
    this.y += Math.sin(this.angle) * lateralSpeed;
    
    // Reset position if out of bounds
    if (this.x < -20 || this.x > this.canvas.width + 20 || 
        this.y < -20 || this.y > this.canvas.height + 20) {
      this.reset();
    }
    
    // Draw card
    const size = this.size * scale;
    this.ctx.fillStyle = this.color;
    this.ctx.font = `${size}px Arial`;
    this.ctx.fillText(this.suit, this.x, this.y);
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
  
  // Create many more cards
  const cards = Array.from({ length: 400 }, () => new Card(canvas));
  
  // Animation loop
  function animate() {
    // Clear with more transparent black to make trails last longer
    ctx.fillStyle = 'rgba(42, 42, 74, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
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
