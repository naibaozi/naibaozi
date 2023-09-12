const res = require("express/lib/response");
const http  = require("http");
const mysql = require('mysql');
const fs = require("fs");
const querystring =require("querystring");
const port = 8080;
const ip  = "localhost";
const server = http.createServer((req,res) => {
    if(req.url!='/favicon.ico'){

    
    let postVal = "";
    req.on("data",(chunk)=>{
        postVal+=chunk;

    })
    req.on("end",()=>{
       let formVal = querystring.parse(postVal);
       let username = formVal.username;
       let email = formVal.email;
       let message = formVal.message;




       const connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'589485777',
        port:3306,
        database:'demo1'
    })
    connection.connect();
    connection.query('insert into user value (?,?,?,?)',[0,username,email,message],(err,results,fields) =>{
                if(err) throw err;
                res.writeHead(200,{'Content-Type':"text/html;charset=utf-8"});
                res.write("成功加入!");
                res.end();
            })
            connection.end();

    })
}

});
server.listen(port,ip,() => {
    console.log(`Server is running at http://${ip}:${port}`);
});
// const sendResponse = (filename,statusCode,response) => {
//     fs.readFile(`../${filename}`, (error,data) =>{
//         if(error){sendResponse("about.html",200,response);
//             response.statusCode = 500;
//             response.setHeader("Content-Type","text/plain");
//             response.end("sorry,internal error");
//         }else{
//             response.statusCode = statusCode;
//             response.setHeader("Content-Type","text/html");
//             response.end(data);
//         }
//     });
// };
// const server = http.createServer((request,response) =>{
//     let url = request.url;
//     const method = request.method;

// if(method === "GET"){
//     const requestUrl = new URL(url,`http://${ip}:${port}`);
//     url=requestUrl.pathname;
//     const lang = requestUrl.searchParams.get("lang");
//     let selector;

// if(lang === null || lang === "en"){
//     selector = "";
// }else if(lang === "zh"){
//     selector = "-zh";
// }else{
//     selector = "";

// }

//     if(url === "/"){
//         sendResponse(`index${selector}.html`,200,response);

//     }else if(url === "/about.html"){
//         sendResponse(`about${selector}.html`,200,response);
//     }else if(url === "/login-success.html"){
//         sendResponse(`login-success${selector}.html`,200,response);
//     }else if(url === "/login-fail.html"){
//         sendResponse(`login-fail${selector}.html`,200,response);
//     }else if(url === "/index.html"){
//         sendResponse(`index${selector}.html`,200,response);
//     }else{
//         sendResponse(`404${selector}.html`,404,response);
//     }

//     }else{
//     if(url === "/process-login"){
//         let body = [];

//         request.on("data",(chunk) => {
//             body.push(chunk);

//         });
//         request.on("end",() => {
//             body = Buffer.concat(body).toString();
//             body = qs.parse(body);
//             console.log(body);
//             const connection = mysql.createConnection({
//                 host:'localhost',
//                 user:'root',
//                 password:'589485777',
//                 port:3306,
//                 database:'demo1'
//             })
//             connection.connect();
//             connection.query('insert into user value (?,?,?,?)',[0,username,email,massage],(err,results,fields) =>{
//                 if(err) throw err;
                
//                 res.write("成功加入!");
//                 response.end();

//             })
//             connection.end();
//         });
//     }

    
// }

// });


