// REGISTER SERVICE WORKER

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geo Location not supported by browser");
    }
}
//function that retrieves the position
function showPosition(position) {
    const location = {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
    };
    console.log(location)
}
//request for location
getLocation();


if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then(function () {
                console.log("Pendaftaran ServiceWorker berhasil");
            })
            .catch(function () {
                console.log("Pendaftaran ServiceWorker gagal");
            });
    });
} else {
    console.log("ServiceWorker belum didukung browser ini.");
}
