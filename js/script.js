$(document).ready(function(){


// Settiamo moment in italiano
moment.locale('it');

// Settiamo il valore di select su "Gennaio"
$("select#month-select").val("01");
var valoreSelect = $("select#month-select").val();

// Creiamo un evento al click su "next" che aumenta il valore di mese nella select
$(".fa-chevron-right").click(function(){
  if(valoreSelect != "12") {
    valoreSelect = 1 + parseInt(valoreSelect);
    if(valoreSelect < 10) {
      valoreSelect = "0" + valoreSelect;
    }
  }
  $("select#month-select").val(valoreSelect);
  $("ul#days").empty();
  stampaMese(valoreSelect);
});

// Creiamo un evento al click su "prev" che diminuisce il valore di mese nella select
$(".fa-chevron-left").click(function(){
  if(valoreSelect != "01") {
    valoreSelect = parseInt(valoreSelect) - 1;
    if(valoreSelect < 10) {
      valoreSelect = "0" + valoreSelect;
    }
  }
  $("select#month-select").val(valoreSelect);
  $("ul#days").empty();
  stampaMese(valoreSelect);
});

// In mase al change del valore della select, visualizziamo il mese scelto nelle options
$("select#month-select").change(function(){
  valoreSelect = $(this).val();
  $("ul#days").empty();
  stampaMese(valoreSelect);
});

// Stampiamo il mese in base al valore di select cliccato
stampaMese(valoreSelect);

// FUNZIONE di visualizzazzione mese
function stampaMese(meseScelto) {
  // Stabiliamo qual è la data iniziale
  var dataIniziale = moment('2018-'+meseScelto+'-01');
  var giorno = dataIniziale.format("D");
  var mese = dataIniziale.format("M");
  var anno = dataIniziale.format("YYYY");
  var giorniMese = dataIniziale.daysInMonth();

  // Appendiamo mese e anno in pagina
  $("h1#mese").text(dataIniziale.format("MMMM"));
  $("h3#anno").text(anno);

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
  // Mettiamo l'API in una variabile
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
          // Se il giorno è una festività, lo coloriamo di rosso e scriviamo la festività
          if(thisDate == dataVacanze) {
            $(this).addClass("red");
            $(this).find(".holiday").text("- " + vacanza);
          }
        });
      }
    },
    "error": function(err) {
      alert("Errore!");
    }
  });

$("#days .single-day").each(function(){
  var thisDate = $(this).attr("data-thisdate");
  if(moment(thisDate).weekday() == "6" && $(this).hasClass("red")) {
    $(this).addClass("underline");
  } else if (moment(thisDate).weekday() == "6" && !$(this).hasClass("red")) {
    $(this).addClass("blue underline");
  }
});



}



});
