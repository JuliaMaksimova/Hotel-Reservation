// Reservation object to store form data
let reservation = {
    startDate: null,
    endDate: null,
    guestsCount: 0,
    roomType: null,
    name: null,
    phone: null,
    email: null
};

// Function to show one form and hide all others
function changeContent(className) {
    document.querySelectorAll('.custom-form').forEach(div => div.classList.add('hidden'));
    const target = document.querySelector(`.${className}`);
    if (target) {
        target.classList.remove('hidden');
    }
}

// Initialize: show search form
changeContent('search-form-content');

// Handle Search Form submission
const searchButton = document.querySelector('#search-form-button');
if (searchButton) {
    searchButton.addEventListener('click', function(e) {
        e.preventDefault();

        const form = e.target.closest('form');
        if (!form) return;

        const checkIn = form.querySelector('#check-in').value;
        const checkOut = form.querySelector('#check-out').value;
        const people = form.querySelector('#people').value;

        if (checkIn && checkOut && people && new Date(checkIn) <= new Date(checkOut)) {
            reservation.startDate = checkIn;
            reservation.endDate = checkOut;
            reservation.guestsCount = parseInt(people, 10);

            console.log('Reservation Data:', reservation);

            // Show thank-you form
            changeContent('thank-you-content');
        } else {
            alert('Please fill all fields correctly and ensure check-in is before check-out.');
        }
    });
}

// Handle New Reservation button
const newReservationButton = document.querySelector('#new-reservation');
if (newReservationButton) {
    newReservationButton.addEventListener('click', function(e) {
        e.preventDefault();

        // Reset reservation data
        reservation.startDate = null;
        reservation.endDate = null;
        reservation.guestsCount = 0;
        reservation.roomType = null;
        reservation.name = null;
        reservation.phone = null;
        reservation.email = null;

        // Show search form again
        changeContent('search-form-content');
    });
}
