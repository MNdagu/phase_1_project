# phase_1_project(Calendar app with event adder and reminder)
This project involves making a calendar app that is interactive and allows a user to add events to specific dates of their choice.
Some of the features implemented in this project are as follows:
1. A user is able to view the calendar dates of a specific month.
2. The current year,month and date are displayed and styled for the user to see.
3. The user is able to visit previous and upcoming months by using clicking the previous and next icons.
4. The user is also able to add events and event descriptions to a specific dates of their choice.
5. A countdown is also implemented to give a user a reminder as to how much time is left before a set event is reached.
6. Local storage is also implemented to make the events persistent.
   
<p>First we select the elements from the DOM to enable us to manipulate data
The date,month and year variables are then initialized using the Date constructor
Events variable from local storage is also initialized</p>
<p>We then create a function to generate the calendar. In it we get the first day of the current month,he last day of the month,the day of the last date of the month and the last date of the previous month.</p>
<p>Loops for generating the previous month's dates,the current months dates and the next months dates are then created,making sure to add the 'li' tag with the required classes to the cal variable. This variable is then added to the innerHTML of the calendar elements.</p>
<p>Functionality for the previous and net icons are then put in lace for the user to navigate to other months.
</p>
<p>Event listeners for double clicking on a date to add an event on the pop up modal and for closing the modal using the close button are then included in our code. An event listener is also added to a date when a user clicks on it where the event,event description and the reminder are displayed(if any)</p>
<p>A function to start the countdown is also implemented that takes one parameter, reminderTime, which is expected to be a date string representing the time of the reminder. let countdown = Number(new Date(reminderTime).getTime()); converts the reminderTime parameter to a Date object and then gets the time in milliseconds. The countdownInterval = setInterval(function () {}, 1000); Sets up an interval timer that executes the provided function every second (1000 milliseconds). The interval ID is stored in the countdownInterval variable, allowing it to be cleared later. Let distance = countdown - now; Calculates the difference between the countdown time and the current time. This value represents the remaining time until the reminder.</p>
<p>The remaining time is converted to days, hours, minutes, and seconds.The countdown display is updated with the formatted string. the countdown reaches 0, the interval timer is cleared, the display is updated to "EXPIRED", and an alert is shown.</p>
<p>An event listener to handle form submission is then implemented so that the app is able to get data from the user using the modal pop up.Finally the event details are saved to the events object and local storage</p>

