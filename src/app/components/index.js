import * as ku from '../lib/ke-utils';
require('../templates/index.html');

(function() 
  {
  	/**
  	 * Add list of Meetup events to Events section.
  	 */ 
    populatePage();
  }
)();


function populatePage(){
  
  const URL = "https://api.meetup.com/trivalleycoders/events?photo-host=public&page=5&sig_id=186737513&sig=d406090300acc9b233fb24b6a891f3d0160148a5";
  
  return fetch(URL, {mode: 'no cors'})
    .then((response) => {
    	return response.json();
    })
    .then(function(data){
    // make elements and add details for each event
      data.forEach((event, index) => {
        let dateInfo = new Date(event.time);
        console.log(dateInfo);
        let details = {
          eventTitle: event.name,
          eventLocation: `${event.venue.name}, ${event.venue.address_1}, ${event.venue.city}`,
          eventDate: dateInfo,
          index: index,
        }
      
        makeEventElements(index);
        addEventDetails(details);
      }); 
    });
}

function formatDate(dateInfo){
  let eventDate = "";
  let dateArr = obj.toString().split(' ').slice(0, 5);
  let date = dateArr.slice(0, 3).join(' ');
  let time = dateArr.pop().split(':').slice(0, 2).join(':');

  if (time.charAt(0) === '0'){ time = time.substring(1); }  
  
  return eventDate = `${date} ${time}`;
}

//                        eventTitle, eventLocation, eventDate, index
function addEventDetails({eventTitle, eventLocation, eventDate, index}){
  let headerContent = document.createTextNode(`${eventDate} ${eventTitle}`);
  let pContent = document.createTextNode(eventLocation);

  document.getElementById('event' + num).appendChild(headerContent);
  document.getElementById('location' + num).appendChild(pContent);
}

function makeEventElements(index){
  let newHeader = document.createElement("H4");
  let newP = document.createElement("p");
  let headerId = 'event' + num;
  let pId = 'location' + num;

  document.getElementById('events-list').appendChild(newHeader);
  document.getElementById('events-list').appendChild(newP);

  newHeader.id = headerId;
  newP.id = pId;

  document.getElementById(headerId).className = "event";
  document.getElementById(pId).className = "location";
}



