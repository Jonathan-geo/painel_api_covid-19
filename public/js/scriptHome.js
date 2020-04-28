
$(document).ready(function(){

    $.ajax({
        type: "GET",
        url: 'https://covid19-brazil-api.now.sh/api/report/v1',
        contentType: 'application/json',
        success: function(response){
            //console.log(response.data[0]);
            //console.log(response.data[0].uf);
            // console.log(response.data[0].state);
            // console.log(response.data[0].cases);
            // console.log(response.data[0].deaths);
            // console.log(response.data[0].suspects);
            // console.log(response.data[0].refuses);
            // console.log(response.data[0].datetime);
            var estadoArray = [];
            var mortesArray = [];
            var casosArray = [];
            var duplaArray = [];
            for (var i = 0; i<response.data.length; i++){
                //estadoArray.push(response.data[i].state);
                //mortesArray.push(response.data[i].deaths);
                duplaArray.push([response.data[i].state, response.data[i].deaths, response.data[i].cases] );
            }

            duplaArray.sort(function(a, b){
                return b[1] - a[1]
            });


            for (var i = 0; i<duplaArray.length; i++){
                estadoArray.push(duplaArray[i][0]);
                mortesArray.push(duplaArray[i][1]);
                casosArray.push(duplaArray[i][2]);
            }
            //console.log(duplaArray);
            // console.log(duplaArray[0]);
            // console.log(duplaArray[0][0]);
            // console.log(duplaArray[1][0]);
            // console.log(duplaArray[1][1]);

            grafico(estadoArray, mortesArray, casosArray);
        }
    });
    

    function grafico(estado, mortes, casos){
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'bar',

            data: {
                labels: estado,
                datasets: [{ 
                    data: casos,
                    label: "Casos notificados",
                    borderColor: "#3e95cd",
                    backgroundColor: 'rgb(255, 99, 132)',
                    fill: false
                  }, { 
                    data: mortes,
                    label: "Mortes por covid",
                    borderColor: "#8e5ea2",
                    backgroundColor: 'rgb(0, 139, 139)',
                    fill: false
                }]
            },
        
            // The data for our dataset
            // data: {
            //     labels: estado,
            //     datasets: [{
            //         label: 'Mortes por covid',
            //         backgroundColor: 'rgb(255, 99, 132)',
            //         borderColor: 'rgb(255, 99, 132)',
            //         data: mortes
            //     }]
            // },
        
            // Configuration options go here
            options: {
                title: {
                  display: true,
                  text: 'World population per region (in millions)'
                }
            }
        });
    }



    // new Chart(document.getElementById("line-chart"), {
    //     type: 'bar',
    //     data: {
    //       labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
    //       datasets: [{ 
    //           data: [86,114,106,106,107,111,133,221,783,2478],
    //           label: "Africa",
    //           borderColor: "#3e95cd",
    //           fill: false
    //         }, { 
    //           data: [282,350,411,502,635,809,947,1402,3700,5267],
    //           label: "Asia",
    //           borderColor: "#8e5ea2",
    //           fill: false
    //         }, { 
    //           data: [168,170,178,190,203,276,408,547,675,734],
    //           label: "Europe",
    //           borderColor: "#3cba9f",
    //           fill: false
    //         }, { 
    //           data: [40,20,10,16,24,38,74,167,508,784],
    //           label: "Latin America",
    //           borderColor: "#e8c3b9",
    //           fill: false
    //         }, { 
    //           data: [6,3,2,2,7,26,82,172,312,433],
    //           label: "North America",
    //           borderColor: "#c45850",
    //           fill: false
    //         }
    //       ]
    //     },
    //     options: {
    //       title: {
    //         display: true,
    //         text: 'World population per region (in millions)'
    //       }
    //     }
    //   });















    

});

