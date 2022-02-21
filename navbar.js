const body = document.body;
const navbarLinks = document.querySelector(".navbar .links");

let higlightedLink = navbarLinks.querySelector(".highlighted");
let btn = document.querySelector(".icon");

function handleLinkClick() {
	higlightedLink.classList.remove("highlighted");
	this.parentElement.classList.add("highlighted");
	higlightedLink = this.parentElement;
	closeMenu();
}

function handleMenu() {
	btn = btn || document.querySelector(".icon");
	if (!btn) return;

	let idx = navbarLinks.className.search("open");

	if (idx !== -1) {
		closeMenu();
	} else {
		openMenu();
	}
}

function openMenu(elem) {
	navbarLinks.className += " open";
	body.classList.add("scroll-lock");
	btn.innerHTML = "X";
}

function closeMenu(elem) {
	navbarLinks.className = navbarLinks.className.replace("open", "").trim();
	body.classList.remove("scroll-lock");
	btn.innerHTML = "&#9776";
}


navbarLinks.querySelectorAll("li").forEach((elem) => {
	elem.querySelector("a").addEventListener("click", handleLinkClick);
});