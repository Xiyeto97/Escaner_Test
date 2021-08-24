var barras = document.getElementById("barras");
var materiales = new Array(2);
var btnArchivo = document.getElementById("btnArchivo");
btnArchivo.focus();
barras.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
    separarBarras();
  }
});

var secuencia = 1;

function separarBarras() {
  var barras = $("#barras").val();
  var celdas = false;
  var id = "";
  var barraSeparadas = barras.split(' ');
  var barrasSeparadas = new Array();
  //console.log(barraSeparadas);
  for(i=0;i<barraSeparadas.length;i++){
    if (barraSeparadas[i]=="") {
      barraSeparadas.splice(i, 1);
      
    }
    }
    for(i=0;i<barraSeparadas.length;i++){
      if (barraSeparadas[i]=="") {
        barraSeparadas.splice(i, 1);
        
      }
      }
  //console.log(barraSeparadas.length);
  if(barraSeparadas.length<3){
    for (let i = 0; i < barraSeparadas.length; i++) {
      const element = barraSeparadas[i];
      if (element.length>17) {
        var product = element.substr(0,4);
        var col = element.substr(4,6);
        var lot = element.substr(10);
        barrasSeparadas.push(product,col,lot);
      }else{
        barrasSeparadas.push(barraSeparadas[i]);
      }
      //console.log(element);
      
    }
    /*console.log(product);
    console.log(col);
    console.log(lot);
    console.log(barrasSeparadas);*/
  }else{
    barrasSeparadas=barraSeparadas;
  }
  var resume_table = document.getElementById("t01");
  /*for(i=0;i<barrasSeparadas.length;i++){
    if (barrasSeparadas[i]=="") {
      var removed = barrasSeparadas.splice(i, 1);
    }
    }
  console.log(barrasSeparadas);*/
  if (barrasSeparadas.length > 3) {
    var prod = barrasSeparadas[0];
    var color = barrasSeparadas[1];
    var cambio=barrasSeparadas[2];
    for(i=0;i<barrasSeparadas[2].length;i++){
      if(barrasSeparadas[2].charAt(i)=="'"){
        cambio = barrasSeparadas[2].replace("'","-");
      }
    }
    
    var lote = cambio;
    var paqPeso = barrasSeparadas[3];
    var paqs = 1;
    var peso = paqPeso.substr(3);

    $("td").each(function () {
      var valores = $(this).text();
      if (lote == valores) {
        celdas = true;
        id = $(this).attr('id');
      }


    });
    /*console.log(celdas);
    console.log(id);*/


    if (celdas) {
      $("td").each(function () {
        var val = $(this).attr('name');
        if (id == val) {
          var valores = $(this).text();
          valores = $(this).text(parseInt(valores) + 1);
        }
      });
      id = "peso" + id;
      $("td").each(function () {
        var val = $(this).attr('name');
        //console.log(id);
        if (id == val) {
          var valores = $(this).text();
          valores = $(this).text((parseFloat(valores) + parseFloat(peso)).toFixed(2));
        }
      });


    } else {
      var fila = "<tr><td name='producto' class='words'>" + prod 
      + "</td><td name='color' class='words'>" + color 
      + "</td><td id='" + secuencia + "' name='lote' class='words'>" + lote 
      + "</td><td id= 'paq" + secuencia + "' name='" + secuencia + "' class='words'>" + paqs
        + "</td><td id= 'peso" + secuencia + "' name='peso" + secuencia + "' class='words'>" + peso
        + "</td><td><input type='text' id='modificar" + secuencia + "' name='modificar' value='0.0'onclick = 'this.value=" + '""' + "' class='words'><button id='Modificar' class='words' onclick='modificarPeso(" + secuencia + ")'>Modificar</button></td><td id= 'result" + secuencia + "' name='result" + secuencia + "' class='words'><img src='static/img/wait.gif' id= 'resulta" + secuencia + "' class='icon' alt=''></td><td id= 'diferencia" + secuencia + "' name='diferencia" + secuencia + "' class='words'></td></tr>";
      secuencia++;
      var btn = document.createElement("TR");
      btn.innerHTML = fila;
      document.getElementById("paquetes").appendChild(btn);
    }
  } else {
    var prodColor = barrasSeparadas[0];
    //console.log(prodColor);
    var prod = prodColor.substr(0, 4);
    var color = prodColor.substr(4);
    var cambio=barrasSeparadas[1];
    for(i=0;i<barrasSeparadas[1].length;i++){
      if(barrasSeparadas[1].charAt(i)=="'"){
        cambio = barrasSeparadas[1].replace("'","-");
      }
      //console.log(barrasSeparadas[1].charAt(i));
      //console.log(cambio);
    }
    
    var lote = cambio;
    var paqPeso = barrasSeparadas[2];
    var paqs = 1;
    var peso = paqPeso.substr(3);

    $("td").each(function () {
      var valores = $(this).text();
      if (lote == valores) {
        celdas = true;
        id = $(this).attr('id');
      }


    });
    /*console.log(celdas);
    console.log(id);*/


    if (celdas) {
      $("td").each(function () {
        var val = $(this).attr('name');
        if (id == val) {
          var valores = $(this).text();
          valores = $(this).text(parseInt(valores) + 1);
        }
      });
      id = "peso" + id;
      $("td").each(function () {
        var val = $(this).attr('name');
        //console.log(id);
        if (id == val) {
          var valores = $(this).text();
          valores = $(this).text((parseFloat(valores) + parseFloat(peso)).toFixed(2));
        }
      });



    } else {
      var fila = "<tr><td name='producto' class='words'>" + prod 
      + "</td><td name='color' class='words'>" + color 
      + "</td><td id='" + secuencia + "' name='lote' class='words'>" + lote 
      + "</td><td id= 'paq" + secuencia + "' name='" + secuencia + "' class='words'>" + paqs
        + "</td><td id= 'peso" + secuencia + "' name='peso" + secuencia + "' class='words'>" + peso
        + "</td><td><input type='text' id='modificar" + secuencia + "' name='modificar' value='0.0'onclick = 'this.value=" + '""' + "' class='words'><button id='Modificar' class='words' onclick='modificarPeso(" + secuencia + ")'>Modificar</button></td><td id= 'result" + secuencia + "' name='result" + secuencia + "' class='words'><img src='static/img/wait.gif' id= 'resulta" + secuencia + "' class='icon' alt=''></td><td id= 'diferencia" + secuencia + "' name='diferencia" + secuencia + "' class='words'></td></tr>";
      var btn = document.createElement("TR");
      btn.innerHTML = fila;
      document.getElementById("paquetes").appendChild(btn);
      secuencia++;

    }

  }
  $('#barras').val('');
  $("#barras").focus();
  guardarTabla();
  reader.readAsText(file);
  reader.onload=onLoad;

}


