import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let params = new URLSearchParams(search);
  return (params.get("adventure"));


  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    //console.log("https://"+address+"/adventures?city="+city);
    //console.log(city);
    let adv = await fetch(config.backendEndpoint+"/adventures/detail?adventure="+adventureId);
    let res= await adv.json();
   // console.log(res);
    return res;
  }
  catch(e){
    return null;
  }


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  //console.log(adventure);
  let {id,name,subtitle,images,content}=adventure;
  let heading=document.getElementById("adventure-name");
  heading.textContent=name;
  let caption=document.getElementById("adventure-subtitle");
  caption.textContent=subtitle;
  let gallery=document.getElementById("photo-gallery");
  //console.log(images);
  
  for(let i=0;i<images.length;i++){
    let content=`
    <div >
    <img class="activity-card-image" src="${images[i]}"/>
    </div>`
    gallery.innerHTML+=content;
  }
  let description=document.getElementById("adventure-content");
  description.textContent=content;
 
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let gallery=document.getElementById("photo-gallery");
  gallery.innerHTML="";
  let content=`
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
  </div>
  <div class="carousel-inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
  </button>
  </div>`
  gallery.innerHTML=content;
  let indicator=document.getElementsByClassName("carousel-indicators")[0] ;
  let carousel=document.getElementsByClassName("carousel-inner")[0] ;
 

  for(let i=0;i<images.length;i++){
    let carouselContent=`
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="active" aria-current="true" aria-label="Slide ${i+1}"></button>
    `;
    let carouselItem=`
    <div class="carousel-item ${i == 0 ? "active" : ""}">
    <img class="activity-card-image" src="${images[i]}" class="d-block w-100" alt="...">
    </div>`;
    indicator.innerHTML+=carouselContent;
    carousel.innerHTML+=carouselItem;
  }
  console.log(gallery);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
