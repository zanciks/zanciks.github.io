function cycleTheme() {
    const themeValue = getComputedStyle(document.documentElement).getPropertyValue('--theme');

    if (themeValue == '0') {
        document.documentElement.style.setProperty('--primary-color', 'white');
        document.documentElement.style.setProperty('--secondary-color', 'black');
        document.documentElement.style.setProperty('--theme', '1');
    } if (themeValue == '1') {
        document.documentElement.style.setProperty('--primary-color', '#382b26');
        document.documentElement.style.setProperty('--secondary-color', '#b8c2b9');
        document.documentElement.style.setProperty('--theme', '2');
    } if (themeValue == '2') {
        document.documentElement.style.setProperty('--primary-color', '#004c3d');
        document.documentElement.style.setProperty('--secondary-color', '#ffeaf9');
        document.documentElement.style.setProperty('--theme', '3');
    } if (themeValue == '3') {
        document.documentElement.style.setProperty('--primary-color', '#051b2c');
        document.documentElement.style.setProperty('--secondary-color', '#8bc8fe');
        document.documentElement.style.setProperty('--theme', '4');
    } if (themeValue == '4') {
        document.documentElement.style.setProperty('--primary-color', 'black');
        document.documentElement.style.setProperty('--secondary-color', 'white');
        document.documentElement.style.setProperty('--theme', '0');
    }
}

document.getElementById('color-invert-button').addEventListener('click', cycleTheme);