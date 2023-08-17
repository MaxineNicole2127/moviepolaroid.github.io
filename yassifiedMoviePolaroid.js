/* title */

const title = document.querySelector("#siteTitle");
const footer = document.querySelector(".footer");
const moviesPart = document.querySelector(".moviesPart");
title.addEventListener("click", openMovieSection);
// footer.addEventListener("click", openMovieSection);

function openMovieSection(){
    moviesPart.classList.toggle("active");
}

//selectors
// <polaroid>
const moviePic = document.getElementById("moviePic");
const movieTitle = document.getElementById("movieTitle");
const movieYear = document.getElementById("movieYear");
const writer = document.getElementById("writer");
const director = document.getElementById("director");
const runtime = document.getElementById("runtime");
const polaroid = document.querySelector("#polaroid");

// <input>
const titleInput = document.getElementById("titleInput");
const yearInput = document.getElementById("yearInput");
const imgInput = document.getElementById("imgInput");
const directorInput = document.getElementById("directorInput");
const writerInput = document.getElementById("writerInput");
const runtimeInput = document.getElementById("runtimeInput");
const imgPreview = document.getElementById("imgPreview");
const uploadButton = document.getElementById("label");

let TITLE = "LADY BIRD";
let YEAR = "2017";
let DIRECTOR = "Greta Gerwig";
let WRITER = "Greta Gerwig";
let RUNTIME = "1hr 35mins";
let IMG_URL = "lady bird.jpeg";
let FILENAME = "[POL]lady_bird";



/* FUNCTIONS */

function changePicture(){
    IMG_URL = URL.createObjectURL(imgInput.files[0]);
    uploadButton.textContent = "IMG UPLOADED";
    // moviePic.src = IMG_URL;
    imgPreview.src = IMG_URL;
}

const directImg_Button = document.querySelector("#direct_img");


directImg_Button.onchange = function(){
    IMG_URL = URL.createObjectURL(directImg_Button.files[0]);
    moviePic.src = IMG_URL;
    imgPreview.src = IMG_URL;
    uploadButton.textContent = "IMG UPLOADED";
}

function savePolaroid(){
    const toSave = document.querySelector("#polaroid");
    const scaleOptions = {scale: 2};
    html2canvas(toSave, scaleOptions).then((canvas)=> {
        const baseURL = canvas.toDataURL("image/png");
        const anchor = document.createElement("a");
        anchor.setAttribute("href", baseURL);
        anchor.setAttribute("download", FILENAME);
        anchor.click(); 
        anchor.remove();
    })
    let toPrint = window.querySelector("#polaroid");
    toPrint.print();
}


function saveChanges(){
    let year = document.createElement("span");
    year.setAttribute("id", "movieYear");

    TITLE = (titleInput.value).toUpperCase();
    YEAR = yearInput.value;
    DIRECTOR = directorInput.value;
    WRITER = writerInput.value;
    RUNTIME = runtimeInput.value;
    FILENAME = "[POL]" + (TITLE.toLowerCase()).replace(/ /g, '_');
    console.log(FILENAME);

    moviePic.src = IMG_URL;
    movieTitle.textContent = TITLE;
    year.textContent = YEAR;
    writer.textContent = WRITER;
    director.textContent = DIRECTOR;
    runtime.textContent = RUNTIME;

    //polaroid.classList.toggle("jump");

    // moviePic.src = IMG_URL;

    movieTitle.appendChild(year);
}

//manage title functions
let orig_fontSize = 27;
let orig_fontSpacing = 0;
let fontSize = orig_fontSize;
let fontSpacing = orig_fontSpacing;
function increaseSize(){
    fontSize += 1;
    movieTitle.style.fontSize = fontSize + "px";
}

function decreaseSize(){
    fontSize -= 1;
    movieTitle.style.fontSize = fontSize + "px";
}

function decreaseSpacing(){
    fontSpacing -= 1;
    movieTitle.style.letterSpacing = fontSpacing + "px";
    let year = movieTitle.querySelector("#movieYear");
    year.style.letterSpacing = "0px";
}

