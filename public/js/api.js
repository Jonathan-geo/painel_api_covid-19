


/*


const csvFilePath='public/csv/arquivo_geral.csv' //file path of csv
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    console.log(jsonObj);
})



var fs = require('fs');

fs.readFile('public/csv/arquivo_geral.csv', 'utf8', function(err,data){
    if(err) {
        console.error("Could not open file: %s", err);
        process.exit(1);
    }
	
	console.log(data);
});






https://www.diullei.com/2012/07/18/Lendo-arquivos-com-Nodejs/

var fs = require('fs');

fs.readFile('TEST.txt', function(err,data){
    if(err) {
        console.error("Could not open file: %s", err);
        process.exit(1);
    }
	
    console.log(data.toString('utf8'));
});




var fs = require('fs');

try {
    var data = fs.readFileSync('TEST.txt', 'ascii');
    console.log(data);
}
catch (err) {
    console.error("There was an error opening the file:");
    console.log(err);
}




var fs = require('fs');

var read_stream = fs.createReadStream('TEST.txt', {encoding: 'ascii'});
read_stream.on("data", function(data){
    process.stdout.write(data);
});
read_stream.on("error", function(err){
    console.error("An error occurred: %s", err)
});
read_stream.on("close", function(){
    console.log("File closed.")
});
*/