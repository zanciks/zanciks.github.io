var figure, nav, allCards, theta, cardIndex;

var jumps = document.querySelector(`.jump-buttons`);

window.addEventListener('load', () => {
    var cards = document.querySelector('.content');
    display(cards);
});

function display(cards) {
	figure = cards.querySelector('figure');
	nav = cards.querySelector('nav');
	allCards = figure.children;
	cardCount = allCards.length;

	theta =  2 * Math.PI / cardCount;
	cardIndex = 0;
	
	setupCarousel();

    window.addEventListener('resize', () => { 
		setupCarousel() 
	});

	nav.addEventListener('click', onNavClick, true);
    
    allCards[0].appendChild(jumps);
    for (i = 1; i < cardCount; i++) {
        allCards[i].appendChild(jumps.cloneNode(true));
    }
}

function setupCarousel(style) {
    var style = parseFloat(getComputedStyle(allCards[0]).width);
    var	apothem = style / (2 * Math.tan(Math.PI / cardCount));
    
    figure.style.transformOrigin = `50% 50% ${- apothem}px`;

    for (i = 1; i < cardCount; i++) {
        allCards[i].style.transformOrigin = `50% 50% ${- apothem}px`;
        allCards[i].style.transform = `rotateY(${i * theta}rad)`;
    }
        
    rotateCarousel(cardIndex);
}

function onNavClick(e) {
    e.stopPropagation();
    
    var t = e.target;
    if (t.tagName.toUpperCase() != 'BUTTON') {return;}
    if (t.classList.contains('next')) {cardIndex++;}
    else {cardIndex--;}

    rotateCarousel(cardIndex);
}

function rotateCarousel(cardIndex) {
    figure.style.transform = `rotateY(${cardIndex * -theta}rad)`;
}

function jump(targetIndex) {
    rotateCarousel(cardIndex + wrapIndex(targetIndex));
    cardIndex += wrapIndex(targetIndex);
}

function mod(n, m) {
    return ((n % m) + m) % m; 
}

function wrapIndex(targetIndex) {
    var start = mod(cardIndex, allCards.length);
    var target = mod(targetIndex, allCards.length);

    var forwardDist = (target - start + allCards.length) % allCards.length;
    var backwardDist = (start - target + allCards.length) % allCards.length;

    if (forwardDist <= backwardDist) {return forwardDist}
    else {return -backwardDist}
}