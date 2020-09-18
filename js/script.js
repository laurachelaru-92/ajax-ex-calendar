$(document).ready(function(){


// Settiamo moment in italiano
moment.locale('it');

// Stabiliamo qual è la data iniziale
var dataIniziale = moment('2018-12-07');
var giorno = dataIniziale.format("D");
var mese = dataIniziale.format("M");
var anno = dataIniziale.format("YYYY");
var giorniMese = dataIniziale.daysInMonth();

// Appendiamo mese e anno in pagina
$("h1#mese").text(dataIniziale.format("MMMM"));
$("h2#anno").text(anno);

// Prendiamo il template di handlebars
var source = $("#day-template").html();
var template = Handlebars.compile(source);

// Scriviamo il giorno e il mese in base a dataIniziale
for( var i = giorno; i <= giorniMese; i++) {
  var contenuto = {
    "data-template": dataIniziale.format("YYYY-MM-DD"),
    "day": dataIniziale.format("DD"),
    "month": dataIniziale.format('MMMM')
  }
  // Appendiamo ogni giorno del mese in #days
  $("#days").append(template(contenuto));
  // Aggiungiamo 1 giorno alla data iniziale
  dataIniziale.add(1, "days");
}

// CHIAMATA AJAX
// Mettiamo l'API in una variabile, settato su gennaio
var endpoint = "https://flynn.boolean.careers/exercises/api/holidays?year="+anno+"&month="+(mese-1);

// Chiamata all'API delle festività
$.ajax({
  "url": endpoint,
  "method": "GET",
  "success": function(data) {
    var risultati = data.response;
    // Cicliamo nell'array "risultati"
    for(var i = 0; i < risultati.length; i++) {
      var dataVacanze = risultati[i].date;  // Scriviamo la la data in una variabile
      var vacanza = risultati[i].name;      // Scriviamo il nome della festività in una variabile
      // Guardiamo nell'elenco dei giorni appesi in #days
      $("#days .single-day").each(function(){
        // Metiamo l'attributo della data in formato YYYY-MM-DD in una variabile
        var thisDate = $(this).attr("data-thisdate");
        // Se dataVacanze coincide con una delle date in #days...
        if(dataVacanze == thisDate) {
          // ...scriviamo il nome della festività in .holiday
          $(this).find(".holiday").text(" - " + vacanza);
          $(this).addClass("red");
        }
      });
    }
  },
  "error": function(err) {
    alert("Errore!");
  }
});

});
