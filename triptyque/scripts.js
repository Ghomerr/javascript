const COLORS = {
    PURPLE: {
        key: 'PURPLE',
        name: 'VIOLET',
        img: 'purple_chrono.png',
        css: '#6d48b5',
        font: 'black'
    },
    BLUE: {
        key: 'BLUE',
        name: 'BLEU',
        img: 'blue_chrono.png',
        css: '#3371cf',
        font: 'white'
    },
    BLUE_IMG: {
        key: 'BLUE_IMG',
        name: 'IMAGE BLEUE',
        img: 'simple_chrono.png',
        css: '#3371cf',
        font: 'white',
        background: 'BLUE-IMG.jpg'
    },
    GREEN: {
        key: 'GREEN',
        name: 'VERT',
        img: 'green_chrono.png',
        css: '#2ecc71',
        font: 'black'
    },
    YELLOW: {
        key: 'YELLOW',
        name: 'JAUNE',
        img: 'yellow_chrono.png',
        css: '#f1c40f',
        font: 'black'
    },
    YELLOW_IMG: {
        key: 'YELLOW_IMG',
        name: 'IMAGE JAUNE',
        img: 'simple_chrono.png',
        css: '#f1c40f',
        font: 'white',
        background: 'YELLOW-IMG.jpg'
    },
    ORANGE: {
        key: 'ORANGE',
        name: 'ORANGE',
        img: 'orange_chrono.png',
        css: '#e57838',
        font: 'black'
    },
    BROWN: {
        key: 'BROWN',
        name: 'MARRON',
        img: 'brown_chrono.png',
        css: '#ef926e',
        font: 'black'
    },
    RED: {
        key: 'RED',
        name: 'ROUGE',
        img: 'red_chrono.png',
        css: '#e74c3c',
        font: 'black'
    },
    RED_IMG: {
        key: 'RED_IMG',
        name: 'IMAGE ROUGE',
        img: 'simple_chrono.png',
        css: '#e74c3c',
        font: 'white',
        background: 'RED-IMG.jpg'
    },
    PINK: {
        key: 'PINK',
        name: 'ROSE',
        img: 'pink_chrono.png',
        css: '#d53fb5',
        font: 'black'
    },
    BLACK: {
        key: 'BLACK',
        name: 'NOIR',
        img: 'black_chrono.png',
        css: '#2c2c2c',
        font: 'white'
    },
    GRAY: {
        key: 'GRAY',
        name: 'GRIS',
        img: 'gray_chrono.png',
        css: 'gray',
        font: 'black'
    },
    WHITE: {
        key: 'WHITE',
        name: 'BLANC',
        img: 'white_chrono.png',
        css: 'white',
        font: 'black'
    },
};

function computeChronoTimer(chrono) {
    const minutes = Math.floor(chrono.value / 60);
    const seconds = chrono.value - minutes * 60;
    return padValue(minutes) + ':' + padValue(seconds);
}

function displayChrono(chrono, forced) {
    if (chrono.value > 0) {
        if (chrono.isRunning) {
            chrono.value--;
            chrono.element.val(computeChronoTimer(chrono));
        } else if (forced) {
            chrono.element.val(computeChronoTimer(chrono))
        }
        if (chrono.value <= 0) {
            chrono.element.addClass('finished');
        }
    } else {
        if (chrono.value % 2 === 0) {
            chrono.element.show();
        } else {
            chrono.element.hide();
        }
        chrono.value--;
    }
}

function padValue(value) {
    return value < 10 ? '0' + value : value;
}

function getStorageKey(teamInput) {
    return 'MAURIAC-' + teamInput.attr('id') + '-NAME';
}

function updateTeamColumnColor(teamColumn, color) {
    color.isTaken = true;
    teamColumn.addClass(color.key);
    if (color.background) {
        teamColumn.css('background-image', 'url("' + color.background + '")');
        teamColumn.css('background-position', 'center');
        teamColumn.css('background-repeat', 'no-repeat');
        teamColumn.css('background-size', 'cover');
    } else {
        teamColumn.css('background', '');
        teamColumn.css('background-color', color.css);
    }
    const teamChronoImg = teamColumn.find('.chrono-container img');
    teamChronoImg.attr('src', color.img);
    const teamTitle = teamColumn.find('.team-input');
    teamTitle.css('color', color.font);
}

function buildColorPickerPane(colorPickerPane, colorDivsContainer, currentColor) {
    colorDivsContainer.empty();
    for (const colorKey of Object.keys(COLORS)) {
        const color = COLORS[colorKey];
        colorDiv = $('<div class="color-div" id="color-div-' + colorKey + '"></div>');
        if (color.background) {
            colorDiv.css('background-image', 'url("' + color.background + '")');
            colorDiv.css('background-size', '20px');
        } else {
            colorDiv.css('background-color', color.css);
        }
        
        if (!color.isTaken) {
            colorDiv.on('click', () => {
                const chrono = colorPickerPane.data('chrono');
                console.log('click on color', color, 'of chrono', chrono);
                const lastColor = chrono.color;
                delete lastColor.isTaken;
                chrono.color = color;
                const teamColumn = $('.team-column.' + lastColor.key);
                teamColumn.removeClass(lastColor.key);
                updateTeamColumnColor(teamColumn, color);
            });
        } else {
            colorDiv.css('cursor', 'not-allowed');
        }
        if (currentColor.key === colorKey) {
            colorDiv.addClass('selected');
        }
        colorDiv.attr('title', color.name);
        colorDivsContainer.append(colorDiv);
    }
}

