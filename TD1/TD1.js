const fs = require("fs");
let rawdata = fs.readFileSync("users.json");
let tab=JSON.parse(rawdata);

function affichage_pays(objet)
{
    let result;
    let id=1;
    let compteur=0;
    
    while(id<tab.length)
    {
        if(objet==tab[id].country)
        {
            compteur=compteur+1;
        }
        id=id+1;
    }

    result={req:objet, users:compteur};
    return result;
}

function affichage_societe(objet)
{
    let result;
    let id=1;
    let compteur=0;
    
    while(id<tab.length)
    {
        if(objet==tab[id].company)
        {
            compteur=compteur+1;
        }
        id=id+1;
    }

    result={req:objet, users:compteur};
    return result;
}

function printObject(tableau)
{
    for(let item of tableau)
    {
        console.log(item);
    }
}

function recup(requete)
{
    let sent;
    let id=1;
    let afficheur=[];
    let test=0;

    if(requete==1)
    {
        while(id<tab.length)
        {
            sent=tab[id].country;
            for(let i=1;i<afficheur.length;i++)
            {
                if(afficheur[i].req==sent)
                {
                    test=1;
                }
            }
            if(test==0)
            {
                afficheur.push(affichage_pays(sent));
            }
            id=id+1;
            test=0;
        }
    }
    else if(requete==2)
    {
        while(id<tab.length)
        {
            sent=tab[id].company;
            for(let i=1;i<afficheur.length;i++)
            {
                if(afficheur[i].req==sent)
                {
                    test=1;
                }
            }
            if(test==0)
            {
                afficheur.push(affichage_societe(sent));
            }
            id=id+1;
            test=0;
        }
    }
    else
    {
        console.log("ERREUR");
    }
    afficheur.sort((un,deux)=>deux["users"]-un["users"]);
    printObject(afficheur);
}

recup(1);
console.log("\n");
recup(2);