function guardarTabla() {
  
  var resume_table = document.getElementById("t01");

  for (var i = 0, row; row = resume_table.rows[i]; i++) {
    //alert(cell[i].innerText);
    materiales[i] = new Array(2);
    for (var j = 0, col; col = row.cells[j]; j++) {
      //alert(col[j].innerText);
      
      //console.log(`Txt: ${col.innerText} \tFila: ${i} \t Celda: ${j}`);
      materiales[i][j] = col.innerText;

    }
  }
  //console.log(materiales.length);
  /*for (let i = 0; i < materiales.length; i++) {
    console.log(materiales[i][2]);
    
  }
  */
  console.log(materiales);
}

function modificarPeso(number) {
  var peso = document.getElementById("peso" + number).innerText;
  var pesoM = $("#modificar" + number).val();
  var paqts = parseFloat(document.getElementById("paq" + number).innerText);
  var modificacion = (parseFloat(peso) - parseFloat(pesoM)).toFixed(2);
  console.log("peso:" + peso + " pesoM:" + pesoM + " " + number + " paquetes:" + paqts + " resta:" + modificacion);

  if (modificacion < 0) {
    window.alert('El peso es incorrecto');
    $("#modificar" + number).val('0.0');
  } else {
    if (modificacion == 0) {
      $("#paq" + number).text('0');
    }
    if (paqts > 1) {
      $("#peso" + number).text(modificacion);
      $("#modificar" + number).val('0.0');
      $("#paq" + number).text(paqts - 1);
      barras.focus();
    } else {
      $("#peso" + number).text(modificacion);
      $("#modificar" + number).val('0.0');
      barras.focus();
    }

  }
  guardarTabla();
  reader.readAsText(file);
  reader.onload=onLoad;
}
var materiales = new Array(2);