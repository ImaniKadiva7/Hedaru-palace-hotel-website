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

/* =====================================================
   HEDARU PALACE HOTEL - NAVIGATION SCRIPT
   Professional responsive navigation control
   ===================================================== */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const navButton = document.getElementById("nav-btn");
    const closeButton = document.getElementById("cancel-btn");
    const sideNav = document.getElementById("sidenav") || document.querySelector(".sidenav");
    const navLinks = sideNav ? sideNav.querySelectorAll("a") : [];

    let overlay = document.getElementById("modal") || document.querySelector(".nav-overlay");

    if (!navButton || !sideNav) {
      return;
    }

    /*
      Create an overlay automatically if your HTML does not already have one.
      This avoids relying on unsafe HTML injection and keeps the menu reliable.
    */
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "nav-overlay";
      overlay.setAttribute("aria-hidden", "true");
      document.body.appendChild(overlay);
    }

    /*
      Accessibility setup.
      This keeps the menu understandable for screen readers.
    */
    if (!sideNav.id) {
      sideNav.id = "sidenav";
    }

    navButton.setAttribute("aria-controls", sideNav.id);
    navButton.setAttribute("aria-expanded", "false");

    if (!navButton.getAttribute("aria-label")) {
      navButton.setAttribute("aria-label", "Open navigation menu");
    }

    if (closeButton && !closeButton.getAttribute("aria-label")) {
      closeButton.setAttribute("aria-label", "Close navigation menu");
    }

    sideNav.setAttribute("aria-hidden", "true");

    /*
      Focusable elements inside the side navigation.
      Used to return focus cleanly after closing.
    */
    const getFocusableElements = function () {
      return sideNav.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
    };

    function openNavigation() {
      sideNav.classList.add("show");
      overlay.classList.add("showModal");
      document.body.classList.add("nav-open");

      navButton.setAttribute("aria-expanded", "true");
      navButton.setAttribute("aria-label", "Close navigation menu");
      sideNav.setAttribute("aria-hidden", "false");
      overlay.setAttribute("aria-hidden", "false");

      const firstFocusable = getFocusableElements()[0];

      if (firstFocusable) {
        setTimeout(function () {
          firstFocusable.focus();
        }, 120);
      }
    }

    function closeNavigation() {
      sideNav.classList.remove("show");
      overlay.classList.remove("showModal");
      document.body.classList.remove("nav-open");

      navButton.setAttribute("aria-expanded", "false");
      navButton.setAttribute("aria-label", "Open navigation menu");
      sideNav.setAttribute("aria-hidden", "true");
      overlay.setAttribute("aria-hidden", "true");

      navButton.focus();
    }

    function toggleNavigation() {
      const isOpen = sideNav.classList.contains("show");

      if (isOpen) {
        closeNavigation();
      } else {
        openNavigation();
      }
    }

    /*
      Open / close from hamburger button.
    */
    navButton.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      toggleNavigation();
    });

    /*
      Close from X button.
    */
    if (closeButton) {
      closeButton.addEventListener("click", function (event) {
        event.preventDefault();
        closeNavigation();
      });
    }

    /*
      Close when clicking the dark overlay.
    */
    overlay.addEventListener("click", function () {
      closeNavigation();
    });

    /*
      Close automatically when any navigation option is selected.
    */
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        closeNavigation();
      });
    });

    /*
      Close with Escape key.
    */
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && sideNav.classList.contains("show")) {
        closeNavigation();
      }
    });

    /*
      Keep keyboard focus inside the open navigation.
      This prevents users from tabbing behind the menu.
    */
    sideNav.addEventListener("keydown", function (event) {
      if (event.key !== "Tab" || !sideNav.classList.contains("show")) {
        return;
      }

      const focusableElements = Array.from(getFocusableElements());

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    });

    /*
      Close the navigation after resizing to desktop/tablet widths
      if the menu was left open on mobile.
    */
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1100 && sideNav.classList.contains("show")) {
        closeNavigation();
      }
    });
  });
})();
