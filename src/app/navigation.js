const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector("#primary-menu");

if (menuButton && menu) {
	const setMenuOpen = (isOpen) => {
		menu.classList.toggle("is-open", isOpen);
		menuButton.setAttribute("aria-expanded", String(isOpen));
		menuButton.querySelector("i").className = isOpen
			? "fa-solid fa-xmark"
			: "fa-solid fa-bars";
	};

	menuButton.addEventListener("click", () => {
		setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
	});

	menu.addEventListener("click", (event) => {
		if (event.target.closest("a")) setMenuOpen(false);
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") setMenuOpen(false);
	});
}