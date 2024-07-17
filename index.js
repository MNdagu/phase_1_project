document.addEventListener('DOMContentLoaded', () => {



const current_date = document.querySelector('.current-date');
const prenexIcons = document.querySelectorAll('.navigation span');
const day = document.querySelector('.dates');
const event_date = document.getElementById('event-date');
const event_description = document.getElementById('event-description');
const event_name = document.getElementById('event-name')
const event_reminder = document.getElementById('event-reminder');
const event_input = document.getElementById('event-input')
const event_description_input = document.getElementById('event-description-input')
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
    event_name.textContent = 'no event'
    event_description.textContent = 'no event description'
    event_reminder.textContent = 'no reminder set'


})

// let countdown_month = document.getElementById('countdown-month').value;
form.addEventListener('submit', (e) => {
    let countdown_date = Number(document.getElementById('countdown-date').value);
    let countdown = Number(new Date(`${month + 1} ${countdown_date} ${year}`).getTime());
let x = setInterval(function () {
    let now = new Date().getTime();
    let distance = countdown - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    let displayCountdown = `${days}d ${hours}h ${minutes}m ${seconds}s`
    
    if (countdown_date){
        event_reminder.textContent = displayCountdown;
    }else{
        event_reminder.textContent = 'no set reminder'
    }

    if (distance < 0){
        clearInterval(x);
        event_reminder.textContent = 'EXPIRED'

    }
},1000)

    let newEvent = event_input.value;
    let newDescription = event_description_input.value;
    if (newEvent) {
        event_description.textContent = newDescription;
        event_name.textContent = newEvent;
       // event_reminder.textContent = displayCountdown;
        events.push(newEvent);
        console.log(events)

    }
    e.preventDefault();
    form.reset();
    document.querySelector('.modal').style.display = 'none'


})
})


