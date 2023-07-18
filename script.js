/* import "./mail.js"; */

//création de champs pour chaque intervenants
const containerAll = document.querySelector(".intervenants");
const nbInterv = document.getElementById("nbInterv");
let containers = [];
nbInterv.addEventListener("change", () => {
    for (let i = 0; i < nbInterv.value; i++) {
        console.log(i);
        if (document.querySelector(".intervenant" + i) === null) {
            containers[i] = document.createElement("div");
            containers[i].className = "intervenant" + i;

            //création des titres
            let titres = document.createElement("h3");
            titres.innerHTML = "Intervenant n°" + (i + 1);
            containers[i].appendChild(titres);

            //création du label nom prénom
            let nomLabel = document.createElement("label");
            nomLabel.htmlFor = "nom" + i;
            nomLabel.innerHTML = "Prénom - Nom:";
            containers[i].appendChild(nomLabel);

            //création du champs nom prénom
            let nomInput = document.createElement("input");
            nomInput.type = "text";
            nomInput.name = "nom" + i;
            nomInput.id = "nom" + i;
            containers[i].appendChild(nomInput);

            //création du label fonction
            let fonctionLabel = document.createElement("label");
            fonctionLabel.htmlFor = "fonction" + i;
            fonctionLabel.innerHTML = "Fonction et département:";
            containers[i].appendChild(fonctionLabel);

            //création du champs fonction
            let fonctionInput = document.createElement("textarea");
            fonctionInput.name = "fonction" + i;
            fonctionInput.id = "fonction" + i;
            fonctionInput.cols = "30";
            fonctionInput.rows = "10";
            containers[i].appendChild(fonctionInput);

            //création du label lien
            let lienLabel = document.createElement("label");
            lienLabel.htmlFor = "linknom" + i;
            lienLabel.innerHTML = "Lien vers la fiche annuaire :";
            containers[i].appendChild(lienLabel);

            //création du champs lien
            let lienInput = document.createElement("input");
            lienInput.type = "text";
            lienInput.name = "linknom" + i;
            lienInput.id = "linknom" + i;
            containers[i].appendChild(lienInput);

            containerAll.appendChild(containers[i]);
        }
    }
    //masquage des champs en trop
    containers.forEach((container, index) => {
        if (index >= nbInterv.value) {
            container.style.display = "none";
        }
    });
});

modifTemplate = (e) => {
    e.preventDefault(); //permet de prévenir l’envoi du formulaire au serveur.???? what is that?
    console.log(e.target.id, e.target.value);

    document.querySelector("#view-" + e.target.id).innerHTML = e.target.value;
};

//récupération des valeurs des champs au clique du bouton
document.querySelectorAll("input,textarea").forEach((input) => {
    input.addEventListener("keyup", modifTemplate);
    input.addEventListener("change", modifTemplate);
});

//bouton copier
let editor = document.querySelector(".view");
let button = document.querySelector("button");

button.addEventListener("click", () => {
    console.log(editor);
    /* editor.select(); */
    navigator.clipboard.writeText(editor);
    button.innerText = "Copié !";
});
