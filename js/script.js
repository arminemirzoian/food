import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import forms from './modules/forms';
import cards from './modules/cards';
import slider from './modules/slider';
import calc from './modules/calc';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', function() {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 300000);

    tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
    timer('.timer', '2021-08-08');
    modal('[data-modal]', '.modal', modalTimerId);
    forms('form', modalTimerId);
    cards();
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter:'#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    calc();

});