function increaseSpacing(){
    fontSpacing += 1;
    movieTitle.style.letterSpacing = fontSpacing + "px";
    let year = movieTitle.querySelector("#movieYear");
    year.style.letterSpacing = "0px";
}

function resetPolaroid(){
    let year = document.createElement("span");
    year.setAttribute("id", "movieYear");

    fontSize = orig_fontSize;
    fontSpacing = orig_fontSpacing;
    movieTitle.style.fontSize = fontSize + "px";
    movieTitle.style.letterSpacing = fontSpacing + "px";
    moviePic.src = "lady bird.jpeg";
    imgPreview.src = "lady bird.jpeg";
    movieTitle.textContent = "LADY BIRD";
    year.textContent = "2017";
    writer.textContent = "Greta Gerwig";
    director.textContent = "Greta Gerwig";
    runtime.textContent = "1hr 35mins";
    uploadButton.textContent = "UPLOAD IMAGE";

    titleInput.value = "";
    yearInput.value = "";
    writerInput.value = "";
    directorInput.value = "";
    runtimeInput.value = "";
    FILENAME = "[POL]lady_bird";

    movieTitle.appendChild(year);

    let google_pinterest = moviesPart.querySelector(".container");
    let footer = moviesPart.querySelector(".footer");
    if(google_pinterest){
        google_pinterest.remove();
    }if(footer){
        footer.remove();
    }
}

/* SEARCH MOVIES */
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=141e4246dff3fe9296627bb70b3727b1&query=";

let movies = [];
const movieSection = document.querySelector(".moviesSection");
//returnMovies(SEARCHAPI+"Harry Potter");
const form = document.querySelector(".searchSection form");
const search = document.querySelector(".searchSection #searchInput");

function returnMovies(url){
    movieSection.innerHTML = ""; movies = [];
    fetch(url).then(res => res.json())
    .then(function(data){
        console.log(data.results);
        data.results.forEach(movie => {
            let MOVIE = {};
            let TITLE = movie.title;
            let IMAGE = IMG_PATH + movie.poster_path;
            let YEAR = (movie.release_date).substring(0,4);
            let ID = movie.id;

            MOVIE.title = TITLE;
            MOVIE.image = IMAGE;
            MOVIE.year = YEAR;

            fetch(`https://api.themoviedb.org/3/movie/${ID}/credits?api_key=141e4246dff3fe9296627bb70b3727b1`)
            .then(res => res.json()).then(function(movie){
                let director = movie.crew.find(({job}) => job === "Director");
                let writer = movie.crew.find(({job}) => job === "Writer");
                let screenplay = movie.crew.find(({job})=> job === "Screenplay");
                let author = movie.crew.find(({job})=> job === "Author");
                
                if(director != undefined) MOVIE.director = director.name;
                else MOVIE.director = "Not Found!";

                if(writer != undefined) MOVIE.writer = writer.name;
                else if(screenplay != undefined) MOVIE.writer = screenplay.name;
                else if(author != undefined) MOVIE.writer = author.name;
                else MOVIE.writer = "Not Found!";
            })
            
            fetch(`https://api.themoviedb.org/3/movie/${ID}?api_key=141e4246dff3fe9296627bb70b3727b1`)
            .then(res => res.json()).then(function(movie){
                let runtime = movie.runtime;
                let runtime_Int = parseInt(runtime);
                let hour = Math.floor(runtime_Int/60);
                let minutes = runtime_Int - 60*hour;

                MOVIE.hour = hour;
                MOVIE.minutes = minutes;
                
                movies.push(MOVIE);
                console.log(MOVIE);

                // Check if all movies have been fetched
                if (movies.length === data.results.length) {
                    createMovieElements();
                }
            })
        })
    })
}

