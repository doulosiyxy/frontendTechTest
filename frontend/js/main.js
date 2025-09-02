//DOM ready

document.addEventListener("DOMContentLoaded", function () {

    //DOM Elements, constants and variables
    const BASE_URL = "https://api.nasa.gov/planetary/apod";
    const API_KEY = "wYouuhSTfCtykML8mOfk81iVtrEzDBnjiZlLMaic"
    const RANDOM_IMAGES_KEY = `${API_KEY}&count=4`;
    let apodTitle = document.getElementsByClassName("apod_title");
    let apodImgElement = document.getElementsByClassName("apod_img");
    let apodDate = document.getElementById('apod-date');
    let apodCredit = document.getElementById('apod-credit');
    let imageGrid = document.getElementById("other-photos_image-grid");
    console.log(imageGrid);

    //state, json
    //initialise

    try {
        fetch(`${BASE_URL}?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                apodTitle[0].innerHTML = `Today's Photo: ${data.title}`;
                apodImgElement[0].src = data.url;
                apodImgElement[0].alt = data.title;
                apodDate.innerHTML = getFormattedDate(data.date);
                apodCredit.innerHTML = data.copyright ? data.copyright : "Anonymous";
            })
    }
    catch (error) {
        console.error(error)
        apodImgElement[0].alt = "Image unvailable. Please refresh your browser.";
    }

    try {
        fetch(`${BASE_URL}?api_key=${RANDOM_IMAGES_KEY}`)
            .then(res => res.json())
            .then(data => {
                data.map(image => {
                    imageGrid.innerHTML += `
                    <article class="other-photos_article">
                        <div class="other-photos_img-wrapper">
                            <img class="other-photos_photo" src="${image.url ? image.url : ""}" alt="${image.title}" loading="lazy" onerror="this.style.display='none';">
                        </div>
                            <div class="other-photos_text-container">
                            <img class="other-photos_icon icon" src="assets/calendar-alt.svg">
                            <span class="other-photos_text">${getFormattedDate(image.date)}</span>
                        </div>
                        <div class="other-photos_text-container">
                            <img class="other-photos_icon icon" src="assets/copyright.svg">
                            <span class="other-photos_text">${image.copyright ? image.copyright : "Anonymous"}</span>
                        </div>
                    </article>
                    `
                })
            })
    }
    catch (error) {
        console.error(error)
    }

    //event listeners

    //functions

    function getFormattedDate(dateString) {
        const timestamp = Date.parse(dateString);
        const dateObj = new Date(timestamp);
        const year = dateObj.getFullYear();
        const month = dateObj.toLocaleString('default', { month: 'long' });
        const day = dateObj.getDate();
        return `${year} ${month} ${day}`;
    }

});