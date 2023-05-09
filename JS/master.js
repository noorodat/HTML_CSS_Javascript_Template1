/*
    No Code Here
*/

// Get landing page
let landingPage = document.querySelector(".landing-page");


// Toggle Settings
document.querySelector(".toggle-settings .fa-gear").onclick = function () {

    // Make the settings spin
    this.classList.toggle("fa-spin");

    // Make the box opened
    document.querySelector(".settings-box").classList.toggle("opened");
}

// Switch Colors

let settingsBackground = document.querySelector(".toggle-settings");

const colorsLi = document.querySelectorAll(".color-list li");

let settingsHr = document.querySelectorAll(".settings-box .settings-hr");

// Loop on the lis

colorsLi.forEach(function(li, indx) {

    li.addEventListener("click", (e) => {
        
        // Set the color on the settings icon
        settingsBackground.style.backgroundColor = e.target.dataset.color;
        

        settingsHr.forEach(hr => {
            hr.style.backgroundColor = e.target.dataset.color;
        })

        localStorage.setItem("color", e.target.dataset.color);
        
        // Remove active class from all children + add for the specific one.
        handleActive(e);
        localStorage.setItem("active",indx);

    });

});

// Set the color for the settings icon and the hr


if(localStorage.getItem("color")) {

    settingsBackground.style.backgroundColor = localStorage.getItem("color");
    settingsHr.forEach(hr => {
        hr.style.backgroundColor = localStorage.getItem("color");
    })
}

// Set the active class

if(localStorage.getItem("active")) {
    colorsLi[localStorage.getItem("active")].classList.add("active");
}

// Change background
let backgrounds = document.querySelectorAll(".settings-box .background-container img");

backgrounds.forEach((bckgrd) => {

    bckgrd.addEventListener("click", (e) => {

    landingPage.style.backgroundImage = `url(${e.target.src})`;
    sessionStorage.setItem("background", e.target.src);

    });

});

// Get the background from session storage and set in the page
if (sessionStorage.getItem("background")) {
    landingPage.style.backgroundImage = `url(${sessionStorage.getItem("background")})`;
}

// Set the default background image
else {
    landingPage.style.backgroundImage = `(../images/Background.jpg)`;
}

// Create pop up with the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener("click", (e) => {

        // Create overlay element
        let overlay = document.createElement("div");
        overlay.classList.add("popup-overlay");

        // Append overlay to body
        document.body.appendChild(overlay);

        // Create the popup box
        let popupBox = document.createElement("div");
        popupBox.classList.add("popup-box");
        
        if(img.alt !== null) {

            // Create image heading with it's text
            let imgHeading = document.createElement("h3");
            imgText = document.createTextNode(img.alt);

            // Append text to heading
            imgHeading.appendChild(imgText);

            // Append the heading to the popup box
            popupBox.appendChild(imgHeading);
        }

        // Create the image
        let popupImage = document.createElement("img");
        popupImage.src = img.src;

        // Append image to popup box + Popup box to body
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);

        // Create the close button with its class + text
        let closeButton = document.createElement("span");
        let closeButtonText = document.createTextNode("X");

        // Append text to button
        closeButton.appendChild(closeButtonText);

        // Add class to close button
        closeButton.classList.add("close-button");
        
        // Append close button to popup box
        popupBox.appendChild(closeButton);
        
    });

});

// Close the popup image
document.addEventListener("click", e => {

    if (e.target.className === `close-button`) {
        
        // Remove the popup
        e.target.parentNode.remove();

        // Reomve the overlay
        document.querySelector(".popup-overlay").remove();

    }

});

// Select all links + Bullets to scroll to sections

const allLinks = document.querySelectorAll(".landing-page .links li");
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Scroll function
function scrollToSection(elements) {
    
    elements.forEach(function(ele, indx) {

        ele.addEventListener("click", (e) => {
            
            document.querySelector(e.target.dataset.section).scrollIntoView({
    
                behavior: "smooth"
    
            });

            handleActive(e);
        
        });
    
    });
    
}

// Scroll the sections
scrollToSection(allLinks);
scrollToSection(allBullets);

// Handle active state
function handleActive(ev) {

    ev.target.parentElement.querySelectorAll(".active").forEach((element) => {

        element.classList.remove("active");

    });

    ev.target.classList.add("active");

}

// Get settings show bullets
let showBulletsOption = document.querySelectorAll(".settings-box .option-box .yes-no div");


// Show / Hide bullets
showBulletsOption.forEach(show => {

    show.addEventListener("click", e => {

        if(e.target.className === "yes") {

            allBullets.forEach(bullet => {

                bullet.style.display = "block";
                localStorage.setItem("show-bullets", "yes");

            });

        }

        else {
            
            allBullets.forEach(bullet => {

                bullet.style.display = "none";
                localStorage.setItem("show-bullets", "no");

            });
        }

    });

});

// Handle the local storage for the show bullets option
if(localStorage.getItem("show-bullets")) {

    if(localStorage.getItem("show-bullets") === "yes") {

        allBullets.forEach(bullet => {

            bullet.style.display = "block";

        });

    }

    else {

        allBullets.forEach(bullet => {

            bullet.style.display = "none";

        });

    }

}

// Reset options settings
let reserOptions = document.querySelectorAll(".settings-box .option-box .reset div");

reserOptions.forEach(option => {

    option.addEventListener("click" , (e) => {

        if(e.target.className === "yes") {
            
            localStorage.clear();
            sessionStorage.clear();

            // set the default backgroud
            landingPage.style.backgroundImage = `url("./images/Background.jpg")`;

            // set the default color for the settings button
            settingsBackground.style.backgroundColor = "white";

            settingsHr.forEach(hr => {
                hr.style.backgroundColor = "#ff0000c3";
            });

            colorsLi.forEach(li => {
                li.classList.remove("active");
            });

            allBullets.forEach(bullet => {
                bullet.style.display = "block";
            });
        }

        else {
            return false;
        }

    });

});

// check if local/session storage is empty
if(localStorage.length === 0 || sessionStorage.length === 0) {

    landingPage.style.backgroundImage = `url("./images/Background.jpg")`;
    settingsBackground.style.backgroundColor = "ff0000c3";
    settingsHr.forEach(hr => {
        hr.style.backgroundColor = "#ff0000c3";
    })

}


// Toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");


toggleBtn.onclick = function (e) {
    
    // Stop prpagation
    e.stopPropagation(); // when i click in the span it won't close the menu

    this.classList.toggle("menu-active");
    tLinks.classList.toggle("opened")

};

// Click anywhere outside the menu and toggle button

document.addEventListener("click" , (e) => {

    if(e.target !== toggleBtn && e.target !== tLinks) {

        // Check if the menu is opened
        if(tLinks.classList.contains("opened")) {

            tLinks.classList.remove("opened");
            toggleBtn.classList.remove("menu-active");

        }

    }

});

// Stop propagation on menu

tLinks.onclick = function (e) {

    e.stopPropagation(); // stops proppagation when i click on the lis

}







