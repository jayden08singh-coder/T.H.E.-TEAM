/* ============================================================
   main.js
   Controls which screen is visible, builds the option cards,
   and remembers what the student picked.
   ============================================================ */

/* ---------- 1. Saved choices ---------- */
// Starts empty. Each value is filled in when the student picks a card.
const userChoices = {
  category: null,
  budget: null,
  dining: null
};

/* ---------- 2. Grab the page elements we need ---------- */
const screens = {
  welcome:  document.getElementById("screen-welcome"),
  category: document.getElementById("screen-category"),
  budget:   document.getElementById("screen-budget"),
  dining:   document.getElementById("screen-dining")
};

const progressBar = document.getElementById("progress");
const progressDots = document.querySelectorAll(".progress-dot");

const categoryContinue = document.getElementById("category-continue");
const budgetContinue   = document.getElementById("budget-continue");
const diningContinue   = document.getElementById("dining-continue");

const summaryBox = document.getElementById("summary-box");
const diningNav  = document.getElementById("dining-nav");

/* ---------- 3. Show one screen at a time ---------- */
function showScreen(screenName) {
  // Hide every screen, then show only the one we asked for
  for (const name in screens) {
    screens[name].classList.remove("active");
  }
  screens[screenName].classList.add("active");

  updateProgress(screenName);

  // Jump back to the top of the page so the new screen is in view
  window.scrollTo({ top: 0 });
}

// Lights up the progress dots (hidden on the welcome screen)
function updateProgress(screenName) {
  const stepNumbers = { welcome: 0, category: 1, budget: 2, dining: 3 };
  const currentStep = stepNumbers[screenName];

  progressBar.classList.toggle("visible", currentStep > 0);

  progressDots.forEach(function (dot, index) {
    dot.classList.toggle("filled", index < currentStep);
  });
}

/* ---------- 4. Build the option cards ---------- */
// Creates one card per option and puts them in the container.
// choiceKey is the name in userChoices (category, budget, or dining).
function buildCards(containerId, options, choiceKey, continueButton) {
  const container = document.getElementById(containerId);

  options.forEach(function (option) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "option-card";
    card.dataset.id = option.id;
    card.setAttribute("aria-pressed", "false");
    card.innerHTML =
      '<span class="option-emoji" aria-hidden="true">' + option.emoji + "</span>" +
      '<span class="option-label">' + option.label + "</span>";

    card.addEventListener("click", function () {
      selectCard(container, card, choiceKey, option, continueButton);
    });

    container.appendChild(card);
  });
}

// Runs when a card is clicked: marks it selected and saves the choice
function selectCard(container, clickedCard, choiceKey, option, continueButton) {
  // Remove the highlight from the other cards in this group
  container.querySelectorAll(".option-card").forEach(function (card) {
    card.classList.remove("selected");
    card.setAttribute("aria-pressed", "false");
  });

  // Highlight the clicked card
  clickedCard.classList.add("selected");
  clickedCard.setAttribute("aria-pressed", "true");

  // Save the choice (we keep the whole option so we have the label later)
  userChoices[choiceKey] = option;

  // The student has chosen something, so Continue can be used
  continueButton.disabled = false;
}

/* ---------- 5. Button actions ---------- */
// Welcome -> Category
document.getElementById("find-food-button").addEventListener("click", function () {
  showScreen("category");
});

// Logo takes you back to the welcome page
document.getElementById("logo-button").addEventListener("click", function () {
  showScreen("welcome");
});

// Category screen
document.getElementById("category-back").addEventListener("click", function () {
  showScreen("welcome");
});
categoryContinue.addEventListener("click", function () {
  showScreen("budget");
});

// Budget screen
document.getElementById("budget-back").addEventListener("click", function () {
  showScreen("category");
});
budgetContinue.addEventListener("click", function () {
  showScreen("dining");
});

// Dining screen
document.getElementById("dining-back").addEventListener("click", function () {
  showScreen("budget");
});
diningContinue.addEventListener("click", function () {
  showSummary();
});

// Start over: clear everything and return to the welcome page
document.getElementById("start-over-button").addEventListener("click", resetAll);

/* ---------- 6. Summary (placeholder until Milestone 2) ---------- */
function showSummary() {
  document.getElementById("summary-category").textContent = userChoices.category.label;
  document.getElementById("summary-budget").textContent   = userChoices.budget.label;
  document.getElementById("summary-dining").textContent   = userChoices.dining.label;

  summaryBox.hidden = false;
  diningNav.hidden = true;

  // Handy for testing: open the browser console to see the saved choices
  console.log("Saved choices:", userChoices);
}

/* ---------- 7. Start over ---------- */
function resetAll() {
  userChoices.category = null;
  userChoices.budget = null;
  userChoices.dining = null;

  // Clear highlights and lock the Continue buttons again
  document.querySelectorAll(".option-card").forEach(function (card) {
    card.classList.remove("selected");
    card.setAttribute("aria-pressed", "false");
  });
  categoryContinue.disabled = true;
  budgetContinue.disabled = true;
  diningContinue.disabled = true;

  summaryBox.hidden = true;
  diningNav.hidden = false;

  showScreen("welcome");
}

/* ---------- 8. Start the page ---------- */
buildCards("category-options", categoryOptions, "category", categoryContinue);
buildCards("budget-options",   budgetOptions,   "budget",   budgetContinue);
buildCards("dining-options",   diningOptions,   "dining",   diningContinue);
showScreen("welcome");
