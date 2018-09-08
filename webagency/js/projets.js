$(document).ready(function() {

    $('#conteneur-portfolio li').click(function (e) { // Au clic sur l'une de mes "li" dans ma catégorie de boutons où j'ai donné l'id conteneur-portfolio
        const elementClicked = this; // Je récupère l'élément cliqué
        const allProjects = document.getElementById('conteneur-portfolio-images').getElementsByTagName("div"); // Je récupère toutes mes réalisations
        if(elementClicked.id == 'all') { // Si mon bouton cliqué pour filtrer a l'id all, donc id="all"
            var i;
            for (i = 0; i < allProjects.length; i++) { // Je parcours tous mes projets 
                allProjects[i].classList.add('active'); // Je les met tous en actifs vu qu'on les veut tous ici, on vient de cliquer "all"
            }
        }
        else if (elementClicked.id == 'creative') { // Sinon si mon bouton cliqué a l'id 'tma' donc id="tma" dans mon fichier HTML
            const creativeProjects = document.getElementById('conteneur-portfolio-images').getElementsByClassName("creative"); // Je récupère tous mes projets avec la class = CREATIVE
            var i;
            for (i = 0; i < allProjects.length; i++) { // Je parcours tous ces projets avec la class="tma"
                allProjects[i].classList.remove('active'); // Je retire tous les projets de la classe active pour ne réactiver ensuite que ceux qui font partie de class="CREATIVE"
            }

            var y;
            for (y = 0; y < creativeProjects.length; y++) {
                creativeProjects[y].classList.add('active'); // Et là je n'ajoute la classe active que aux projets qui ont la classe "CREATIVE", puisque c'est eux que je veux activer
            }
        }
        else if (elementClicked.id == 'corporate') { // Je refais pareil qu'avec CREATIVE pour tous mes autres boutons
            const corporateProjects = document.getElementById('conteneur-portfolio-images').getElementsByClassName("corporate");
            var i;
            for (i = 0; i < allProjects.length; i++) {
                allProjects[i].classList.remove('active');
            }

            var y;
            for (y = 0; y < corporateProjects.length; y++) {
                corporateProjects[y].classList.add('active');
            }
        }
        else if (elementClicked.id == 'portofolio') {
            const portofolioProjects = document.getElementById('conteneur-portfolio-images').getElementsByClassName("portofolio");
            var i;
            for (i = 0; i < allProjects.length; i++) {
                allProjects[i].classList.remove('active');
            }

            var y;
            for (y = 0; y < portofolioProjects.length; y++) {
                portofolioProjects[y].classList.add('active');
            }
        }
    });
});