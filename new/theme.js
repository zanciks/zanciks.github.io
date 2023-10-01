function toggleColorInversion() {
    const currentPrimaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();

    if (currentPrimaryColor === 'black') {
        document.documentElement.style.setProperty('--primary-color', 'white');
        document.documentElement.style.setProperty('--secondary-color', 'black');
    } else {
        document.documentElement.style.setProperty('--primary-color', 'black');
        document.documentElement.style.setProperty('--secondary-color', 'white');
    }
}

document.getElementById('color-invert-button').addEventListener('click', toggleColorInversion);