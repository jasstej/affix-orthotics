// document.addEventListener("DOMContentLoaded", () => {
//     // Smooth Scroll Functionality
//     const navigationLinks = document.querySelectorAll(".navigation a");
//     navigationLinks.forEach(link => {
//         link.addEventListener("click", event => {
//             event.preventDefault();
//             const targetID = event.target.getAttribute("href").replace(".html", "");
//             const targetSection = document.querySelector(targetID);
//             if (targetSection) {
//                 window.scrollTo({
//                     top: targetSection.offsetTop - 50,
//                     behavior: "smooth"
//                 });
//             }
//         });
//     });

//     // Loading Screen
//     const loadingScreen = document.getElementById("loading-screen");
//     window.onload = () => {
//         setTimeout(() => {
//             loadingScreen.style.opacity = "0";
//             setTimeout(() => (loadingScreen.style.display = "none"), 500);
//         }, 1000);
//     };

//     // Interactive Animations on Scroll
//     const fadeElements = document.querySelectorAll(".products .category");
//     const observer = new IntersectionObserver(
//         entries => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     entry.target.style.opacity = "1";
//                     entry.target.style.transform = "translateY(0)";
//                 }
//             });
//         },
//         { threshold: 0.3 }
//     );

//     fadeElements.forEach(el => {
//         el.style.opacity = "0";
//         el.style.transform = "translateY(20px)";
//         observer.observe(el);
//     });
// });
