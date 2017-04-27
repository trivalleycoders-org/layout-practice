import * as ku from '../lib/ke-utils';
require('../templates/index.html');

const fetchJsonp = require('../../node_modules/fetch-jsonp/build/fetch-jsonp.js');

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
  
   fetchJsonp(URL)
    .then((response) => {
    	return response.json();
    })
    .then(function(data){
      // Convert jsonp data into an array
      let dataArr = Object.values(data);
      
    // Make elements and add details for each event
      dataArr[1].forEach((event, index) => {
        let dateInfo = new Date(event.time);
        let details = {
          eventTitle: event.name,
          eventLocation: `${event.venue.name}, ${event.venue.address_1}, ${event.venue.city}`,
          eventDate: formatDate(dateInfo),
          index: index,
        }
        
        makeEventElements({index});
        addEventDetails(details);
      }); 
    });
}

function makeEventElements({index}){
  let newHeader = document.createElement("H4");
  let newP = document.createElement("p");
  let headerId = 'event' + index;
  let pId = 'location' + index;

  document.getElementById('events-list').appendChild(newHeader);
  document.getElementById('events-list').appendChild(newP);

  newHeader.id = headerId;
  newP.id = pId;

  document.getElementById(headerId).className = "event";
  document.getElementById(pId).className = "location";
}

function addEventDetails({eventTitle, eventLocation, eventDate, index}){
  let headerContent = document.createTextNode(`${eventDate} ${eventTitle}`);
  let pContent = document.createTextNode(`${eventLocation}`);

  document.getElementById('event' + index).appendChild(headerContent);
  document.getElementById('location' + index).appendChild(pContent);
}

function formatDate(dateInfo){
  let eventDate = "";
  let dateArr = dateInfo.toString().split(' ').slice(0, 5);
  let date = dateArr.slice(0, 3).join(' ');
  let time = dateArr.pop().split(':').slice(0, 2).join(':');

  if (time.charAt(0) === '0'){ time = time.substring(1); }  
  
  return eventDate = `${date} ${time}`;
}

