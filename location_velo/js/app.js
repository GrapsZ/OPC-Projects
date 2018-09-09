// ORIENTE OBJET

const displayReservation = () => {

    // Decode / decompile de mon tableau Json
    const resultInfos = JSON.parse(sessionStorage.getItem("station_info"));

    // PAS DE RESERVATION
    if (resultInfos === null || resultInfos.temps === null) {
        $("#etat-reservation").html("Vous n'avez pas encore de réservation active.");

        // EXPIRATION RESERVATION
    } else if (resultInfos.temps <= 0) {
        // Destruction sessionStorage
        sessionStorage.removeItem('station_info');

    } else {
        // RESERVATION EN COURS
        const restant = Number(resultInfos.temps);

        resultInfos.temps = restant - 1;
        // Mise à jour sessionStorage avec le bon timer
        sessionStorage.setItem('station_info', JSON.stringify(resultInfos));
        $("#etat-reservation").html(" Votre <span class='bleu'>V'lib</span> est bien réservé à la station : <span id='stationcouleur'>" + resultInfos.station + "</span>," + "<br />pendant encore <span id='timercouleur'>" + Math.floor(restant/60) + " minutes et " + (restant%60) + " secondes</span>.");
    }

};

function initMap() {
    document.getElementById('details').style.display = "none";
    const google = new GoogleMap();

    //var stations = jcDecaux.getStationsByContract();
    ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=" + ville + "&apiKey=56b77c204faa8c1947186ef3e80af8c817f4cc72", function(response) {
        const map = google.initializeMap();
        google.addMarkers(response, map);

        setInterval(displayReservation, 1000);

        // Check toutes les 1 seconde ( 1000 millisecondes )
    });
}


const canvas = document.getElementById("signature").querySelector("canvas");
const signaturePad = new SignaturePad(canvas);

const onClickClose = () => { // EcmaScript 6
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
};

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
    const resultInfos = JSON.parse(sessionStorage.getItem("station_info"));

    if (resultInfos) {
        if (resultInfos.status === "CLOSED") {
            // GLITCH STATION EN PASSANT PAR UNE STATION OUVERTE
            document.getElementById('erreur-signature').style.display = "block"; // affiche erreur
            document.getElementById("erreur-signature").innerHTML = "Cette station est fermée. Vous ne pouvez pas y réserver de vélo";
            document.getElementById('signature').style.display = "none";
        } else {
            document.getElementById('erreur-signature').style.display = "none";
            document.getElementById('signature').style.display = "block";
        }
    } else {
        document.getElementById('erreur-signature').style.display = "none";
        document.getElementById('signature').style.display = "block";
    }
});

// BOUTON VALIDER
$("#valider").click(function (e) {
    // DECODE / DECOMPILE DE MON TABLEAU JSON
    const resultInfos = JSON.parse(sessionStorage.getItem("station_info"));

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