
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let params = new URLSearchParams(search);
  return (params.get("city"));
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    //console.log("https://"+address+"/adventures?city="+city);
    //console.log(city);
    let adv = await fetch(config.backendEndpoint+"/adventures?city="+city);
    let res= await adv.json();
    console.log(res);
    return res;
  }
  catch(e){
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  //console.log(adventures);
  let div=document.getElementById("data");
  for(let i=0;i<adventures.length;i++){
    let content=`
    <div class="col-6 col-lg-3 mb-4 position-relative"  >
    <div class="category-banner">
    ${adventures[i].category}
    </div>
    <a id="${adventures[i].id}" href="detail/?adventure=${adventures[i].id}">
      <div class="activity-card" id="${adventures[i].id}">
        <img src="${adventures[i].image}" />
        <div class=" d-flex flex-column  flex-md-row align-items-center align-items-md-baseline justify-content-md-between px-md-3 flex-wrap pb-0 pt-2 w-100">         
         <p class="mb-0">${adventures[i].name}</p>
         <p >&#8377; ${adventures[i].costPerHead}</p>        
         </div>
         <div class=" d-flex flex-column flex-md-row align-items-center align-items-md-baseline justify-content-md-between px-md-3 flex-wrap w-100"> 
         <p class="mb-0">Duration</p> 
         <p>${adventures[i].duration} Hour</p>        
        </div>
      </div>
    </a>
  </div>`
  // console.log("detail/?adventure="+adventures[0].id)
    div.innerHTML+=content;
  }

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  console.log(low);
  list= list.filter(element=>{
    return element.duration>=low && element.duration<=high;
  })
  return list;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  //console.log(categoryList);
  list = list.filter(element => {
    return categoryList.includes(element.category);
  });
  //console.log("filtered: " +list);
  return list;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // filters.duration = "12+";
  if(!filters.duration==""){
    // filters.duration = "12+";
    // console.log();
    if(filters.duration.includes("+")){
    list=filterByDuration(list,12,99);
    }
    else{
      let split=filters.duration.split("-");
      list=filterByDuration(list,split[0],split[1]);
    }
    // console.log(list);
  }
  if(filters.category.length > 0){
    list=filterByCategory(list,filters.category)
  }
  console.log(filters);
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",
    JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const filters= JSON.parse(localStorage.getItem("filters"));


  // Place holder for functionality to work in the Stubs
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  console.log(filters);
  let element=document.getElementById("category-list");
  for(let i=0;i<filters.category.length;i++){
  let content=`
  <div class="category-filter">
    ${filters.category[i]}
  </div>`
  element.innerHTML+=content;
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
