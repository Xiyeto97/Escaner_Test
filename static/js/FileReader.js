var input = myForm.myInput;
var reader = new FileReader;
var file = "";
var nameFile=[];
var itemsCheck = new Array();
var k = 0;
var l = 0;
var loteNoEncontrado = new Array();
var lotesLimpios = new Array();
var soloLotes = new Array();
var loteCoincidio = new Array();
var lotePaquetes = [];
var lotePeso = new Array();

input.addEventListener('change', onChange);


function onChange(event) {
  file = event.target.files[0];
  console.log(event.target.files);
  nameFile=file.name.split('.');
  console.log(nameFile[0]);
try {
  //reader.readAsText(file);

  //reader.onload = onLoad;
} catch (error) {
  console.log(error);
}
 

}

function onLoad() {
  var result = reader.result; // Obtienes el texto
  // En tu ejemplo lo obtienes de una petición HTTP

  var lineas = result.split('\n');


  // o lineas.forEach(function(linea){ ... })
  // o lineas.find(function(linea){ return linea == contraseña })
  for (var linea of lineas) {
    //console.log('[linea]', linea);
    var busqueda = linea.split(' ');
    var limpio = busqueda.filter(Boolean);
    lotesLimpios.push(limpio);
    switch (limpio.length) {
      case 10:
        soloLotes.push(limpio[4]);
        break;
      case 11:
        soloLotes.push(limpio[5]);
        break;
      case 12:
        soloLotes.push(limpio[6]);
        break;

      default:
        break;
    }
    //console.log(limpio);

    //if(linea === passwordBuscar) {
    // Encontraste contraseña
    //}
    k++;
  }
  //console.log(materiales.length);
  //console.log(lotesLimpios.length);
  //console.log(lotesLimpios[0].length);
  //console.log(soloLotes);
  acomodarLotes(lotesLimpios);

  //console.log(loteNoEncontrado);

}