function createMovieElements() {
    for(let i=0; i < movies.length; i++){
        let MovieTitle = movies[i].title;
        let MoviePicture = movies[i].image;
        let MovieYear = movies[i].year;
        let MovieDirector = movies[i].director;
        let MovieWriter = movies[i].writer;
        let MovieHr = movies[i].hour;
        let MovieMins = movies[i].minutes;

        //console.log(MovieDirector);

        //create element
        let row = document.createElement("div");
        let column = document.createElement("div");
        let card = document.createElement("div");
        let center = document.createElement("center");
        let movie_pic = document.createElement("img");
        let movie_title_wrapper = document.createElement("div");
        let movie_title = document.createElement("h3");

        // set attribute
        row.setAttribute("class", "row");
        row.setAttribute("onclick", "assignMovie(event)");
        column.setAttribute("class", "column");
        card.setAttribute("class", "card");
        card.setAttribute("title", MovieTitle);
        card.setAttribute("image", MoviePicture);
        card.setAttribute("year", MovieYear);
        card.setAttribute("director", MovieDirector);
        card.setAttribute("writer", MovieWriter);
        card.setAttribute("hour", MovieHr);
        card.setAttribute("mins", MovieMins);
        movie_pic.setAttribute("id", "movie_pic");
        movie_title_wrapper.setAttribute("class", "movie-title-wrapper");
        movie_title.setAttribute("id", "movie_title");

        // add contents
        movie_pic.src = MoviePicture;
        movie_title.textContent = MovieTitle;
        // append children
        center.appendChild(movie_pic); movie_title_wrapper.appendChild(movie_title); 
        card.appendChild(center); card.appendChild(movie_title_wrapper); 
        column.appendChild(card); row.appendChild(column);

        movieSection.appendChild(row);
        //console.log(row.innerHTML);
        let isFooter = document.querySelector(".footer");
        if(!isFooter){
            let footer = document.createElement("div");
            footer.innerHTML = "<div class=\"footer\"><i class=\"fa-solid fa-angle-up\" id=\"caretUp\"></i></div>";
            //footer.style.marginTop = "-100px";
            moviesPart.appendChild(footer);
            
            footer.addEventListener("click", () => {
                openMovieSection();
                let isGooglePinterest = moviesPart.querySelector(".container");
                if(isGooglePinterest){
                    isGooglePinterest.remove();
                }
            });
        }
        //footer.style.visibility = "visible";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    movieSection.innerHTML = "";
    const searchItem = search.value;
    if(searchItem){
        returnMovies(SEARCHAPI + searchItem);
        search.value = "";
    }

    moviesPart.classList.add("active");
    let isGooglePinterest = moviesPart.querySelector(".container");
    if(isGooglePinterest){
        isGooglePinterest.remove();
    }

})

// let Google_Pinterest_GLOBAL = document.querySelector(".container");


let movieChosen;
function assignMovie(event){
    resetPolaroid();
    let targeted = event.target
    while(!targeted.classList.contains("row")) 
        targeted = targeted.parentElement;
    let cardTargeted = targeted.querySelector(".card");
    
    titleInput.value = cardTargeted.getAttribute("title");
    yearInput.value = cardTargeted.getAttribute("year");
    directorInput.value = cardTargeted.getAttribute("director");
    writerInput.value = cardTargeted.getAttribute("writer");
    IMG_URL = "empty picture.png";
    imgPreview.src = "empty picture.png";
    let hr = cardTargeted.getAttribute("hour");
    let mins = cardTargeted.getAttribute("mins");
    runtimeInput.value = `${hr}hr ${mins}mins`;

    saveChanges();
    moviesPart.classList.remove("active");

    let isGP = moviesPart.querySelector(".container");

    if(!isGP){
        const Google_Pinterest = document.createElement("div");
        Google_Pinterest.innerHTML = '<div class="container"><p id="instructions">Download your image here </p><a href="#" target="__blank" class="icon" id="google_tag"><img src="google logo.webp" class="button"><span class="label"><p style="display: flex;"><font color="#4385f5">G</font><font color="#eb4235">o</font><font color="#f9bc04">o</font><font color="#4385f5">g</font><font color="#34a853">l</font><font color="#eb4235">e</font></p></span></a><a href="#" target="__blank" class="icon" id="pinterest_tag"><img src="pinterest logo.png" class="button"><span class="label" style="color: #CB1F27;">Pinterest</span></a></div>';

        let searchitem = titleInput.value + " movie";
        let searchFor_pinterest = (searchitem.toLowerCase()).replace(/ /g, "%20");
        let searchFor_google = (searchitem.toLowerCase()).replace(/ /g, "+");
        let pinterest_link = `https://www.pinterest.ph/search/pins/?q=${searchFor_pinterest}&rs=typed`;
        let google_link = `https://www.google.com/images?q=${searchFor_google}`;
        //console.log(pinterest_link);
        //console.log(google_link);


        let Google_Pinterest_GLOBAL = Google_Pinterest;
        let google_tag = Google_Pinterest_GLOBAL.querySelector("#google_tag");
        let pinterest_tag = Google_Pinterest_GLOBAL.querySelector("#pinterest_tag");

        google_tag.href = google_link;
        pinterest_tag.href = pinterest_link;

        console.log(google_tag);

        moviesPart.appendChild(Google_Pinterest);
    }
    
}

