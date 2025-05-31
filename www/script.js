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
