// VARIABLES MOCKUP
    const mockupDiv = $("#mockup-images");
    const mockupSection = $("#mockup");

    // Tableau contenant le Mockups / 3 images explicatives
    const listeMockups = [
        {texteMockup: "<div id=\"texteMockup1\"><h3><span class='bleu'>Sélectionnez</span> une station</h3></div>", imageMockup:"./images/diapo/diapo1.jpg"},
        {texteMockup: "<div id=\"texteMockup2\"><ul><li><span class='bleu'>Cliquez</span> sur le bouton \"Réserver\".</li><li><span class='bleu'>Signez</span> (Pensez à signer votre réservation !).</li><li><span class='bleu'>Validez</span>.</li></ul></div>", imageMockup: "./images/diapo/diapo2.jpg"},
        {texteMockup: "<div id=\"texteMockup3\"><p>Votre réservation est affichée en bas de cette page!</p></div>", imageMockup: "./images/diapo/diapo3.jpg"}];

    // Index dans listeMockups
    var i = 0;


// On appelle le slider / Mockup pour les explications au visiteur
Mockup.initMockup(i);

// VARIABLES SIGNATURES
//window.addEventListener("DOMContentLoaded", function(){
//    new Canvas(document.getElementById("canvas"), 4, false, document.getElementById("canvas").getContext("2d"), canvas.getBoundingClientRect().y, canvas.getBoundingClientRect().x);
//});

// EVENTS

    // MOCKUP //
        // Clique bouton slide
        $("#suivMockup").on("click", Mockup.slideSuivant);
        $("#precMockup").on("click", Mockup.slidePrecedent);

        // Flèches du clavier event.keyCode === '37' est deprecated donc on remplace la fonction
        window.addEventListener("keydown", function(event) {
            if (event.key === 'ArrowLeft') {
                Mockup.slidePrecedent();
            } else if (event.key === 'ArrowRight') {
                Mockup.slideSuivant();
            }
        });
    // MOCKUP FIN

