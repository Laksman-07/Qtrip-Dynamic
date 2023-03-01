import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let res= await fetch(config.backendEndpoint+"/reservations/");
    let reservations= await res.json();
    //console.log(reservations);
    return reservations;
  }
  catch(e){
    return null;
  }
  


  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  let element=document.getElementById("reservation-table");
  //Conditionally render the no-reservation-banner and reservation-table-parent
  //console.log(reservations)
  if(reservations!=0){
    document.getElementById("reservation-table-parent").style.display="block";
    document.getElementById("no-reservation-banner").style.display="none"
  }
  else{
    document.getElementById("no-reservation-banner").style.display="block";
    document.getElementById("reservation-table-parent").style.display="none";
  }

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  for(let i=0;i<reservations.length;i++){
    let{adventure,
      adventureName,
      date,
      id,
      name,
      person,
      price,
      time}=reservations[i];
    // let addr=window.location.href;
    const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const options = {year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric', second:'numeric' };
    let content=`
    <tr>
    <td>${id}</td>
    <td>${name}</td>
    <td>${adventureName}</td>
    <td>${person}</td>
    <td>${new Date(date).toLocaleDateString('en-IN', dateOptions)}</td>
    <td>${price}</td>
    <td>${new Date(time).toLocaleDateString("en-IN", options).replace(" at", ",")}</td>
    <td><p id="${id}"><a href="../detail/?adventure=${adventure}"><button class="reservation-visit-button">Visit Adventure</button></a></td>
    </tr>`
    element.innerHTML+=content;
    // console.log(document.getElementById(id).children[0].href);
  }
 }

export { fetchReservations, addReservationToTable };
