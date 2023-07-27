//création de champs pour chaque intervenants
const containerAll = document.querySelector(".intervenants");
const nbInterv = document.getElementById("nbInterv");
let containers = [];
nbInterv.addEventListener("change", () => {
    for (let i = 0; i < nbInterv.value; i++) {
        if (document.querySelector(".intervenant" + i) === null) {
            let newInterv =
                `<div class="intervenant` +
                i +
                ` intervContainer">
            <h3>Intervenant n°` +
                (i + 1) +
                `</h3>
            <div>
                <label for="nom` +
                i +
                `">Prénom - Nom:</label>
                <input type="text" name="nom` +
                i +
                `" id="nom` +
                i +
                `" placeholder="Arthur">
            </div>
            <div>
                <label for="linknom` +
                i +
                `">Lien vers la fiche annuaire :</label>
                <input type="text" name="linknom` +
                i +
                `" id="linknom` +
                i +
                `" placeholder="https://annuaire.fr/page-">
            </div>
            <div>
                <label for="fonction` +
                i +
                `">Fonction et département :</label>
                <textarea name="fonction` +
                i +
                `" id="fonction` +
                i +
                `" cols="30" rows="10"></textarea>
            </div>
            </div>`;
            containerAll.innerHTML += newInterv;

            let newIntervView =
                `<div style="text-align: center; width: 33%;"><img src="http://besombes.butmmi.o2switch.site/rdv_data_dsos/icon.svg" alt="" />
            <p><strong> <a href="" id="view-linknom` +
                i +
                `"><span id="view-nom` +
                i +
                `"></span id="view-nom1"></a></strong><br /><span id="view-fonction` +
                i +
                `"></span></p>
            </div>`;
            document.querySelector("#intervenants").outerHTML += newIntervView;
            document
                .querySelector("#nom" + i)
                .addEventListener("keyup", modifField);
            document
                .querySelector("#nom" + i)
                .addEventListener("change", modifField);
        }
    }
    //masquage et affichage des champs dans le formulaire
    document
        .querySelectorAll(".intervContainer")
        .forEach((container, index) => {
            //masquage des champs en trop
            if (index >= nbInterv.value) {
                container.style.display = "none";
            }
            //réafichage les champs en plus
            if (index < nbInterv.value) {
                container.style.display = "block";
            }
        });
    //masquage et affichage des éléments dans le corps du mail
    document
        .querySelectorAll("#intervenants div")
        .forEach((container, index) => {
            //masquage des éléments en trop
            if (index >= nbInterv.value) {
                container.style.display = "none";
            }
            //réafichage les champs en plus
            if (index < nbInterv.value) {
                container.style.display = "block";
            }
        });
});

testId = (id) => {
    let debut = "";
    for (let i = 0; i < 4; i++) {
        debut += id[i];
    }
    if (debut === "link") {
        return true;
    } else {
        return false;
    }
};

modifField = (e) => {
    modifTemplate(e.target.id);
    if (e.target.id === "nom1") {
        console.log("ça appele la fonction");
    }
};

modifFields = () => {
    document.querySelectorAll(".event-target").forEach((field) => {
        modifTemplate(field.id);
    });
};

modifTemplate = (id) => {
    /* e.preventDefault(); */ /* 
    console.log(id); */
    let valeur = document.getElementById(id).value;
    let stringAdd = valeur;

    //cas particuliers :
    //date
    if (id === "date") {
        let date = valeur.split("-");
        const month = [
            "janvier",
            "février",
            "mars",
            "avril",
            "mai",
            "juin",
            "juillet",
            "août",
            "septembre",
            "octobre",
            "novembre",
            "décembre",
        ];
        stringAdd = date[2] + " " + month[date[1] - 1] + " " + date[0];
    }
    //heures
    if (id === "hstart" || id === "hend") {
        stringAdd = valeur.replace(":", "h");
    }
    //liens
    if (testId(id)) {
        document.getElementById("view-" + id).href = valeur;
    } else {
        document.querySelector("#view-" + id).innerHTML = stringAdd;
    }
};

window.addEventListener("load", modifFields);
//récupération des valeurs des champs au clique du bouton
document.querySelectorAll(".event-target").forEach((input) => {
    input.addEventListener("keyup", modifField);
    input.addEventListener("change", modifField);
});

//bouton copier
/* let editor = document.querySelector(".view");
let button = document.querySelector("button");

button.addEventListener("click", () => {
    navigator.clipboard.writeText(editor);
    button.innerText = "Copié !";
});
 */
