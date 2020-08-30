//var testFolder = 'data'; 같은 뜻 ./는 현재 디렉토리를 의미
var testFolder = './data';
var fs = require('fs');
 
fs.readdir(testFolder, function(error, filelist){
    console.log(filelist);
})