// if(Google_Pinterest_GLOBAL){
//     let google_tag = Google_Pinterest_GLOBAL.querySelector("#google_tag");
//     let pinterest_tag = Google_Pinterest_GLOBAL.querySelector("#pinterest_tag");
    
// }


// console.log("https://www.pinterest.ph/search/pins/?q=harry%20potter%20and%20the%20prisoner%20of%20azkaban&rs=typed");
// console.log("https://www.pinterest.ph/search/pins/?q=shiva%20baby&rs=typed");
//              https://www.pinterest.ph/search/pins/?q=shiva%20baby&rs=typed

let searchitem = "Harry Potter and the Prisoner of Azkaban";
let searchFor_pinterest = (searchitem.toLowerCase()).replace(/ /g, "%20");
let searchFor_google = (searchitem.toLowerCase()).replace(/ /g, "+");
let pinterest_link = `https://www.pinterest.ph/search/pins/?q=${searchFor_pinterest}&rs=typed`;
let google_link = `https://www.google.com/images?q=${searchFor_google}`;
console.log(pinterest_link);
console.log(google_link);

const imgDisplay = document.querySelector(".imgDisplay");

imgDisplay.addEventListener("dragenter", (e) => {
    e.preventDefault(); e.stopPropagation();
    imgDisplay.classList.add("dashed");
}, false);

imgDisplay.addEventListener("dragleave", (e) => {
    e.preventDefault(); e.stopPropagation();
    imgDisplay.classList.remove("dashed");
}, false);

imgDisplay.addEventListener("dragover", (e) => {
    e.preventDefault(); e.stopPropagation();
    imgDisplay.classList.add("dashed");
}, false);

imgDisplay.addEventListener("drop", (e) => {
    e.preventDefault(); e.stopPropagation();
    imgDisplay.classList.remove("dashed");
    let dragged = e.dataTransfer;
    moviePic.src = URL.createObjectURL(dragged.files[0]);
    imgPreview.src = URL.createObjectURL(dragged.files[0]);
    uploadButton.textContent = "IMG UPLOADED";
}, false);

imgPreview.addEventListener("dragenter", (e) => {
    e.preventDefault(); e.stopPropagation();
    imgPreview.classList.add("dashed");
}, false);

imgPreview.addEventListener("dragleave", (e) => {
    e.preventDefault(); e.stopPropagation();
    imgPreview.classList.remove("dashed");
}, false);

imgPreview.addEventListener("dragover", (e) => {
    e.preventDefault(); e.stopPropagation();
    imgPreview.classList.add("dashed");
}, false);

imgPreview.addEventListener("drop", (e) => {
    e.preventDefault(); e.stopPropagation();
    imgPreview.classList.remove("dashed");
    let dragged = e.dataTransfer;
    // moviePic.src = URL.createObjectURL(dragged.files[0]);
    imgPreview.src = URL.createObjectURL(dragged.files[0]);
    uploadButton.textContent = "IMG UPLOADED";
}, false);


/*

let footer = document.createElement("div");
footer.innerHTML = "<div class=\"footer\"><i class=\"fa-solid fa-angle-up\" id=\"caretUp\"></i></div>"
moviesPart.appendChild(footer);

*/