// Unsplash api
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;
const notFirstCount = 30
let count = 5;
const apiKey = 'px4rO7tXtGyXN1fRiSwlLf4NrtcxEdYfV6GAbvBvZXg';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// check if all imageLoaded
//Helper function to set attribute 
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded == totalImages) {
        ready= true;
        if (initialLoad) {
            initialLoad = false;
            changeImageCount();
        }
        loader.hidden = true;
    }
}
function changeImageCount() {
    count = notFirstCount;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
}
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
// Create Elements for links & photos  add to DOM.
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        // create link
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // create image
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event listener, check wheh each image is loaded.
        img.addEventListener('load', imageLoaded);
        // add image inside link
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get phots from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {

    }
}
// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
} )
getPhotos();