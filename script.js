/*const navBtn = document.getElementById('nav-btn');
const cancelBtn = document.getElementById('cancel-btn');
const sideNav = document.getElementById('sidenav');
const modal = document.getElementById('modal');

navBtn.addEventListener("click", function(){
    sideNav.classList.add('show');
    modal.classList.add('showModal');
});

cancelBtn.addEventListener('click', function(){
    sideNav.classList.remove('show');
    modal.classList.remove('showModal');
});

window.addEventListener('click', function(event){
    if(event.target === modal){
        sideNav.classList.remove('show');
        modal.classList.remove('showModal');
    }
});

<script>
  document.addEventListener("DOMContentLoaded", function () {
    const navBtn = document.getElementById("nav-btn");
    const cancelBtn = document.getElementById("cancel-btn");
    const sideNav = document.getElementById("sidenav") || document.querySelector(".sidenav");

    function closeNavigation() {
      if (!sideNav) return;

      sideNav.classList.remove("show");
      document.body.classList.remove("nav-open");

      if (navBtn) {
        navBtn.setAttribute("aria-expanded", "false");
      }

      const modal = document.querySelector(".showModal");
      if (modal) {
        modal.classList.remove("showModal");
      }
    }

    function openNavigation() {
      if (!sideNav) return;

      sideNav.classList.add("show");
      document.body.classList.add("nav-open");

      if (navBtn) {
        navBtn.setAttribute("aria-expanded", "true");
      }
    }

    if (navBtn) {
      navBtn.addEventListener("click", openNavigation);
    }

    if (cancelBtn) {
      cancelBtn.addEventListener("click", closeNavigation);
    }

    if (sideNav) {
      sideNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeNavigation);
      });
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeNavigation();
      }
    });
  });
</script>*/

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const whatsappPhoneNumber = "255625888777";
  const bookingEmailAddress = "hedarupalace@gmail.com";
  const mobilePhoneQuery = window.matchMedia("(max-width: 600px)");

  const navBtn = document.getElementById("nav-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  const sidenav = document.getElementById("sidenav");
  const modal = document.getElementById("modal");
  const navLinks = document.querySelectorAll(".navbar a");

  const heroBookingBtn = document.getElementById("hero-booking-btn");
  const bookingForm = document.getElementById("booking-form");
  const bookingSection = document.getElementById("booking");
  const bookingNote = document.getElementById("booking-note");
  const bookingSubmitBtn = document.querySelector(".booking-submit-btn");

  const roomChoice = document.getElementById("room-choice");
  const checkinDate = document.getElementById("checkin-date");
  const checkoutDate = document.getElementById("checkout-date");
  const adults = document.getElementById("adult");
  const children = document.getElementById("children");
  const roomsCount = document.getElementById("rooms-count");

  const roomBookButtons = document.querySelectorAll(".room-book-btn");
  const directBookingButtons = document.querySelectorAll(".direct-booking-btn");

  const serviceRestaurantBookingBtn = document.getElementById("service-restaurant-booking-btn");
  const serviceConferenceBookingBtn = document.getElementById("service-conference-booking-btn");
  const serviceVenueBookingBtn = document.getElementById("service-venue-booking-btn");

  const today = new Date().toISOString().split("T")[0];

  if (checkinDate) {
    checkinDate.min = today;
  }

  if (checkoutDate) {
    checkoutDate.min = today;
  }

  const isMobilePhoneView = () => mobilePhoneQuery.matches;

  const updateBookingButtonText = () => {
    if (!bookingSubmitBtn) return;

    bookingSubmitBtn.textContent = isMobilePhoneView()
      ? "Send WhatsApp Request"
      : "Send Email Request";
  };

  const openNavigation = () => {
    if (!sidenav || !modal) return;

    sidenav.classList.add("show");
    modal.classList.add("showModal");
    document.body.classList.add("nav-open");

    if (navBtn) {
      navBtn.setAttribute("aria-expanded", "true");
    }
  };

  const closeNavigation = () => {
    if (!sidenav || !modal) return;

    sidenav.classList.remove("show");
    modal.classList.remove("showModal");
    document.body.classList.remove("nav-open");

    if (navBtn) {
      navBtn.setAttribute("aria-expanded", "false");
    }
  };

  const scrollToBooking = () => {
    if (!bookingSection) return;

    bookingSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  const showBookingMessage = (message, isError = false) => {
    if (!bookingNote) return;

    bookingNote.textContent = message;
    bookingNote.style.color = isError ? "#fecaca" : "";
  };

  const isValidWholeNumber = (value, min, max) => {
    const number = Number(value);
    return Number.isInteger(number) && number >= min && number <= max;
  };

  const openPreparedRequest = (subject, message) => {
    if (isMobilePhoneView()) {
      const whatsappUrl = `https://wa.me/${whatsappPhoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      return;
    }

    const emailUrl = `mailto:${bookingEmailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = emailUrl;
  };

  const buildRoomBookingMessage = () => {
    const selectedRoom = roomChoice.value.trim();
    const checkin = checkinDate.value;
    const checkout = checkoutDate.value;
    const adultCount = adults.value;
    const childrenCount = children.value;
    const roomCount = roomsCount.value;

    return [
      "Hello Hedaru Palace Hotel,",
      "",
      "I would like to request a room booking.",
      "",
      `Room choice: ${selectedRoom}`,
      `Check-in date: ${checkin}`,
      `Check-out date: ${checkout}`,
      `Adults: ${adultCount}`,
      `Children: ${childrenCount}`,
      `Number of rooms: ${roomCount}`,
      "",
      "Full name:",
      "Phone number:",
      "Email address:",
      "Special request:",
      "",
      "Please confirm availability and total price. Thank you."
    ].join("\n");
  };

  const getDirectBookingTemplate = (bookingType) => {
    const templates = {
      restaurant: {
        subject: "Restaurant Table Booking Request - Hedaru Palace Hotel",
        message: [
          "Hello Hedaru Palace Hotel,",
          "",
          "I would like to request a restaurant table booking.",
          "",
          "Booking type: Restaurant table booking",
          "Full name:",
          "Preferred date:",
          "Preferred time:",
          "Number of guests:",
          "Contact details:",
          "Special requests:",
          "",
          "Please confirm availability. Thank you."
        ].join("\n")
      },

      conference: {
        subject: "Conference Room Booking Request - Hedaru Palace Hotel",
        message: [
          "Hello Hedaru Palace Hotel,",
          "",
          "I would like to request a conference room booking.",
          "",
          "Booking type: Conference room booking",
          "Full name:",
          "Company / organisation name:",
          "Preferred date:",
          "Preferred start time:",
          "Preferred end time:",
          "Number of guests:",
          "Equipment needed:",
          "Catering required: Yes / No",
          "Contact details:",
          "Special requests:",
          "",
          "Please confirm availability and total price. Thank you."
        ].join("\n")
      },

      venue: {
        subject: "Venue / Wedding Event Booking Request - Hedaru Palace Hotel",
        message: [
          "Hello Hedaru Palace Hotel,",
          "",
          "I would like to request a venue/event booking.",
          "",
          "Booking type: Wedding / private event venue booking",
          "Full name:",
          "Event type:",
          "Preferred event date:",
          "Preferred start time:",
          "Preferred end time:",
          "Estimated number of guests:",
          "Catering required: Yes / No",
          "Accommodation required: Yes / No",
          "Contact details:",
          "Special requests:",
          "",
          "Please confirm availability and available packages. Thank you."
        ].join("\n")
      }
    };

    return templates[bookingType] || null;
  };

  const validateBookingForm = () => {
    if (!roomChoice.value.trim()) {
      showBookingMessage("Please select a room choice before sending your booking request.", true);
      roomChoice.focus();
      return false;
    }

    if (!checkinDate.value) {
      showBookingMessage("Please select your check-in date.", true);
      checkinDate.focus();
      return false;
    }

    if (!checkoutDate.value) {
      showBookingMessage("Please select your check-out date.", true);
      checkoutDate.focus();
      return false;
    }

    if (checkoutDate.value <= checkinDate.value) {
      showBookingMessage("Check-out date must be after the check-in date.", true);
      checkoutDate.focus();
      return false;
    }

    if (!isValidWholeNumber(adults.value, 1, 20)) {
      showBookingMessage("Please enter a valid number of adults between 1 and 20.", true);
      adults.focus();
      return false;
    }

    if (!isValidWholeNumber(children.value, 0, 20)) {
      showBookingMessage("Please enter a valid number of children between 0 and 20.", true);
      children.focus();
      return false;
    }

    if (!isValidWholeNumber(roomsCount.value, 1, 10)) {
      showBookingMessage("Please enter a valid number of rooms between 1 and 10.", true);
      roomsCount.focus();
      return false;
    }

    return true;
  };

  const sendRoomBookingRequest = () => {
    const message = buildRoomBookingMessage();
    const subject = "Room Booking Request - Hedaru Palace Hotel";

    openPreparedRequest(subject, message);

    showBookingMessage(
      isMobilePhoneView()
        ? "Your WhatsApp room booking request is ready. Please review and send it on WhatsApp."
        : "Your email room booking request is ready. Please review and send it from your email app."
    );
  };

  const sendDirectBookingRequest = (bookingType) => {
    const template = getDirectBookingTemplate(bookingType);

    if (!template) return;

    openPreparedRequest(template.subject, template.message);
  };

  if (navBtn) {
    navBtn.setAttribute("aria-expanded", "false");
    navBtn.addEventListener("click", openNavigation);
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", closeNavigation);
  }

  if (modal) {
    modal.addEventListener("click", closeNavigation);
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  if (heroBookingBtn) {
    heroBookingBtn.addEventListener("click", scrollToBooking);
  }

  if (checkinDate && checkoutDate) {
    checkinDate.addEventListener("change", () => {
      checkoutDate.min = checkinDate.value || today;

      if (checkoutDate.value && checkoutDate.value <= checkinDate.value) {
        checkoutDate.value = "";
      }
    });
  }

  roomBookButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedRoom = button.dataset.room;

      if (roomChoice && selectedRoom) {
        roomChoice.value = selectedRoom;
      }

      scrollToBooking();

      showBookingMessage(
        "Room selected. Complete your dates and guest details, then send your booking request."
      );
    });
  });

  directBookingButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const bookingType = button.dataset.bookingType;
      sendDirectBookingRequest(bookingType);
    });
  });

  if (serviceRestaurantBookingBtn) {
    serviceRestaurantBookingBtn.addEventListener("click", () => {
      sendDirectBookingRequest("restaurant");
    });
  }

  if (serviceConferenceBookingBtn) {
    serviceConferenceBookingBtn.addEventListener("click", () => {
      sendDirectBookingRequest("conference");
    });
  }

  if (serviceVenueBookingBtn) {
    serviceVenueBookingBtn.addEventListener("click", () => {
      sendDirectBookingRequest("venue");
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!validateBookingForm()) {
        return;
      }

      sendRoomBookingRequest();
    });
  }

  updateBookingButtonText();

  if (typeof mobilePhoneQuery.addEventListener === "function") {
    mobilePhoneQuery.addEventListener("change", updateBookingButtonText);
  }
});
