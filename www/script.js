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

// Tab functionality and URL hash tracking for Example Games
document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const exampleGamesDetails = document.querySelector('#rules .rule-group details'); // Select the specific details element

  function updateHash(paneId = null) {
    let hash = '#example-games';
    if (exampleGamesDetails && exampleGamesDetails.open) {
        if (paneId) {
            // Remove 'pane-' prefix and add to hash
            hash += '/' + paneId.replace('pane-', '');
        } else {
            // If details open but no specific tab ID, just mark as open (optional, can default to first tab hash)
            // Or better, find the currently active tab and use its ID
            const activePane = exampleGamesDetails.querySelector('.tab-pane.active');
            if (activePane) {
                 hash += '/' + activePane.id.replace('pane-', '');
            } else {
                // Default to the first tab if no active pane found when details is open
                const firstPane = exampleGamesDetails.querySelector('.tab-pane');
                if(firstPane) {
                    hash += '/' + firstPane.id.replace('pane-', '');
                }
            }
        }
    }
     // Prevent adding the same hash repeatedly
    if (window.location.hash !== hash) {
       window.history.replaceState(null, null, hash);
    }
  }

  function activateTabFromHash(hash) {
    // Expected hash format: #example-games, #example-games/open, #example-games/tab-id
    const parts = hash.substring(1).split('/');
    if (parts[0] === 'example-games') {
      if (exampleGamesDetails) {
        exampleGamesDetails.open = true; // Always open details if example-games hash is present

        // Find the target pane ID from the hash, defaulting to the first tab if none specified or invalid
        let targetPaneId = 'pane-building-collection'; // Default to first tab
        if (parts.length > 1) {
          const potentialPaneId = 'pane-' + parts[1];
           // Check if a pane with this ID exists
          const targetPane = document.getElementById(potentialPaneId);
          if (targetPane) {
            targetPaneId = potentialPaneId;
          } else {
             console.warn(`Tab pane with ID ${potentialPaneId} not found. Defaulting to first tab.`);
          }
        }

        // Find and activate the corresponding tab button and pane
        tabButtons.forEach(button => {
            const paneId = button.getAttribute('aria-controls');
            if (paneId === targetPaneId) {
                 button.classList.add('active');
                 button.setAttribute('aria-selected', 'true');
            } else {
                 button.classList.remove('active');
                 button.setAttribute('aria-selected', 'false');
            }
        });
        tabPanes.forEach(pane => {
            if (pane.id === targetPaneId) {
                 pane.classList.add('active');
            } else {
                 pane.classList.remove('active');
            }
        });
        // Scroll to the section after setting state
         exampleGamesDetails.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  function switchTab(event) {
    // Remove active class from all buttons and panes
    tabButtons.forEach(button => {
      button.classList.remove('active');
      button.setAttribute('aria-selected', 'false');
    });
    tabPanes.forEach(pane => {
      pane.classList.remove('active');
    });

    // Add active class to clicked button and corresponding pane
    const button = event.currentTarget;
    const paneId = button.getAttribute('aria-controls');
    const pane = document.getElementById(paneId);

    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');
    pane.classList.add('active');

    // Update the URL hash
    updateHash(paneId);
  }

  // Add click event listeners to all tab buttons
  tabButtons.forEach(button => {
    button.addEventListener('click', switchTab);
  });

  // Add toggle listener for the details element
  if (exampleGamesDetails) {
    exampleGamesDetails.addEventListener('toggle', function() {
        // When details closes, update hash to just #example-games
        // When details opens, update hash to the currently active tab or default
        if (!this.open) {
             window.history.replaceState(null, null, '#example-games');
        } else {
             // When opening, update hash to the current tab
             updateHash(); // Call updateHash without paneId to find the active pane
        }

    });
  }

  // Handle initial load based on hash
  if (window.location.hash) {
      activateTabFromHash(window.location.hash);
  } else {
    // If no hash, set the initial hash state based on default view
    updateHash();
  }

  // Handle browser back/forward button
  window.addEventListener('popstate', function() {
     if (window.location.hash) {
         activateTabFromHash(window.location.hash);
     } else {
        // If hash is cleared, close details and maybe activate first tab
        if(exampleGamesDetails) {
             exampleGamesDetails.open = false;
             // Optionally reset tabs to default first tab state visually
             const firstButton = document.getElementById('tab-building-collection');
             const firstPane = document.getElementById('pane-building-collection');
              tabButtons.forEach(button => button.classList.remove('active'));
              tabPanes.forEach(pane => pane.classList.remove('active'));
             if(firstButton && firstPane) {
                  firstButton.classList.add('active');
                  firstPane.classList.add('active');
             }
        }
     }
  });

});
