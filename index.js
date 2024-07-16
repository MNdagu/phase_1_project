const current_date = document.querySelector('.current-date');
const previous = document.getElementById('prev');
const next = document.getElementById('next');
const prenexIcons = document.querySelectorAll('.navigation span');
const day = document.querySelector('.dates');
const event_date = document.getElementById('event-date');
const event_description = document.getElementById('event-description');
const event_reminder = document.getElementById('event-reminder');
const event_input = document.getElementById('event-input')
const form = document.getElementById('form')

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let events = [];


const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'september', 'October', 'November', 'December'];

function generateCalendar() {
    let firstDayOfMonth = new Date(year, month, 1).getDay();

    let lastDateOfMonth = new Date(year, month + 1, 0).getDate();

    let dayOfLastDate = new Date(year, month, lastDateOfMonth).getDay();

    let previousMonthLastDate = new Date(year, month, 0).getDate();

    let lit = ''
    for (let i = firstDayOfMonth; i > 0; i--) {
        lit +=
            `<li class ='inactive'>${previousMonthLastDate - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
        let isToday = i === date.getDate() && month == new Date().getMonth() && year == new Date().getFullYear()
            ? 'active'
            : '';

        lit += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = dayOfLastDate; i < 6; i++) {
        lit += `<li class='inactive'>${i - dayOfLastDate + 1}</li>`
    }

    current_date.textContent = `${months[month]} ${year}`;
    day.innerHTML = lit

}
generateCalendar();


prenexIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        month = icon.id === 'prev' ? month - 1 : month + 1;

        if (month < 0 || month > 11) {
            date = new Date(year, month, new Date().getDate());

            year = date.getFullYear();
            month = date.getMonth();
        } else {
            date = new Date();
        }

        generateCalendar();
    })
})



day.addEventListener('dblclick', () => {
    document.querySelector('.modal').style.display = 'flex'

})


document.getElementById('close').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'none'
})


day.addEventListener('click', (e) => {
    let date = e.target

    event_date.textContent = `${months[month]} ${date.textContent},  ${year} `
    event_description.textContent = 'no event'
    event_reminder.textContent = 'no reminder set'


})

form.addEventListener('submit', (e) => {

    let newEvent = event_input.value;
    if (newEvent) {
        event_description.textContent = newEvent;
        event_reminder.textContent = 'reminder'
        events.push(newEvent)

    }
    e.preventDefault();
    form.reset();
    document.querySelector('.modal').style.display = 'none'

})