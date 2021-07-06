"use strict";

window.addEventListener('DOMContentLoaded', () => {

    //Tabs
    
const tabs = document.querySelectorAll(".tabheader__item");
const tabsContent = document.querySelectorAll(".tabcontent");
const tabsParent = document.querySelector(".tabheader__items");

function hideTabContent() {
    tabsContent.forEach((item) => {
        item.classList.add("hide");
        item.classList.remove("show", "fade");
    });
    
    tabs.forEach((item) => {
        item.classList.remove("tabheader__item_active");
    });
}

function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add("tabheader__item_active");
}

hideTabContent();
showTabContent();

tabsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
        tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);  
                }
        });
    }
});

//Timer
const deadline = '2021-07-11';

function getTimeRemaining (endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()), // կստանանք միլիվայրկյանների տարբերությունը
    days = Math.floor(t / (1000 * 60 * 60 * 24)),
    hours = Math.floor((t / (1000 * 60 * 60) % 24)),
    minutes = Math.floor((t / (1000 * 60) % 60)),
    seconds = Math.floor((t / 1000) % 60);

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function getZero (num) {
    if (num >= 0 && num <= 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

function setClock (selector, endtime){
    const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);

updateClock();

    function updateClock () {
        const t = getTimeRemaining(endtime);
        days.innerHTML = getZero(t.days),
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }
}

setClock('.timer', deadline);

// Modal 
    const modalTrigger = document.querySelectorAll('[data-modal]'),
            modal = document.querySelector('.modal'),
            modalCloseBtn = modal.querySelector('[data-close]');

    
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId);
    }
    
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    
    
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = "";
    }

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if(e.target == modal) {
        closeModal();
            }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // const modalTimerId = setTimeout(openModal, 3000);

    function showModalByScroll (){
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    } 
    window.addEventListener('scroll', showModalByScroll);

    //Menu, classes for menu cards

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.parent = document.querySelector(parentSelector);
            this.price = price;
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
        }
        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        render() {
            const element = document.createElement('div');
            if(this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach( i => element.classList.add(i));
            }
            element.innerHTML = `      
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`;
            this.parent.append(element);
        }
    }
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
        9,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
        10,
        ".menu .container"

    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
        12,
        ".menu .container"
    ).render();
});


// Constructors

// function User(name, id) {
//     this.name = name;
//     this.id = id;
//     this.human = true;
//     this.hello = function () {
//         console.log(`Hello ${this.name}`);
//     }
// }

// const ivan = new User('Ivan', 24);
// const alex = new User('Alex', 26); // ստացանք նոր օբյեկտ նշված հատկանիշներով
// console.log(ivan); // User { name: 'Ivan', id: 24, human: true, hello: [Function (anonymous)] }
// ivan.hello();

// User.prototype.exit = function() {
//     console.log(`User ${this.name} left`); // ստեղծումա նոր մեթոդ ընդհանուր User-ում
// }

// ivan.exit();

// սովորական ֆունկցիայի դեպքում this == window, use strict-ի դեպքում undefined
// օբյեկտի մեթոդի կոնտեքսը հենց օբյեկտն է։ Եթե օբյեկտի մեթոդի մեջ ֆունկցիա ենք կանչում, ապա այդ ֆունկցիայի this-ը կլինի undefined, իսկ մեթոդի դեպքում օբյեկտը
// constructor-ում և class-երում նշված this-ը նոր օբյեկտի օրինակն է
// ձեռքով կպցնում ենք this-ը call, apply, bind-ի միջոցով

// function showThis (a, b){
// function sum() {
//     return this.a + this.b; // undefined, պետք է գրել առանց this-ի, որ ծնողից վերցնի և ցույց տա 9
// }
// }

// showThis(4, 5);

// const obj = {
//     a: 20,
//     b: 30,
//     sum: function() {
//         console.log(this);
//     }
// };

// obj.sum(); //{ a: 20, b: 30, sum: [Function: sum] }

// function sayName () {
//     console.log(this);
//     console.log(this.name);
// }

// const user = {
//     name: 'John'
// }
// sayName.call(user);
// sayName.apply(user); // { name: 'John' } John


// function sayName (surname) {
//     console.log(this);
//     console.log(this.name + surname);
// }
// const user = {
//     name: 'John'
// }
// sayName.call(user, "Smith");
// sayName.apply(user, ['Smith']); // { name: 'John' } JohnSmith

// function count(num) {
//     return this *num;
// }

// const double = count.bind(2); // գրեցինք դաբլ ֆունկցիան, որը ստացավ 2, որը count-ի this-ն է
// console.log(double(3)); // 6

// btn.addEventListener('click', function () {
//     console.log(this); // կբերի button-ը սովորական նշված ֆունկցիայի դեպքում, այստեղ this-ը նույննա, ինչ event.target-ը
// });
// btn.addEventListener('click', () => {
//     console.log(this); // կբերի undefined, որովհետև aroow function-ը չունի իր կոնտեքստի կանչը
// });

// const obj = {
//     num: 5,
//     sayNumber: function () {
//         const say = () => {
//             console.log(this);
//         };
//         say();
//     }
// };

// obj.sayNumber(); //{ num: 5, sayNumber: [Function: sayNumber] } arrow function-ները չունեն իրենց կոնտեքստի կանչը, վերցնում է իր ծնողի կոնտեքստը

// const double = a => a * 2;
// console.log(double(4)); //8

// Class
// class Rectangle {
//     constructor (height, width){
//         this.height = height;
//         this.width = width;
//     }
//     calcArea() { // method
//         return this.height * this.width;
//     }
// }

// class ColoredRectangleWithText extends Rectangle{
//     constructor(height, width, text, bgColor) {
//         super(height, width);
//         this.text = text;
//         this.bgColor = bgColor;

// }
// showMyProps() {
//     console.log(`Text: ${this.text}, color: ${this.bgColor}`);
// }
// }

// const div = new ColoredRectangleWithText(10, 20, "Hello", "red");
// div.showMyProps(); // Text: Hello, color: red
// console.log(div.calcArea()); //200

// const square = new Rectangle(5, 4);
// console.log(square.calcArea()); // 20

