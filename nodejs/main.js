//기현(08.29) - 파일의 제목은 동적, 본문은 고정적임
//혜영(08.29) - 파일에 본문 저장, Node.js의 파일 읽기 기능(fs.readFile)을 이용해서 본문을 생성 (본문도 동적으로)
//혜영(08.30) - NotFound 에러, 이전 홈페이지 미구현 부분(home의 본문) 구현
//기현(08.30) - 파일의 리스트와 내용을 동적으로 변경, 함수를 사용해 정리
//혜영(08.31) - 글생성 UI 만들기, 사용자가 입력한 정보를 받아서 동적으로 데이터 디렉토리에 파일 생성

var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
 
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
    <a href="/create">create</a>
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
        // home, undefined : 없는 값 호출
        fs.readdir('./data', function(error, filelist){
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = templateList(filelist);
          var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
          response.writeHead(200);
          response.end(template);
        });
        
      } else {
        // 목록에 있는 각 page
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
    } else if(pathname === '/create'){
      // create 버튼 클릭
      fs.readdir('./data', function(error, filelist){
        var title = 'WEB - create';
        var description = 'Hello, Node.js';
        var list = templateList(filelist);
        var template = templateHTML(title, list, `
        <form action="http://localhost:3000/create_process" method="post">
          <p><input type = "text" name="title" placeholder="title"></p>
          <p>
              <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
              <input type="submit">
          </p>
        </form>
        `);
        response.writeHead(200);
        response.end(template);
      });
    } else if(pathname === '/create_process'){
      // create에서 제출 버튼 클릭
      // POST 방식으로 전송된 데이터 가져오기
      var body = '';
      request.on('data', function(data){
        // 서버에서 데이터 수신할 때마다 
        body = body + data;
      });
      request.on('end', function(){
        // qs.parse 통해 정보 객체화
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`, description, 'utf-8', function(err){
          // 리다이렉션
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end();
        });
      });  
    }else {
      // 파일 찾을 수 없음
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);