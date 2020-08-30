var fs = require('fs');

/*
//readFileSync
console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf-8');
console.log(result);
console.log('C');
//결과 => ABC
*/

//비동기 (동시에 여러가지 처리)
console.log('A');
// sample.txt 읽어오고 작업 끝나면 세번째 인자인 함수 실행 
fs.readFile('syntax/sample.txt', 'utf-8', function(err, result){
    console.log(result);
});
console.log('C');
//결과 => ACB
