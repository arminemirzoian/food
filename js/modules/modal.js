function modal() {

// Modal

const modalTrigger = document.querySelectorAll('[data-modal]'),
modal = document.querySelector('.modal');

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

modal.addEventListener('click', (e) => {
    if(e.target == modal || e.target.getAttribute('data-close') == "") {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modal.classList.contains('show')) {
    closeModal();
}
});

const modalTimerId = setTimeout(openModal, 300000);

function showModalByScroll (){
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal();
    window.removeEventListener('scroll', showModalByScroll);
}
}
window.addEventListener('scroll', showModalByScroll);

//Modal window

function showThanksModal(message) {
const prevModalDialog = document.querySelector('.modal__dialog');

prevModalDialog.classList.add('hide');
openModal();

const thanksModal = document.createElement('div');

thanksModal.classList.add('modal__dialog');
thanksModal.innerHTML = `<div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
</div> `;

document.querySelector('.modal').append(thanksModal);

setTimeout(() => {
    thanksModal.remove();
    prevModalDialog.classList.add('show');
    prevModalDialog.classList.remove('hide');
    closeModal();
    }, 4000);
}
// API

// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: "POST",
//     body: JSON.stringify({name: 'Alex'}),
//     headers: {
//         'Content-type': 'application/json'
//     }
// }).then(response => response.json()).then(json => console.log(json));

fetch("http://localhost:3000/menu")
.then(data => data.json())
.then(res => console.log(res));

}

module.exports = modal;