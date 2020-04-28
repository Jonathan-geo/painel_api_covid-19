$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: '/api',
        contentType: 'application/json',
        success: function(response){
            //console.log(response);

            var csvArray = response;
            //console.log(csvArray.length);

            // var csvArray = csvToArray(response); 
            // console.log(csvArray[0].casosAcumulados);
            // console.log(csvArray[0].casosNovos);
            // console.log(csvArray[0].estado);
            // console.log(csvArray[0]['obitosAcumulados\r']);
            // console.log(csvArray[0].obitosNovos);
            

            var atualizado = dadosDataAtual(csvArray); //Array Datas Atuais
            // console.log(atualizado[0].data[0]);
            //console.log(atualizado[0].regiao);
            //console.log(atualizado[0].obitosAcumulados);

            // console.log(atualizado[0].casosAcumulados);


            dataObitosConfirmados(atualizado);




            var orderArray = ordenarArrayGrafico1(atualizado); //Dados Atuais - Mortes, Casos e Estados.
            // console.log(orderArray);
            grafico1gatilho(orderArray); // Grafico: CASOS E ÓBTOS POR ESTADOS

            gatilhoGrafico2(csvArray);
            


            //console.log(dataAtual);

            
            // var data = $('#numData');
            // data.html('OKOK');


            grafico1pie(atualizado);



        }

    });




    $('.card-grp').click(function() {
        $('.card-list').toggleClass('visible');
    });


    // var numObitos = $('#numObitos');
    // numObitos.innerHTML = 'OK'  

    

        //var titulo = document.getElementById("txtTitulo").value;
        // var subtitulo = document.getElementById("txtSubtitulo").value;
        // var div = document.getElementById("divResultado");
         
        // div.innerText = "<h1>" + titulo +"</h1>"+ "\n" + subtitulo;


});






/*  //------NAO ESTOU USANDO NO MOMENTO-------//

//Reference Function: https://jsfiddle.net/barney/7vpAJ
function csvToArray(csvString){
  var csvArray   = [];
  var csvRows    = csvString.split(/\n/);
  var csvHeaders = csvRows.shift().split(';');
  for(var rowIndex = 0; rowIndex < csvRows.length; ++rowIndex){
    var rowArray  = csvRows[rowIndex].split(';');
    var rowObject = csvArray[rowIndex] = {};
    for(var propIndex = 0; propIndex < rowArray.length; ++propIndex){
      var propValue =   rowArray[propIndex].replace(/^"|"$/g,'');
      var propLabel = csvHeaders[propIndex].replace(/^"|"$/g,'');;
      rowObject[propLabel] = propValue;
    }
  }
  return csvArray;
}

function data(){
    var data = new Date();
    var dia     = data.getDate();           // 1-31
    var mes     = data.getMonth();          // 0-11 (zero=janeiro)
    var ano4    = data.getFullYear();       // 4 dígitos
    var str_data = ano4 + '-0' + (mes+1) + '-' + dia;
    return str_data;
}

*/

function dadosDataAtual(data){
    var atualizado = [];
    for (var i = 0; i<data.length; i++){
        if (data[i].data == '2020-04-27'){
            atualizado.push(data[i]);
        }
    }
    return atualizado;
}

function ordenarArrayGrafico1(atualizado){

    var orderArray = [];
    for (var i = 0; i<atualizado.length; i++){
        orderArray.push([atualizado[i].casosAcumulados, atualizado[i].obitosAcumulados, atualizado[i].estado]);
    }

    orderArray.sort(function(a, b){
        return b[1] - a[1]
    });

    return orderArray;

}





