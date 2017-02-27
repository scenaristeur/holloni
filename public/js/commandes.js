/* COMMANDES utilisables depuis l'interface HOLLONI V1
Reportez vos bugs et proposez vos modifications sur le repository : https://github.com/scenaristeur/holloni/tree/master/public/js

                                                          ////////////////
                                                          // COMMANDES //
                                                          //////////////


LES COMMANDES commencent toutes par un slash "/" :

/help : ouvre une nouvelle page vers cette aide
/repo : ouvre une nouvelle page vers le code source hébergé sur github
/test : affiche une ligne de test
/clear: vide le bloc des messages
















*/

                                                          //////////////////////////////
                                                          // SWITCHEUR DE COMMANDES  //
                                                          ////////////////////////////

var commandes = function(commande, params){
    if ( params.length == 0 ){
      params = "messages"; // par défaut les commandes sont appliquées au div "messages"
    }
    console.log(commande);
    console.log(params);

    try{
      switch (commande) {
        case "help":
          openBlank();
          break;
        case "repo":
          openBlank("https://github.com/scenaristeur/holloni");
          break;
        case "clear":
          document.getElementById(params).innerHTML = "";
          break;
        case "test":
          LOG("test simple envoyé par l'interface de commande",undefined,undefined);
          break;
        case "valeurN":

        break;
        default:
          commandNotFound(commande,params);
          break;
      }
    }
    catch (e){
        commandNotFound(commande,params);
        LOG(e.message,undefined,"ERREUR");
    }
}


                                          ///////////////
                                          // FONCTIONS //
                                          //////////////


var commandNotFound = function(commande,params){
  LOG("______________________________",undefined,"ERREUR");
  LOG("Vous pouvez afficher l'aide sur les commandes en tapant ' /help '",undefined,"ERREUR");
  LOG("Je n'ai pas compris la commande : ' /"+ commande+" ' combinée avec les paramètres : ' "+params+" '",undefined,"ERREUR");
  LOG("______________________________",undefined,"ERREUR");
}

var openBlank = function(page ="http://"+window.document.location.host+"/js/commandes.js"){
  window.open(page, '_blank');
}

var LOG = function(message, divDestId = "messages", severite = "INFO"){
  var messageLine = document.createElement("LI");
  var u = document.createElement("U");
  var s = document.createTextNode(severite+" : ");
  var t = document.createTextNode(message);
  u.appendChild(s);
  messageLine.appendChild(u);
  messageLine.appendChild(t);
  var list = document.getElementById(divDestId)
  list.insertBefore(messageLine, list.childNodes[0]);
}
