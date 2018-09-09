class GoogleMap
{
    constructor() {
        this.city = new google.maps.LatLng(45.764047, 4.875810);

    }

    initializeMap() {
        return new google.maps.Map(document.getElementById('googleMap'), {
            zoom: 14,
            center: this.city,
            mapTypeId: 'terrain' /* roadmap / satellite / hybrid / terrain : Au choix selon ce que je souhaite. roadmap est l'affichage par défaut
        satellite ( C'est écrit dessus :-p ) / hybrid c'est un mélange des deux premiers et terrain = map physique basée sur les informations du terrain */
        });
    }

    addMarkers(stations, map) {
        this.markers = [];
        const _this = this;
        JSON.parse(stations).forEach(function (station) {

            //méthode créer marker
            const latitude = station.position.lat;
            const longitude = station.position.lng;
            const latLng = new google.maps.LatLng(latitude, longitude);
            const iconBase = './images/';
            let icon = '';
            if (station.available_bikes > 0 && station.status === "OPEN") {
            	icon = iconBase + 'stationVerte.png';
            } else if (station.available_bikes === 0 && station.status === "OPEN") {
            	icon = iconBase + 'stationOrange.png';
            } else {
            	icon = iconBase + 'stationRouge.png';
            }
            const marker = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: icon,
                size: new google.maps.Size(41, 54),
                //fin methode
            });

            _this.addMarkerListener(station, marker);
            _this.markers.push(marker);
        });

        const markerCluster = new MarkerClusterer(map, this.markers, {
            imagePath: "./images/markerclusterer/m"
        });
    }

    addMarkerListener(station, marker) {
        const _this = this;
        marker.addListener('click', function () {
            document.getElementById('details').style.display = "block";
            // Suppression des messages d'alertes
            document.getElementById('erreur-signature').style.display = "none";
            // Suppression signature
            var signatureCanvas = document.getElementById("signature").querySelector("canvas");
            var signaturePad = new SignaturePad(signatureCanvas);
            signaturePad.clear();
            // méthode afficher info marker
            var stationName = document.getElementById('station-name');
            stationName.innerText = station.name;

            _this.setStationStatus(station.status);
            _this.setStationInfos(station);
            const signature = new Signature();
            signature.initializeSignature(station);
        });
    }

    setStationStatus(status) {
        const stationStatus = document.getElementById('status-station');
        if (status === "OPEN") {
            stationStatus.innerText = "Ouverte";
            stationStatus.style.color = "green";
        } else {
            stationStatus.innerText = "Fermée";
            stationStatus.style.color = "red";
        }
    }

    setStationInfos(station) {
        const stationAddress = document.getElementById('station-address');
        stationAddress.innerHTML = '<i class="fa fa-map" aria-hidden="true"></i>' + station.address;

        const stationAvailablesBikes = document.getElementById('velo-dispo');
        stationAvailablesBikes.innerHTML = '<i class="fa fa-bicycle" aria-hidden="true"></i>' + station.available_bikes;

        const stationAvailablesStands = document.getElementById('places-dispo');
        stationAvailablesStands.innerHTML = '<i class="fa fa-info" aria-hidden="true"></i>' + station.available_bike_stands;
    }
}