function dataObitosConfirmados(atualizado){
    var numData = document.getElementById('numData');
    numData.innerHTML = atualizado[0].data[8] + atualizado[0].data[9] + atualizado[0].data[7] + atualizado[0].data[5] + atualizado[0].data[6];

    var obitosAcumuladosBrasil = 0;
    for (var i = 0; i<atualizado.length; i++){
        obitosAcumuladosBrasil = parseInt(obitosAcumuladosBrasil) + parseInt(atualizado[i].obitosAcumulados)
    }
    var numObitos = document.getElementById('numObitos');
    numObitos.innerHTML = obitosAcumuladosBrasil;

    var casosAcumuladosBrasil = 0;
    for (var i = 0; i<atualizado.length; i++){
        casosAcumuladosBrasil = parseInt(casosAcumuladosBrasil) + parseInt(atualizado[i].casosAcumulados)
    }
    var numObitos = document.getElementById('numConfirmados');
    numObitos.innerHTML = casosAcumuladosBrasil;
}








function grafico1gatilho(orderArray){
    
    var estado = [];
    var obitosAcumulados = [];
    var casosAcumulados = [];

    for (var i = 0; i<orderArray.length; i++){
        estado.push(orderArray[i][2]); //estado
        obitosAcumulados.push(orderArray[i][1]); //obitosAcumulados
        casosAcumulados.push(orderArray[i][0]); //casosAcumulados
    }
    
    var estadoSemSP = [];
    var obitosAcumuladosSemSp = [];
    var casosAcumuladosSemSP = [];
    
    for (var i = 1; i<orderArray.length; i++){
        estadoSemSP.push(orderArray[i][2]); //estado
        obitosAcumuladosSemSp.push(orderArray[i][1]); //obitosAcumulados
        casosAcumuladosSemSP.push(orderArray[i][0]); //casosAcumulados
    }




    // console.log(obitosAcumulados);
    // console.log(casosAcumulados);
    $('#estadoSelectSP').change(function(){
        

        var selectede = $(this).val();



        if (selectede == 'Csp'){
            grafico1ComSp(estado, obitosAcumulados, casosAcumulados);
        }else{
            grafico1SemSp(estadoSemSP, obitosAcumuladosSemSp, casosAcumuladosSemSP);
        }
        
    });
    $('#estadoSelectSP').val('Ssp').trigger('change');


}

function grafico1ComSp(estado, obitosAcumulados, casosAcumulados){
    var pieChartContent = document.getElementById('pieChartContent2');
    pieChartContent.innerHTML = '&nbsp;';
    $('#pieChartContent2').append('<canvas id="grafico1" width="500" height="360"><canvas>');

    var ctx = document.getElementById('grafico1').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
        data: {
            labels: estado,
            datasets: [{ 
                data: casosAcumulados,
                label: "Casos notificados",
                borderColor: "#3e95cd",
                backgroundColor: 'rgb(0, 139, 139)',
                fill: false
                }, { 
                data: obitosAcumulados,
                label: "Mortes por covid",
                borderColor: "#8e5ea2",
                backgroundColor: 'rgb(255, 99, 132)',
                fill: false
            }]
        },

        // Configuration options go here
        options: {
            title: {
                display: true,
                text: 'CASOS E ÓBITOS POR ESTADO'
            },
            scales: {
                yAxes: [{
                ticks: {
                    min: 0,
                    max: 28000,
                    stepSize: 3000
                }
                }]
            }
        }
    });

}

function grafico1SemSp(estado, obitosAcumulados, casosAcumulados){

    var pieChartContent = document.getElementById('pieChartContent2');
    pieChartContent.innerHTML = '&nbsp;';
    $('#pieChartContent2').append('<canvas id="grafico1" width="500" height="360"><canvas>');

    
    //var estadoSemSP = estado.splice(1, 26);
    //var obitosAcumuladosSemSP = obitosAcumulados.splice(1, 26);
    //var casosAcumuladosSemSP = casosAcumulados.splice(1, 26);

    var ctx = document.getElementById('grafico1').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
        data: {
            labels: estado,
            datasets: [{ 
                data: casosAcumulados,
                label: "Casos notificados",
                borderColor: "#3e95cd",
                backgroundColor: 'rgb(0, 139, 139)',
                fill: false
                }, { 
                data: obitosAcumulados,
                label: "Mortes por covid",
                borderColor: "#8e5ea2",
                backgroundColor: 'rgb(255, 99, 132)',
                fill: false
            }]
        },

        // Configuration options go here
        options: {
            title: {
                display: true,
                text: 'CASOS E ÓBITOS POR ESTADO'
            },
            scales: {
                yAxes: [{
                ticks: {
                    min: 0,
                    max: 15000,
                    stepSize: 3000
                }
                }]
            }
        }
    });

}



