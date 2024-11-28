document.getElementById('jobApplicationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // 1-collect data
    const formData = new FormData(event.target);

    // 2-get event entries
    const formObject = Object.fromEntries(formData.entries());

    // 3-get lat long
    const locationDiv = document.getElementById('demo');
    const latitude = locationDiv?.dataset.latitude || '';
    const longitude = locationDiv?.dataset.longitude || '';

    // 4-append long lat to the form
    formObject.latitude = latitude;
    formObject.longitude = longitude;

    const jsonString = JSON.stringify(formObject, null, 2);

    const blob = new Blob([jsonString], { type: 'application/json' });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');

    a.href = url;
    a.download = 'job_application.json';

    document.body.appendChild(a); // Ensure the anchor is in the DOM
    a.click();
    document.body.removeChild(a); // Clean up after click

});


function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        document.getElementById('demo').innerHTML = "geolocation is not supported by your browser";
    }
}

function showPosition(position){
    const locationDiv = document.getElementById('demo');
    locationDiv.dataset.latitude = position.coords.latitude;
    locationDiv.dataset.longitude = position.coords.longitude;

    locationDiv.innerHTML = "Latitude: " + position.coords.latitude + "<br> Longitude: " + position.coords.longitude;
}
