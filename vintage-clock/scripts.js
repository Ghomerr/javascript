const MONTHS = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];
const DAYS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

let chronoValue = 0;

function displayNiddles(speedNiddle, bigNiddle, smallNiddle) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    speedNiddle.css('bottom', centerY - 13);
    speedNiddle.css('left', 3 + centerX - speedNiddle.width() / 2);

    bigNiddle.css('bottom', centerY - 24);
    bigNiddle.css('left', 3 + centerX - bigNiddle.width() / 2);
   
    smallNiddle.css('bottom', centerY - 26);
    smallNiddle.css('left', 4 + centerX - smallNiddle.width() / 2);
}

function displayDate(dateDisplay) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    dateDisplay.css('top', centerY - 17);
    dateDisplay.css('left', centerX + 80);

    const currentTime = new Date;
    const day = currentTime.getDate();
    const dayOfWeek = DAYS[currentTime.getDay()];
    const month = MONTHS[currentTime.getMonth()];
    dateDisplay.text(dayOfWeek + ' ' + day + ' ' + month);
}

function pad(value) {
    return value < 10 ? '0' + value : value;
}

function displayChrono(chronoDisplay) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    chronoDisplay.css('top', centerY - 17);
    chronoDisplay.css('right', centerX + 80);

    chronoValue++;
    const hours = Math.floor(chronoValue / 3600);
    const minutes = Math.floor(chronoValue % 3600 / 60);
    const seconds = chronoValue - (hours * 3600 + minutes * 60);
    chronoDisplay.text(pad(hours) + ':' + pad(minutes) + ':' + pad(seconds));
}

function updateTime(speedNiddle, bigNiddle, smallNiddle) {
    const currentTime = new Date;
    
    const seconds = currentTime.getSeconds();
    const minutes = currentTime.getMinutes() + seconds / 60;
    const hours = currentTime.getHours() % 12 + minutes / 60;   

    const hoursAngle = Math.ceil(hours * 360 / 12);
    const minutesAngle = Math.ceil(minutes * 360 / 60);
    const secondsAngle = Math.ceil(seconds * 360 / 60);

    speedNiddle.css('transform', 'rotate(' + secondsAngle + 'deg)');
    bigNiddle.css('transform', 'rotate(' + minutesAngle + 'deg)');
    smallNiddle.css('transform', 'rotate(' + hoursAngle + 'deg)');
}

$(document).ready(() => {
    const bigNiddle = $('#big-niddle');
    const smallNiddle = $('#small-niddle');
    const speedNiddle = $('#speed-niddle');
    const dateDisplay = $('#date-display');
    const chronoDisplay = $('#chrono-display');

    displayNiddles(speedNiddle, bigNiddle, smallNiddle);
    displayDate(dateDisplay);
    displayChrono(chronoDisplay);
    $(window).resize(() => {
        displayNiddles(speedNiddle, bigNiddle, smallNiddle);
        displayDate(dateDisplay);
    });

    updateTime(speedNiddle, bigNiddle, smallNiddle);
    setInterval(() => {
        updateTime(speedNiddle, bigNiddle, smallNiddle);
        displayChrono(chronoDisplay);
    }, 1000);
});