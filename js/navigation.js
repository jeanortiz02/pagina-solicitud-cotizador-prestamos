function initNavigation(elements) {
  const { menuButton, navLinks } = elements;

  function closeMenu() {
    navLinks.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }

  function toggleMenu() {
    const isOpen = navLinks.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  }

  function handleNavLinksClick(event) {
    if (event.target.matches("a")) {
      closeMenu();
    }
  }

  menuButton.addEventListener("click", toggleMenu);
  navLinks.addEventListener("click", handleNavLinksClick);
}
