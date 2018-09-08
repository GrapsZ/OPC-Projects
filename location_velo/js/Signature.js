class Signature
{
    constructor() {
        this.sessionKey = 'station_info';
    }

    initializeSignature(station) {
        const resultInfos = this.getStationReservedInformation();
        const infos = {
            station: station.name,
            status: station.status,
            dispo: station.available_bikes,
            temps: null
        };
        console.log(resultInfos);
        if (this.isReservationExist()) {
            if (resultInfos.temps !== null) {
                sessionStorage.clear();
                this.setStationReservedInformation(infos);
                document.getElementById('erreur-signature').style.display = "block"; // affiche erreur
                document.getElementById("erreur-signature").innerHTML = "Une seule réservation à la fois. Veuillez effectuer une réservation à nouveau.";
            } else {
                console.log('on peut continuer à chercher un beau et grand vélo');
                this.setStationReservedInformation(infos);
            }
        } else {
            this.setStationReservedInformation(infos);
        }
    }

    isReservationExist() {
        return sessionStorage.getItem('station_info');
    }

    getStationReservedInformation() {
        return JSON.parse(sessionStorage.getItem('station_info'));
    }

    setStationReservedInformation(infos) {
        console.log('writeit');
        console.log(infos);
        sessionStorage.setItem('station_info', JSON.stringify(infos));
    }

}