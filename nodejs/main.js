//기현(08.29) - 파일의 제목은 동적, 본문은 고정적임
//혜영(08.29) - 파일에 본문 저장, Node.js의 파일 읽기 기능(fs.readFile)을 이용해서 본문을 생성 (본문도 동적으로)
//혜영(08.30) - NotFound 에러, 이전 홈페이지 미구현 부분(home의 본문) 구현
//기현(08.30) - 파일의 리스트와 내용을 동적으로 변경, 함수를 사용해 정리

var http = require('http');
var fs = require('fs');
var url = require('url');
 
function templateHTML(title, list, body){
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${body}
  </body>
  </html>
  `;
}

function templateList(filelist){
  var list = '<ul>';
  var i = 0;
  while(i < filelist.length){
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list+'</ul>';
  return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    
    if(pathname === '/'){
      if(queryData.id === undefined){
        // home
        // undefined의 의미 : 없는 값을 호출

        fs.readdir('./data', function(error, filelist){
          console.log(filelist);
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = templateList(filelist);
          var template = templateHTML(title, list, `<h2>${title}</h2>${description}`)
          response.end(template);
        });
        
      } else {
        // 각 page
        fs.readdir('./data', function(error, filelist){
          fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
            var title = queryData.id;
            var list = templateList(filelist);
            var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
            response.writeHead(200);
            response.end(template);
          });
        });
      }
    } else {
      // 파일 찾을 수 없음
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);