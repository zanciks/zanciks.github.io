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
    
    allPages[0].appendChild(jumps);
    for (i = 1; i < pageCount; i++) {
        allPages[i].appendChild(jumps.cloneNode(true));
    }
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
    figure.style.transform = `rotateY(${pageIndex * -theta}rad)`;
}

function jump(targetIndex) {
    rotateCarousel(pageIndex + wrapIndex(targetIndex));
    pageIndex += wrapIndex(targetIndex);
}

function mod(n, m) {
    return ((n % m) + m) % m; 
}

function wrapIndex(targetIndex) {
    var start = mod(pageIndex, allPages.length);
    var target = mod(targetIndex, allPages.length);

    var forwardDist = (target - start + allPages.length) % allPages.length;
    var backwardDist = (start - target + allPages.length) % allPages.length;

    if (forwardDist <= backwardDist) {return forwardDist}
    else {return -backwardDist}
}