//initialisation de quill
var options = {
    value: "Compose an epic...",
    theme: "snow",
};
var editor = new Quill("#editor", options);

//création de champs pour chaque intervenants
modifNbInterv = () => {
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
                `" value="Aubin Sahalor">
            </div>
            <div>
                <label for="linknom` +
                i +
                `">Lien vers la fiche annuaire :</label>
                <input type="text" name="linknom` +
                i +
                `" id="linknom` +
                i +
                `" value="https://pagespro.univ-gustave-eiffel.fr/">
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
            document.querySelector("#intervenants").innerHTML += newIntervView;
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
                document
                    .querySelector("#nom" + index)
                    .addEventListener("keyup", modifField);
                document
                    .querySelector("#nom" + index)
                    .addEventListener("change", modifField);
                document
                    .querySelector("#linknom" + index)
                    .addEventListener("keyup", modifField);
                document
                    .querySelector("#linknom" + index)
                    .addEventListener("change", modifField);
                document
                    .querySelector("#fonction" + index)
                    .addEventListener("keyup", modifField);
                document
                    .querySelector("#fonction" + index)
                    .addEventListener("change", modifField);
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
};
const containerAll = document.querySelector(".intervenants");
const nbInterv = document.getElementById("nbInterv");
nbInterv.addEventListener("change", modifNbInterv);

modifField = (e) => {
    modifTemplate(e.target.id);
};

modifFields = () => {
    modifNbInterv();
    document
        .querySelectorAll(".intervenant input,textarea")
        .forEach((element) => {
            element.dispatchEvent(new KeyboardEvent("keyup", { key: "" }));
        });
    document.querySelectorAll(".event-target").forEach((field) => {
        modifTemplate(field.id);
    });
};

modifTemplate = (id) => {
    let valeur;
    if (id == "") {
        valeur = document.querySelector("#editor .ql-editor").innerHTML;
    } else {
        valeur = document.getElementById(id).value;
    }

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
    if (id.substring(0, 4) === "link") {
        document.getElementById("view-" + id).href = valeur;
    }
    //images
    else if (id.substring(0, 3) === "img") {
        document.getElementById("view-" + id).src = valeur;
    }
    //quill editor
    else if (id === "") {
        document.getElementById("view-editor").innerHTML = valeur;
    }
    //cas général
    else {
        document.querySelector("#view-" + id).innerHTML = stringAdd;
    }
};

window.addEventListener("load", modifFields);
//récupération des valeurs des champs à chaque changement
document.querySelectorAll(".event-target").forEach((input) => {
    input.addEventListener("keyup", modifField);
    input.addEventListener("change", modifField);
});
document.getElementById("editor").addEventListener("keyup", modifField);
document.getElementById("editor").addEventListener("click", modifField);

//bouton copier
let view = document.querySelector(".view");
let button = document.querySelector(".copy-button");

button.addEventListener("click", () => {
    console.log("ça copie");
    navigator.clipboard.writeText(view.innerHTML);
    button.innerText = "Copié !";
});
