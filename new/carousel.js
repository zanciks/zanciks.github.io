var figure, nav, allPages, theta, pageIndex;

var jumps = document.querySelector(`.jump-buttons`);

window.addEventListener('load', () => {
    var pages = document.querySelector('.content');
    display(pages);
});

function display(pages) {
	figure = pages.querySelector('figure');
	nav = pages.querySelector('nav');
	allPages = figure.children;
	pageCount = allPages.length;

	theta =  2 * Math.PI / pageCount;
	pageIndex = 0;
	
	setupCarousel();

    window.addEventListener('resize', () => { 
		setupCarousel() 
	});

	nav.addEventListener('click', onNavClick, true);
}

function setupCarousel(style) {
    var style = parseFloat(getComputedStyle(allPages[0]).width);
    var	apothem = style / (2 * Math.tan(Math.PI / pageCount));
    
    figure.style.transformOrigin = `50% 50% ${- apothem}px`;

    for (i = 1; i < pageCount; i++) {
        allPages[i].style.transformOrigin = `50% 50% ${- apothem}px`;
        allPages[i].style.transform = `rotateY(${i * theta}rad)`;
    }
        
    rotateCarousel(pageIndex);
}

function onNavClick(e) {
    e.stopPropagation();
    
    var t = e.target;
    if (t.tagName.toUpperCase() != 'BUTTON') {return;}
    if (t.classList.contains('next')) {pageIndex++;}
    else {pageIndex--;}

    rotateCarousel(pageIndex);
}

function rotateCarousel(pageIndex) {
    // the normal JS modulo doesn't work for mod(negative, positive) so we use our own
    var index = ((pageIndex % allPages.length) + allPages.length) % allPages.length; 
    allPages[index].appendChild(jumps);

    figure.style.transform = `rotateY(${pageIndex * -theta}rad)`;
}