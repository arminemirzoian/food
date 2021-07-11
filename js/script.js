
window.addEventListener('DOMContentLoaded', function() {

const tabs = require('./modules/tabs'),
    timer = require('./modules/timer'),
    modal = require('./modules/modal'),
    forms = require('./modules/forms'),
    cards = require('./modules/cards'),
    slider = require('./modules/slider'),
    calc = require('./modules/calc');

    tabs();
    timer();
    modal();
    forms();
    cards();
    slider();
    calc();

});

