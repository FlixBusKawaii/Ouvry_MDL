//On importe les différents modules et le tableau JSON
const fs = require("fs");
const readline = require("readline");
let rawdata = fs.readFileSync("users.json");
let tab=JSON.parse(rawdata);
readline.emitKeypressEvents(process.stdin);

//On initialise STDIN
if(process.stdin.isTTY) process.stdin.setRawMode(true);

//Fonction permettant de renvoyer un objet contenant le pays étudié et le nombre d'utilisateur concerné
function affichage_pays(country_studied)
{
    let result;
    let id=1;
    let compteur=0;
    
    while(id<tab.length)
    {
        if(country_studied==tab[id].country)
        {
            compteur=compteur+1;
        }
        id=id+1;
    }

    result={country:country_studied, users:compteur};
    return result;
}

//Fonction permettant de renvoyer un objet contenant l'entreprise étudié et le nombre d'utilisateur concerné
function affichage_societe(company_studied)
{
    let result;
    let id=1;
    let compteur=0;
    
    while(id<tab.length)
    {
        if(company_studied==tab[id].company)
        {
            compteur=compteur+1;
        }
        id=id+1;
    }

    result={company:company_studied, users:compteur};
    return result;
}

//Fonction permettant l'affichage du tableau final (de manière propre)
function printTab(tableau, requete)
{
    let message;
    let compt;
    for(let item of tableau)
    {
        if(requete==1)
        {
            compt=item.users+"";
            message=item.country+" - "+compt;
            console.log("\x1b[32m", message);
        }
        else if(requete==2)
        {
            compt=item.users+"";
            message=item.company+" - "+compt;
            console.log("\x1b[32m", message);
        }
    }
}

//Fonction permettant de créer et afficher le tableau trié contenant tout les pays ou entreprise selon le choix de l'utilisateur
function recup(requete)
{
    let val_test;
    let id=1;
    let afficheur=[];
    let bool_test=0;

    if(requete==1)
    {
        while(id<tab.length)
        {
            val_test=tab[id].country;
            for(let i=0;i<afficheur.length;i++)
            {
                if(afficheur[i].country==val_test)
                {
                    bool_test=1;
                }
            }
            if(bool_test==0)
            {
                afficheur.push(affichage_pays(val_test));
            }
            id=id+1;
            bool_test=0;
        }
    }
    else if(requete==2)
    {
        while(id<tab.length)
        {
            val_test=tab[id].company;
            for(let i=0;i<afficheur.length;i++)
            {
                if(afficheur[i].company==val_test)
                {
                    bool_test=1;
                }
            }
            if(bool_test==0)
            {
                afficheur.push(affichage_societe(val_test));
            }
            id=id+1;
            bool_test=0;
        }
    }
    else
    {
        console.log("ERREUR");
    }
    afficheur.sort((un,deux)=>deux["users"]-un["users"]);
    printTab(afficheur, requete);
}

//Fonction permettant d'afficher le menu est initialisé l'attente de commande utilisateur
function menu()
{
    console.log("\x1b[33m%s\x1b[1m", "Press 1 => Countries");
    console.log("\x1b[36m%s\x1b[1m", "Press 2 => Companies");
    console.log("\x1b[90m%s\x1b[1m", "Press 0 => Exit code");
    process.stdin.on("keypress", (str, key) => 
    {
        if(key.name=="1")
        {
            console.log("\x1b[0m", "\n");
            recup(1);
            console.log("\x1b[0m", "\n");
            console.log("\x1b[33m%s\x1b[1m", "Press 1 => Countries");
            console.log("\x1b[36m%s\x1b[1m", "Press 2 => Companies");
            console.log("\x1b[90m%s\x1b[1m", "Press 0 => Exit code");
        }
        if(key.name=="2")
        {
            console.log("\x1b[0m", "\n");
            recup(2);
            console.log("\x1b[0m", "\n");
            console.log("\x1b[33m%s\x1b[1m", "Press 1 => Countries");
            console.log("\x1b[36m%s\x1b[1m", "Press 2 => Companies");
            console.log("\x1b[90m%s\x1b[1m", "Press 0 => Exit code");
        }
        if(key.name=="0")
        {
            console.log("\x1b[0m", "\n");
            process.exit();
        }
    });
}

menu();