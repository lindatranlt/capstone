console.log("hello potato");

let button = document.getElementById("button");
let grid = document.getElementById("grid");
let banner = document.querySelector('#banner');

function onButtonClick(evt) {
	evt.preventDefault();
	console.log('button is clicked');
	
	let newCard = document.createElement("div");
	grid.appendChild(newCard);
	newCard.className += " card";

	
	let newThumbnail = document.createElement("div");
	newCard.appendChild(newThumbnail);
	newThumbnail.className += " thumbnail";
	
	
	let newCardContent = document.createElement("div");

	newCard.appendChild(newCardContent);
	newCardContent.className += " cardContent";

	let newTitleInput = prompt("New blog title?");
	let newTitle = document.createElement("h1");
	newCardContent.appendChild(newTitle);
	newTitle.style.marginBottom = "10px";
	newTitle.innerHTML = newTitleInput;

	let newPInput = prompt("Paste blog paragraph here");
	let newP = document.createElement("p");
	newCardContent.appendChild(newP);
	newP.innerHTML = newPInput;

	console.log("button works");
};

function handleSubmit(evt) {
	evt.preventDefault();
	
	alert('The form has been submitted successfully!');
};

function mouseover () {
	alert('!!An idea is just an idea until you make it a reality!!');
};

button.addEventListener('click', onButtonClick);


banner.addEventListener('mouseover', mouseover);