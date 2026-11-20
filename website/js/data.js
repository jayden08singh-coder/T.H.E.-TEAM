/* ============================================================
   data.js
   The choices shown on each screen. To change a label or an
   emoji, edit it here. No other file needs to change.
   Each option has:
     id    - a short name used by the code
     label - the text students see
     emoji - a placeholder icon (swap for images later)
   ============================================================ */

const categoryOptions = [
  { id: "burgers",  label: "Burgers",         emoji: "🍔" },
  { id: "pizza",    label: "Pizza",           emoji: "🍕" },
  { id: "asian",    label: "Asian Food",      emoji: "🍜" },
  { id: "wraps",    label: "Wraps",           emoji: "🌯" },
  { id: "warm",     label: "Warm Meals",      emoji: "🍲" },
  { id: "drinks",   label: "Drinks & Snacks", emoji: "🧋" }
];

const budgetOptions = [
  { id: "under10",  label: "Under $10",       emoji: "💵" },
  { id: "under15",  label: "Under $15",       emoji: "💰" },
  { id: "flexible", label: "Flexible Budget", emoji: "✨" }
];

const diningOptions = [
  { id: "quick",    label: "Quick & Casual",  emoji: "⚡" },
  { id: "sitdown",  label: "Sit Down Meal",   emoji: "🍽️" },
  { id: "takeout",  label: "Takeout",         emoji: "🥡" }
];
