function initMap() {
    document.getElementById('details').style.display = "none";
    //var datetime = Date.now();


    var lyon = new google.maps.LatLng(45.764047, 4.875810);
    var map = new google.maps.Map(document.getElementById('googleMap'), {
        zoom: 14,
        center: lyon,
        mapTypeId: 'terrain' /* roadmap / satellite / hybrid / terrain : Au choix selon ce que je souhaite. roadmap est l'affichage par défaut
        satellite ( C'est écrit dessus :-p ) / hybrid c'est un mélange des deux premiers et terrain = map physique basée sur les informations du terrain */
    });

    ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=" + ville + "&apiKey=56b77c204faa8c1947186ef3e80af8c817f4cc72",
        function (reponse) {
            // Transforme la réponse en tableau d'objets JavaScript
            var stations = JSON.parse(reponse);
            this.markers = []; // Variable pour la map

            stations.forEach(function (station) {

                //méthode créer marker
                this.latitude = station.position.lat;
                this.longitude = station.position.lng;
                this.latLng = new google.maps.LatLng(latitude, longitude);
                var iconBase = './images/';
                this.marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    icon: iconBase + 'stationOuverte.png',
                    size: new google.maps.Size(41, 54),
                    //fin methode
                });

                this.markers.push(marker);

                this.marker.addListener('click', function () {
                    console.log(station);
                    document.getElementById('details').style.display = "block";
                    console.log('clique sur le marqueur station :', station.name);
                    // méthode afficher info marker

                    var stationName = document.getElementById('station-name');
                    stationName.innerText = station.name;
                    console.log('nom station :', station.name);

                    var stationStatus = document.getElementById('status-station');
                    if (station.status === "OPEN") {
                        stationStatus.innerText = "Ouverte";
                        stationStatus.style.color = "green";

                    } else {
                        stationStatus.innerText = "Fermée";
                        stationStatus.style.color = "red";
                    }
                    console.log('Statut', station.status);


                    var stationAddress = document.getElementById('station-address');
                    stationAddress.innerHTML = '<i class="fa fa-map" aria-hidden="true"></i>' + station.address;
                    //console.log('Adresse', station.address);

                    var stationAvailablesBikes = document.getElementById('velo-dispo');
                    stationAvailablesBikes.innerHTML = '<i class="fa fa-bicycle" aria-hidden="true"></i>' + station.available_bikes;
                    //console.log('Velos dispo', station.available_bikes);

                    var stationAvailablesStands = document.getElementById('places-dispo');
                    stationAvailablesStands.innerHTML = '<i class="fa fa-info" aria-hidden="true"></i>' + station.available_bike_stands;
                    //console.log('Places dispo', station.available_bike_stands);

                    var infos = {
                        station: station.name,
                        status: station.status,
                        dispo: station.available_bikes,
                        temps: null
                    };
                    if (sessionStorage.getItem('station_info') !== null) {
                        var resultInfos = JSON.parse(sessionStorage.getItem("station_info"));
                            if (resultInfos.temps !== null) {
                                sessionStorage.clear();
                                document.getElementById('erreur-signature').style.display = "block"; // affiche erreur
                                document.getElementById("erreur-signature").innerHTML = "Une seule réservation à la fois. Veuillez effectuer une réservation à nouveau.";
                            } else {
                                console.log('on peut continuer à chercher un beau et grand vélo');
                                console.log(infos);
                                console.log("velos: ", station.available_bikes);
                                sessionStorage.setItem('station_info', JSON.stringify(infos));
                            }
                    } else {
                        console.log(infos);
                        console.log("velos: ", station.available_bikes);
                        sessionStorage.setItem('station_info', JSON.stringify(infos));
                    }
                });

                // DEBUT RESERVATION
                // INITIALISATION SIGNATURE
                var canvas = document.getElementById("signature").querySelector("canvas");
                var signaturePad = new SignaturePad(canvas);

                // BOUTON EFFACER
                $("#effacer").click(function (e) {
                    if (signaturePad.isEmpty()) {
                        // Signature vide
                        document.getElementById('erreur-signature').style.display = "block"; // affiche erreur
                        document.getElementById("erreur-signature").innerHTML = "Aucune signature n'a été trouvée. Suppression impossible.";
                    } else {
                        document.getElementById('erreur-signature').style.display = "none"; // cache le message d'erreur s'il y a
                        signaturePad.clear();
                    }
                });

                // BOUTON RESERVER
                $("#reserver").click(function (e) {
                    var resultInfos = JSON.parse(sessionStorage.getItem("station_info"));

                    if (resultInfos.status === "CLOSED") {
                        // GLITCH STATION EN PASSANT PAR UNE STATION OUVERTE
                        document.getElementById('erreur-signature').style.display = "block"; // affiche erreur
                        document.getElementById("erreur-signature").innerHTML = "Cette station est fermée. Vous ne pouvez pas y réserver de vélo";
                        document.getElementById('signature').style.display = "none";
                    } else {
                        document.getElementById('erreur-signature').style.display = "none";
                        document.getElementById('signature').style.display = "block";
                    }
                });

                // BOUTON VALIDER
                $("#valider").click(function (e) {
                    // DECODE / DECOMPILE DE MON TABLEAU JSON
                    var resultInfos = JSON.parse(sessionStorage.getItem("station_info"));

                    // La station est ouverte
                    if (resultInfos.status === "OPEN" && resultInfos.status !== null) {
                        if (signaturePad.isEmpty()) {
                            // SIGNATURE VIDE = AFFICHAGE DU BLOCK
                            document.getElementById('erreur-signature').style.display = "block";
                            // ERREUR DE SIGNATURE
                            document.getElementById("erreur-signature").innerHTML = "Vous devez signer le formulaire afin de valider la réservation.";
                        } else {
                            // VELOS DANS LA STATION
                            if (resultInfos.dispo > 0) {

                                //MAJ DU TEMPS DE RESERVATION + DES DISPOS VELOS - 1
                                resultInfos.temps = temps_reservation;
                                resultInfos.dispo = resultInfos.dispo -= 1;

                                sessionStorage.setItem("station_info", JSON.stringify(resultInfos));
                                document.getElementById('details').style.display = "none";
                                signaturePad.clear();
                            } else {
                                // PAS DE VELO DANS LA STATION
                                document.getElementById('erreur-signature').style.display = "block"; // affiche erreur
                                document.getElementById("erreur-signature").innerHTML = "Il n'y a aucun vélo disponible dans cette station !";
                            }
                        }
                    } else {
                        // STATION FERMEE
                        document.getElementById('erreur-signature').style.display = "block"; // affiche erreur
                        document.getElementById("erreur-signature").innerHTML = "Nous sommes désolés mais cette station est fermée !";
                    }
                });
            });

            // AFFICHAGE OU NON DE LA RESERVATION
            function displayReservation() {

                // Decode / decompile de mon tableau Json
                var resultInfos = JSON.parse(sessionStorage.getItem("station_info"));

                // PAS DE RESERVATION
                if (resultInfos === null || resultInfos.temps === null) {
                    $("#etat-reservation").html("Vous n'avez pas encore de réservation active.");

                // EXPIRATION RESERVATION
                } else if (resultInfos.temps <= 0) {
                    // Destruction sessionStorage
                    sessionStorage.removeItem('station_info');

                } else {
                    // RESERVATION EN COURS
                    var restant = Number(resultInfos.temps);

                    resultInfos.temps = restant -= 1;
                    // Mise à jour sessionStorage avec le bon timer
                    sessionStorage.setItem('station_info', JSON.stringify(resultInfos));
                    $("#etat-reservation").html(" Votre <span class='bleu'>V'lib</span> est bien réservé à la station : <span id='stationcouleur'>" + resultInfos.station + "</span>," + "<br />pendant encore <span id='timercouleur'>" + Math.floor(restant/60) + " minutes et " + (restant%60) + " secondes</span>.");
                }

            }
            //  FIN RESERVATION

            // Check toutes les 1 seconde ( 1000 millisecondes )
            setInterval(displayReservation, 1000);

            // AFFICHAGE CLUSTERER POUR ZOOMER LA MAP
            var markerCluster = new MarkerClusterer(map, markers, {
                imagePath: "./images/markerclusterer/m"
            });
        });
}

function onClickClose() {
   // Bloc détails caché
   document.getElementById('details').style.display = "none";
   // Partie signature cachée
   document.getElementById('signature').style.display = "none";
   // Partie Erreur signature cachée
   document.getElementById('erreur-signature').style.display = "none";
   // On redéfini la signature pour la supprimer / effacer
   var signature = document.getElementById("signature").querySelector("canvas");
   var signaturePad = new SignaturePad(signature);
   signaturePad.clear();
}