function acomodarLotes(lotes) {
  for (let i = 1; i < materiales.length; i++) {
    var contadorLotes = 1;
    var posicion = i;
    for (let j = 0; j < lotes.length; j++) {
      switch (lotes[j].length) {
        case 10:
          if (materiales[i][2] == lotes[j][4]) {
            loteCoincidio.push(materiales[i][2]);
            if (materiales[i][3] == lotes[j][5]) {
              //console.log(lotes[j][6]-.5);
              var loteAbajo = lotes[j][6] - .5;
              var loteArriba = (parseFloat(lotes[j][6]) + .5).toFixed(2);
              var peso = parseFloat(materiales[i][4]).toFixed(2);
              if (peso >= loteAbajo && peso <= loteArriba) {
                console.log("Lote: " + lotes[j][4] + " Paqts: " + lotes[j][5] + " Peso: " + lotes[j][6]);
                document.getElementById("resulta" + i).src="static/img/check.gif";
                $("#diferencia"+i).text('Lote Completo');

              } else {
                var resta = lotes[j][6] - materiales[i][4];
                lotePeso.push([posicion, parseFloat(resta).toFixed(2)]);
              }
            } else {
              var resta = lotes[j][6] - materiales[i][4];
              lotePaquetes.push([posicion, resta]);
            }

          } else {
            contadorLotes++;
          }

          break;
        case 11:
          if (materiales[i][2] == lotes[j][5]) {
            loteCoincidio.push(materiales[i][2]);
            if (materiales[i][3] == lotes[j][6]) {
              //console.log(lotes[j][6]-.5);
              var loteAbajo = lotes[j][7] - .5;
              var loteArriba = (parseFloat(lotes[j][7]) + .5).toFixed(2);
              var peso = parseFloat(materiales[i][4]).toFixed(2);
              if (peso >= loteAbajo && peso <= loteArriba) {
                console.log("Lote: " + lotes[j][5] + " Paqts: " + lotes[j][6] + " Peso: " + lotes[j][7]);
                document.getElementById("resulta" + i).src="static/img/check.gif";
                $("#diferencia"+i).text('Lote Completo');

              } else {
                var resta = lotes[j][7] - materiales[i][4];
                lotePeso.push([posicion, parseFloat(resta).toFixed(2)]);
              }
            } else {
              var resta = lotes[j][7] - materiales[i][4];
              lotePaquetes.push([posicion, resta]);
            }

          } else {
            contadorLotes++;
          }
          
          break;
        case 12:
          if (materiales[i][2] == lotes[j][6]) {
            loteCoincidio.push(materiales[i][2]);
            if (materiales[i][3] == lotes[j][7]) {
              //console.log(lotes[j][6]-.5);
              var loteAbajo = lotes[j][8] - .5;
              var loteArriba = (parseFloat(lotes[j][8]) + .5).toFixed(2);
              var peso = parseFloat(materiales[i][4]).toFixed(2);
              if (peso >= loteAbajo && peso <= loteArriba) {
                console.log("Lote: " + lotes[j][6] + " Paqts: " + lotes[j][7] + " Peso: " + lotes[j][8]);
                document.getElementById("resulta" + i).src="static/img/check.gif";
                $("#diferencia"+i).text('Lote Completo');

              } else {
                var resta = lotes[j][8] - materiales[i][4];
                lotePeso.push([posicion, parseFloat(resta).toFixed(2)]);
              }
            } else {
              var resta = lotes[j][8] - materiales[i][4];
              lotePaquetes.push([posicion, resta]);
            }

          } else {
            contadorLotes++;
          }
          
          break;

        default:
          break;
      }

    }
    if (contadorLotes == lotes.length) {
      document.getElementById("resulta" + i).src="static/img/no-encontro.gif";
      $("#diferencia"+i).text('Este lote no se encuentra en la remision ' + materiales[posicion][2]);
    }

  }
  for (let x = 0; x < loteCoincidio.length; x++) {
    for (let y = 0; y < soloLotes.length; y++) {
      if (loteCoincidio[x] == soloLotes[y]) {
        soloLotes.splice(y, 1);
      }

    }

  }
  console.log(soloLotes);
  var impresion="";
  for (let i = 0; i < soloLotes.length; i++) {
     impresion = impresion+soloLotes[i]+"\n";
    
  }
  console.log(impresion);
  //alert(impresion);
  console.log(loteCoincidio);
  console.log(lotePaquetes);
  console.log(lotePeso);
  descontarPeso(lotePaquetes);
  limpiar();
}

function descontarPeso(lotePaquetes) {
  for (let i = 0; i < lotePaquetes.length; i++) {
    if(lotePaquetes[i][1]<0){
      var ope=lotePaquetes[i][1]*(-1);
      $("#diferencia"+lotePaquetes[i][0]).text('A este lote le sobran '+parseFloat(ope).toFixed(2)+' Kg.');
      var id=document.getElementById("resulta" + (i+1));
      id.src="static/img/wait.gif";
    }else{
      $("#diferencia"+lotePaquetes[i][0]).text('A este lote le hacen falta '+parseFloat(lotePaquetes[i][1]).toFixed(2)+' Kg.');
      
    }
    
    
  }
}

function limpiar() {
  input = myForm.myInput;
reader = new FileReader;
itemsCheck = new Array();
k = 0;
l = 0;
loteNoEncontrado = new Array();
lotesLimpios = new Array();
soloLotes = new Array();
loteCoincidio = new Array();
lotePaquetes = [];
lotePeso = new Array();
}

function pasarTabla(tabla) {
  var tablaCopia=
  document.getElementById(tabla).innerHTML;
  console.log(tablaCopia);
}

function exportTableToExcel(tableID){
  var downloadLink;
  var dataType = 'application/vnd.ms-excel';
  var tableSelect = document.getElementById(tableID);
  var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
  
  // Specify file name
  filename = nameFile[0]+'.xls';
  
  // Create download link element
  downloadLink = document.createElement("a");
  
  document.body.appendChild(downloadLink);
  
  if(navigator.msSaveOrOpenBlob){
      var blob = new Blob(['ufeff', tableHTML], {
          type: dataType
      });
      navigator.msSaveOrOpenBlob( blob, filename);
  }else{
      // Create a link to the file
      downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
  
      // Setting the file name
      downloadLink.download = filename;
      
      //triggering the function
      downloadLink.click();
  }
}