$(document).ready(() => {
    const nextButton = $('#next-button');
    const freezeButton = $('#freeze-button');

    const firstChrono = {
        element: $('#FIRST-CHRONO'),
        value: 20 * 60,
        isRunning: false
    };
    const middleChrono = {
        element: $('#MIDDLE-CHRONO'),
        value: 20 * 60,
        isRunning: false
    };
    const lastChrono = {
        element: $('#LAST-CHRONO'),
        value: 20 * 60,
        isRunning: false
    };

    firstChrono.next = middleChrono;
    middleChrono.next = lastChrono;
    lastChrono.next = firstChrono;
    const allChronos = {
        'FIRST-CHRONO': firstChrono,
        'MIDDLE-CHRONO': middleChrono,
        'LAST-CHRONO': lastChrono,
    };

    // Init chrono display
    displayChrono(firstChrono, true);
    displayChrono(middleChrono, true);
    displayChrono(lastChrono, true);

    let currentChrono;

    nextButton.on('click', () => {
        colorPickerButtons.hide();
        nextButton.text('NEXT');
        if (!currentChrono) {
            currentChrono = firstChrono;
        } else {
            currentChrono.isRunning = false;
            currentChrono.element.parent().parent().removeClass('is-running');
            currentChrono = currentChrono.next;
            if (currentChrono.value <= 0) {
                currentChrono = currentChrono.next;
            }
        }
        currentChrono.isRunning = true;
        currentChrono.element.parent().parent().addClass('is-running');
    });

    freezeButton.on('click', () => {
        currentChrono.isRunning = !currentChrono.isRunning;
        if (currentChrono.isRunning) {
            freezeButton.text('PAUSE');
        } else {
            freezeButton.text('RESUME');
        }
    });

    // Init interval display
    const chronoDisplayInterval = setInterval(() => {
        displayChrono(firstChrono);
        displayChrono(middleChrono);
        displayChrono(lastChrono);
    }, 1000);

    // Init team inputs
    const teamInput = $('.team-input');
    teamInput.change((event) => {
        const teamInput = $(event.target);
        const storageKey = getStorageKey(teamInput);
        localStorage.setItem(storageKey, teamInput.val());
    });
    teamInput.each((index) => {
        const teamInput = $($('.team-input')[index]);
        const storageKey = getStorageKey(teamInput);
        const storageValue = localStorage.getItem(storageKey);
        if (storageValue) {
            teamInput.val(storageValue);
        }
    });

    // Handle chrono value update
    $('.chrono-value').change((event) => {
        const changedChrono = $(event.target);
        const newValue = changedChrono.val();
        const foundValue = newValue.match(/\d{2}:\d{2}/);
        if (foundValue && foundValue[0]) {
            const splitValue = foundValue[0].split(':');
            const chrono = allChronos[changedChrono.attr('id')];
            if (chrono) {
                chrono.value = (+splitValue[0] * 60) + (+splitValue[1]);
            }
        }
    });

    // Set up team default colors
    firstChrono.color = COLORS.BLUE_IMG;
    const firstTeamColumn = $('.first-team');
    updateTeamColumnColor(firstTeamColumn, firstChrono.color);
    middleChrono.color = COLORS.RED_IMG;
    const middleTeamColumn = $('.middle-team');
    updateTeamColumnColor(middleTeamColumn, middleChrono.color);
    lastChrono.color = COLORS.YELLOW_IMG;
    const lastTeamColumn = $('.last-team');
    updateTeamColumnColor(lastTeamColumn, lastChrono.color);

    // Color picker pane elements
    const colorPickerPane = $('#color-picker-pane');
    const colorDivsContainer = colorPickerPane.find('.color-divs-container');

    // open color picker pane
    const colorPickerButtons = $('.color-picker-button');
    colorPickerButtons.on('click', (event) => {
        colorDivsContainer.css('top', event.originalEvent.clientY);
        colorDivsContainer.css('left', event.originalEvent.clientX);

        const picker = $(event.currentTarget);
        const team = picker.attr('team');
        const chrono = allChronos[team];

        // Refresh color pane with current color
        buildColorPickerPane(colorPickerPane, colorDivsContainer, chrono.color);

        colorPickerPane.data('chrono', chrono);
        colorPickerPane.show();
    });

    // close color picker
    colorPickerPane.on('click', () => {
        colorPickerPane.hide();
    });
});