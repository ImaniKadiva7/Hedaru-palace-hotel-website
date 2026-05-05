const navBtn = document.getElementById('nav-btn');
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
</script>
