const Mockup = {
    texteMockup: ``,
    imageMockup: "",
    // Mise en place du mockup
    initMockup: function (i) {
        this.texteMockup = listeMockups[i].texteMockup;
        this.imageMockup = listeMockups[i].imageMockup;
        this.afficherMockup();
    },
    
    // Affiche l'image actuelle au chargement de la page sur le html
    afficherMockup: function () {
        mockupDiv.css("background-image", `url(${this.imageMockup})`);
        mockupDiv.html(`${this.texteMockup}`);
    },
    
    // Change l'index, puis apelle initDiapo pour attribuer les nouvelles valeurs
    slideSuivant: function () {
        mockupSection.animate({opacity: 0}, 1000, function () {
            if (i >= listeMockups.length - 1) {
                i = 0;
                Mockup.initMockup(i);
            } else {
                i +=1;
                Mockup.initMockup(i);
            };
            mockupSection.animate({opacity: 1}, 1000);
        })
    },
    slidePrecedent: function () {
        mockupSection.animate({opacity: 0}, 1000, function () {
        if (i <= 0) {
                i = listeMockups.length - 1;
                Mockup.initMockup(i);
            } else {
                i -= 1;
                Mockup.initMockup(i);
            };
            mockupSection.animate({opacity: 1}, 1000);
        });
    }
};




