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
        }
    }
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
});

modifTemplate = (e) => {
    e.preventDefault();
    let stringAdd = e.target.value;

    //cas particuliers :
    //date
    if (e.target.id === "date") {
        let date = e.target.value.split("-");
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
    else if (e.target.id === "hstart" || e.target.id === "hend") {
        stringAdd = e.target.value.replace(":", "h");
    }
    //liens
    else if (e.target.id === "linknom") {
    }
    document.querySelector("#view-" + e.target.id).innerHTML = stringAdd;
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
    /* console.log(editor); */
    /* editor.select(); */
    navigator.clipboard.writeText(editor);
    button.innerText = "Copié !";
});
