function countMessage() {
    const element = document.getElementById('message-form');
    const nbCharacters = element.value.length;
    const maxLength = 150;
    const charactersLeft = maxLength - nbCharacters;
    const paragraphReplace = document.getElementById('lengthMessage');

    if (nbCharacters !== 0) {
        if (charactersLeft < 0) {
            paragraphReplace.classList.add('error');
            paragraphReplace.innerHTML = 0;
            element.classList.add('red-border');
        }
        else {
            paragraphReplace.innerHTML = charactersLeft;
            paragraphReplace.classList.remove('error');
            element.classList.remove('red-border');
        }
    }
}

function toggleMenu() {
    const container = document.getElementById('submenu-sm');
    //if (container.classList.contains('open')) {
    //    add('open');
    //} else {
    //    remove('open')
    //}
    container.classList.toggle('open');
}