function grafico1pie(atualizado){

    var regiaoLabel = ["Norte", "Nordeste", "Sudeste", "Sul", "Centro-Oeste"];
    var Norte = 0;
    var Nordeste = 0;
    var Sudeste = 0;
    var Sul = 0;
    var Oeste = 0;
    // var casosAcumulados = [];

    for (var i = 0; i<atualizado.length; i++){
        //Norte
        if(atualizado[i].regiao == "Norte"){
            Norte = Norte + parseInt(atualizado[i].obitosAcumulados);
        }

        //Nordeste
        if(atualizado[i].regiao == "Nordeste"){
            Nordeste = Nordeste + parseInt(atualizado[i].obitosAcumulados);
        }

        //Sudeste
        if(atualizado[i].regiao == "Sudeste"){
            Sudeste = Sudeste + parseInt(atualizado[i].obitosAcumulados);
        }

        //Sul
        if(atualizado[i].regiao == "Sul"){
            Sul = Sul + parseInt(atualizado[i].obitosAcumulados);
        }

        if(atualizado[i].regiao == "Centro-Oeste"){
            Oeste = Oeste + parseInt(atualizado[i].obitosAcumulados);
        }
        
    }

    console.log(Norte);
    console.log(Nordeste);
    console.log(Sudeste);
    console.log(Sul);
    console.log(Oeste);

    var ctx = document.getElementById('grafico3').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'pie',
        data: {
            labels: regiaoLabel,
            datasets: [{ 
                data: [Norte, Nordeste, Sudeste, Sul, Oeste],
                label: "Casos notificados",
                borderColor: "#3e95cd",
                backgroundColor: ['rgb(0, 139, 139)','rgb(255, 99, 132)', 'rgb(255, 199, 132)', 'rgb(55, 99, 132)', 'rgb(33, 99, 132)'],
                fill: false
                }, { 

            }]
        },
    
        // Configuration options go here
        options: {
            title: {
                display: true,
                text: 'CASOS E ÓBTOS POR ESTADO'
            }
        }
    });
}



function gatilhoGrafico2(csvArray){

    $('#estadoSelect').change(function(){

        var selectede = $(this).val();
        var arrayTotalEstado = [];
        for (var i = 0; i<csvArray.length; i++){
            if(csvArray[i].estado == selectede){
                arrayTotalEstado.push(csvArray[i]);
            }
        }


        if (selectede == 'SP'){
            grafico2sp(arrayTotalEstado);
        }else{
            grafico2(arrayTotalEstado);
        }
        



        var tableContent = document.getElementById('tableContent');
        tableContent.innerHTML = '&nbsp;';
        $('#tableContent').append('\
                        <table id="tabela">\
                            <tbody id="t01">\
                                <tr>\
                                    <th>Data de Referência</th>\
                                    <th>Casos Novos</th>\
                                    <th>Casos Acumulados</th>\
                                    <th>Óbitos Acumulados</th>\
                                </tr>\
                            </tbody>\
                        </table>');

      
        
        //console.log(arrayTotalEstado[arrayTotalEstado.length-1].data);
        var tbodyEl = $('#t01');
        for (var i = 1; i<arrayTotalEstado.length; i++){
            tbodyEl.append('\
                <tr>\
                    <td class="id">' + arrayTotalEstado[arrayTotalEstado.length-i].data + '</td>\
                    <td class="id">' + arrayTotalEstado[arrayTotalEstado.length-i].casosNovos + '</td>\
                    <td class="id">' + arrayTotalEstado[arrayTotalEstado.length-i].casosAcumulados + '</td>\
                    <td class="id">' +arrayTotalEstado[arrayTotalEstado.length-i].obitosAcumulados + '</td>\
                </tr>\
            ');

        }

    });

    $('#estadoSelect').val('SP').trigger('change');
    
}



