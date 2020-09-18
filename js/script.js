$(document).ready(function(){

// Mettiamo l'API in una variabile, settato su gennaio
var endpoint = "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0";

$.ajax({
  "url": endpoint,
  // "data": function(){},
  "method": "GET",
  "success": function(data) {
    var risultati = data.response;
    for(var i = 0; i < risultati.length; i++) {
      for(var k in risultati[i]) {
        console.log(k + ": " + risultati[i][k]);
      }
    }
  },
  "error": function(err) {
    alert("Errore!");
  }
});

});
