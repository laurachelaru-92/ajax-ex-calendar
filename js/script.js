$(document).ready(function(){


// Settiamo moment in italiano
moment.locale('it');
// Stabiliamo qual è la data iniziale
var dataIniziale = moment('2018-04-01');
var mese = dataIniziale.format("M");
var anno = dataIniziale.format("YYYY");

// Appendiamo mese e anno in pagina
$("h1#mese").text(dataIniziale.format("MMMM"));
$("h2#anno").text(anno);

// Mettiamo l'API in una variabile, settato su gennaio
var endpoint = "https://flynn.boolean.careers/exercises/api/holidays?year="+anno+"&month="+mese;

// Prendiamo il template di handlebars
var source = $("#day-template").html();
var template = Handlebars.compile(source);

// Scriviamo il giorno e il mese in base a dataIniziale
for( var i = 0; i < dataIniziale.daysInMonth(); i++) {
  var contenuto = {
    "data-template": dataIniziale.format("YYYY-MM-DD"),
    "day": dataIniziale.format("DD"),
    "month": dataIniziale.format('MMMM')
  }
  $("#days").append(template(contenuto));
  dataIniziale.add(1, "days");
}

// Chiamata all'API delle festività
$.ajax({
  "url": endpoint,
  "method": "GET",
  "success": function(data) {
    var risultati = data.response;
    // Cicliamo nell'array "risultati"
    for(var i = 0; i < risultati.length; i++) {
      var dataVacanze = risultati[i].date;
      console.log(dataVacanze);
      var vacanza = risultati[i].name;
      console.log(vacanza);
    }
  },
  "error": function(err) {
    alert("Errore!");
  }
});

});
