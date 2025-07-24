import initCardsComponent from "./components/cards.js";
import footerComponent from "./components/footer.js";
import headerComponent from "./components/header.js";

document.addEventListener("DOMContentLoaded", function () {
  headerComponent();
  footerComponent();
  initCardsComponent(3);
});
