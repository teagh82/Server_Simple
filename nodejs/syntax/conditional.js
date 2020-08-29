var args = process.argv;
// node syntax/conditional.js egoing k8805
// args 는
// 배열 형식
// args[0] : nodejs runtime이 어디 위치하고 있는지
// args[1] : 실행시킨 파일 경로
// args[2] ... : 입력값 ('egoing', 'k8805')
console.log(args[2]);
console.log('A');
console.log('B');
if(args[2]==='1'){
    console.log('C1');
} else {
    console.log('C2');
}
console.log('D');