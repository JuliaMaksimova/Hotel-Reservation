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

/* ---------------- Search Form ---------------- */
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

            // Show search result / offers form
            changeContent('search-result-form-content');
        } else {
            alert('Please fill all fields correctly and ensure check-in is before check-out.');
        }
    });
}

/* ---------------- Offers Form ---------------- */
// Back button: return to search form and pre-fill values
const backButton = document.querySelector('#search-back-btn');
if (backButton) {
    backButton.addEventListener('click', function(e) {
        e.preventDefault();
        changeContent('search-form-content');
        document.querySelector('#check-in').value = reservation.startDate || '';
        document.querySelector('#check-out').value = reservation.endDate || '';
        document.querySelector('#people').value = reservation.guestsCount || '';
    });
}

// Select room type
document.querySelectorAll('.room-type').forEach(room => {
    room.addEventListener('click', function(e) {
        e.preventDefault();
        let selectedRoom = e.target.closest('.room-type');
        if (!selectedRoom) return;

        document.querySelectorAll('.room-type').forEach(r => r.classList.remove('selected-room'));
        selectedRoom.classList.add('selected-room');
    });
});

// Next button: select room and go to next form
const nextButton = document.querySelector('#search-next-btn');
if (nextButton) {
    nextButton.addEventListener('click', function(e) {
        e.preventDefault();
        const selectedRoomEl = document.querySelector('.selected-room h4');
        if (!selectedRoomEl) {
            alert('Please select a room.');
            return;
        }
        reservation.roomType = selectedRoomEl.textContent;
        console.log('Reservation after room selection:', reservation);

        // Show guest-details form (or thank-you if guest-details not implemented)
        changeContent('thank-you-content');
    });
}

/* ---------------- Thank You Form ---------------- */
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
