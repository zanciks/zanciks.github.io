function toggleColorInversion() {
    const elementsToInvert = document.querySelectorAll(
        'body, .window, .window-titlebar, .window-body, a, hr, button'
    );

    elementsToInvert.forEach((element) => {
        if (element.style.backgroundColor === 'white') {
            element.style.backgroundColor = 'black';
            element.style.color = 'white';
            element.style.borderColor = 'white';
            element.style.background = 'black';
        } else {
            element.style.backgroundColor = 'white';
            element.style.color = 'black';
            element.style.borderColor = 'black';
            element.style.background = 'white';
        }
    });
}

document.getElementById('color-invert-button').addEventListener('click', toggleColorInversion);