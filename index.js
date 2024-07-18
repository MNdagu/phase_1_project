document.addEventListener('DOMContentLoaded', () => {
    // Select elements from the DOM
    const current_date = document.querySelector('.current-date');
    const prenexIcons = document.querySelectorAll('.navigation span');
    const day = document.querySelector('.dates');
    const event_date = document.getElementById('event-date');
    const event_description = document.getElementById('event-description');
    const event_name = document.getElementById('event-name');
    const event_reminder = document.getElementById('event-reminder');
    const event_input = document.getElementById('event-input');
    const event_description_input = document.getElementById('event-description-input');
    const form = document.getElementById('form');

    // Initialize date variables
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();

    // Initialize events object
    let events = {};

    // Array of month names
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Variable to keep track of the countdown interval
    let countdownInterval;

    // Function to generate the calendar
    function generateCalendar() {
        // Get the first day of the current month
        let firstDayOfMonth = new Date(year, month, 1).getDay();
        // Get the last day of the month
        let lastDateOfMonth = new Date(year, month + 1, 0).getDate();
        //Get the day of the last date of the month
        let dayOfLastDate = new Date(year, month, lastDateOfMonth).getDay();
        //Get the last date of the previous month
        let previousMonthLastDate = new Date(year, month, 0).getDate();

        //Variable to store the generated calendar
        let cal = '';

        // Loop to generate the previous month's dates
        for (let i = firstDayOfMonth; i > 0; i--) {
            cal += `<li class='inactive'>${previousMonthLastDate - i + 1}</li>`;
        }

        // Loop to generate the current month's dates
        for (let i = 1; i <= lastDateOfMonth; i++) {
            let isToday = i === date.getDate() && month == new Date().getMonth() && year == new Date().getFullYear() ? 'active' : '';
            let eventKey = `${year}-${month + 1}-${i}`;
            let hasEvent = events[eventKey] ? 'has-event' : '';

            cal += `<li class="${isToday} ${hasEvent}" data-date="${i}">${i}</li>`;
        }

        // Generate the next month's dates
        for (let i = dayOfLastDate; i < 6; i++) {
            cal += `<li class='inactive'>${i - dayOfLastDate + 1}</li>`;
        }

        // Update the calendar header and days
        current_date.textContent = `${months[month]} ${year}`;
        day.innerHTML = cal;
    }

    // Generate the initial calendar
    generateCalendar();

    // Add event listeners for navigation buttons
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
        });
    });

    // Open the modal on double-clicking a date
    day.addEventListener('dblclick', () => {
        document.querySelector('.modal').style.display = 'flex';
    });

    // Close the modal when the close button is clicked
    document.getElementById('close').addEventListener('click', () => {
        document.querySelector('.modal').style.display = 'none';
    });

    // Show event details when a date is clicked
    day.addEventListener('click', (e) => {
        let targetDate = e.target.getAttribute('data-date');
        if (!targetDate) return; //prevents further code execution if the click was on an element that is not a calendar day.


        let eventKey = `${year}-${month + 1}-${targetDate}`;
        let event = events[eventKey];//Retrieves the event object from the events array using the constructed eventKey

        // Clear any existing countdown interval. Ensures that only one countdown is running at any given time
        clearInterval(countdownInterval);

        event_date.textContent = `${months[month]} ${targetDate}, ${year}`;
        event_name.textContent = event ? event.name : 'no event';
        event_description.textContent = event ? event.description : 'no event description';

        if (event && event.reminder) {
            startCountdown(event.reminder);
        } else {
            event_reminder.textContent = 'no reminder set';
        }
    });

    // Function to start the countdown
    function startCountdown(reminderTime) {
        let countdown = Number(new Date(reminderTime).getTime());//Converts the reminderTime parameter to a Date object

        countdownInterval = setInterval(function () {//This function runs every second and updates the countdown display
            let now = new Date().getTime();
            let distance = countdown - now;

            let days = Math.floor(distance / (1000 * 60 * 60 * 24));//converts the time difference from milliseconds to days
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            let displayCountdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;

            if (distance > 0) {
                event_reminder.textContent = displayCountdown;
            } else {
                clearInterval(countdownInterval);
                event_reminder.textContent = 'EXPIRED';
                alert(`The event : ${event_name.textContent} has expired`);
            }
        }, 1000);
    }

    // Handle form submission to add a new event
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let targetDate = event_date.textContent.split(',')[0].split(' ')[1];
        let countdown_date = Number(targetDate);
        let countdownTime = new Date(`${months[month]} ${countdown_date}, ${year}`).toISOString();

        // Get the target date from the modal
        let eventKey = `${year}-${month + 1}-${targetDate}`;
        let newEvent = event_input.value;
        let newDescription = event_description_input.value;

        // Save the event details to the events object and local storage
        if (newEvent) {
            events[eventKey] = {
                name: newEvent,
                description: newDescription,
                reminder: countdownTime
            };

            event_description.textContent = newDescription;
            event_name.textContent = newEvent;
            generateCalendar();
        }

        // Update db.json via fetch
        fetch('http://localhost:3000/events', {
            method: 'POST', // Initiate a post request
            headers: {
                'Content-Type': 'application/json' //Specifies that the content of the request body is in json format
            },
            body: JSON.stringify({ id: eventKey, name: newEvent, description: newDescription, reminder: countdownTime })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Event added to JSON server:', data);
        })
        .catch(error => {
            console.error('Error adding event to JSON server:', error);
        });

        // Reset the form and close the modal
        form.reset();
        document.querySelector('.modal').style.display = 'none';
    });

    // Load events from JSON server on page load
    fetch('http://localhost:3000/events')
        .then(response => response.json())
        .then(data => {
            data.forEach(event => {
                events[event.id] = {//Populate events object according to the id
                    name: event.name,
                    description: event.description,
                    reminder: event.reminder
                };
            });
            generateCalendar();
        })
        .catch(error => {
            console.error('Error loading events from JSON server:', error);
        });
});