function grafico2sp(arrayTotalEstado){
    var data = [];
    var obitosAcumulados = [];
    var casosAcumulados = [];

    for (var i = 0; i<arrayTotalEstado.length; i++){
        data[i] = arrayTotalEstado[i].data; //estado
        obitosAcumulados[i] = arrayTotalEstado[i].obitosAcumulados; //obitosAcumulados
        casosAcumulados[i] = arrayTotalEstado[i].casosAcumulados; //casosAcumulados
    }


    var pieChartContent = document.getElementById('pieChartContent');
    pieChartContent.innerHTML = '&nbsp;';
    $('#pieChartContent').append('<canvas id="grafico2" width="300" height="150"><canvas>');

    //ctx = $("#grafico2").get(0).getContext("2d");        
    //var myPieChart = new Chart(ctx).Pie(data, options);


    var ctx = document.getElementById('grafico2').getContext('2d');
    
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        data: {
            labels: data,
            datasets: [{ 
                data: casosAcumulados,
                label: "Casos notificados",
                borderColor: "#3e95cd",
                backgroundColor: 'rgb(0, 139, 139)',
                }, { 
                data: obitosAcumulados,
                label: "Mortes por covid",
                borderColor: "#8e5ea2",
                backgroundColor: 'rgb(255, 99, 132)',
            }]
        },
    
        // Configuration options go here
        options: {
            title: {
                display: true,
                text: 'CASOS E ÓBITOS POR ESTADO'
            }, 
            scales: {
                yAxes: [{
                  ticks: {
                    min: 0,
                    max: 28000,
                    stepSize: 3000
                  }
                }]
            }
        }
    });

}

function grafico2(arrayTotalEstado){
    var data = [];
    var obitosAcumulados = [];
    var casosAcumulados = [];

    for (var i = 0; i<arrayTotalEstado.length; i++){
        data[i] = arrayTotalEstado[i].data; //estado
        obitosAcumulados[i] = arrayTotalEstado[i]['obitosAcumulados\r']; //obitosAcumulados
        casosAcumulados[i] = arrayTotalEstado[i].casosAcumulados; //casosAcumulados
    }


    var pieChartContent = document.getElementById('pieChartContent');
    pieChartContent.innerHTML = '&nbsp;';
    $('#pieChartContent').append('<canvas id="grafico2" width="300" height="150"><canvas>');

    //ctx = $("#grafico2").get(0).getContext("2d");        
    //var myPieChart = new Chart(ctx).Pie(data, options);


    var ctx = document.getElementById('grafico2').getContext('2d');
    
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        data: {
            labels: data,
            datasets: [{ 
                data: casosAcumulados,
                label: "Casos notificados",
                borderColor: "#3e95cd",
                backgroundColor: 'rgb(0, 139, 139)',
                }, { 
                data: obitosAcumulados,
                label: "Mortes por covid",
                borderColor: "#8e5ea2",
                backgroundColor: 'rgb(255, 99, 132)',
            }]
        },
    
        // Configuration options go here
        options: {
            title: {
                display: true,
                text: 'CASOS E ÓBITOS POR ESTADO'
            }, 
            scales: {
                yAxes: [{
                  ticks: {
                    min: 0,
                    max: 10000,
                    stepSize: 1000
                  }
                }]
            }
        }
    });

}




