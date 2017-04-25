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
        let eventTitle = event.name;
        let eventLocation = `${event.venue.name}, ${event.venue.address_1}, ${event.venue.city}`;
        let dateInfo = new Date(event.time);
        let eventDate = formatDate(dateInfo);
      
        makeEventElements(index);
        addEventDetails(eventTitle, eventDate, eventLocation, index);
      }); 
    });
}

function makeEventElements(num){
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

function addEventDetails(event, date, location, num){
  let headerContent = document.createTextNode(`${date} ${event}`);
  let pContent = document.createTextNode(location);

  document.getElementById('event' + num).appendChild(headerContent);
  document.getElementById('location' + num).appendChild(pContent);
}

function formatDate(obj){
  let eventDate = "";
  let dateArr = obj.toString().split(' ').slice(0, 5);
  let date = dateArr.slice(0, 3).join(' ');
  let time = dateArr.pop().split(':').slice(0, 2).join(':');

  if (time.charAt(0) === '0'){ time = time.substring(1); }  
  
  return eventDate = `${date} ${time}`;
}

