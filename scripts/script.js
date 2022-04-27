const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoadedAmount = 0;
let totalImagesAmount = 0;
let photosArray = [];
let isInitialLoad = true;

let initialCount = 5;
const apiKey = 'JX1NLVF2ahOP-StzjLW2-_CD3hlC_ne8USzl83J6yZg';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

function updateAPIUrlWithNewCount(picCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

function imageLoaded() {
    imagesLoadedAmount++;
    if(imagesLoadedAmount === totalImagesAmount){
        ready = true;
        loader.hidden = true;
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    imagesLoadedAmount = 0;
    totalImagesAmount = photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        const img = document.createElement('img');
        setAttributes(img, {
           src: photo.urls.regular,
            alt: photo.description,
            title: photo.description
        });

        img.addEventListener('load', imageLoaded)

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if(isInitialLoad){
            updateAPIUrlWithNewCount(30);
            isInitialLoad = false;
        }
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000
    && ready) {
        ready = false;
        getPhotos();
    }
})

getPhotos();