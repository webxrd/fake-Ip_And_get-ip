const path = require('path');
const request = require('request');
const requestIp = require('request-ip');// 用来获取ip的方法1
// 端口号
const PORT = 5200;
const express = require('express');
const app = express();


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const session = require('express-session');

// 中间件，设置响应头
app.all('*',function (request,response,next) {
    // response.header("Access-Control-Allow-Origin", "http://47.103.30.228");//允许访问本服务器的地址
    // response.header("Access-Control-Allow-Origin", "http://localhost:8081");//允许访问本服务器的地址
    response.header("Access-Control-Allow-Origin", "http://localhost:63342");//允许访问本服务器的地址
    response.header("Access-Control-Allow-Credentials", "true");
    // response.header("Access-Control-Allow-Origin", "*");//允许访问本服务器的地址
    response.header("Access-Control-Allow-Headers", "X-Requested-With,content-type,x-token");//允许访问本服务器的请求头
    response.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");//允许访问本服务器的请求方法
    response.header("X-Powered-By",' 3.2.1');//x - power - by是HTTP响应头之一。X表示标头是扩展标头，即，不符合HTTP标准d。power - by:告诉HTTP客户机请求/响应是由哪个引擎处理的。
    response.header("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
    next();
});

app.use(function(req, res, next) {
    const clientIp = requestIp.getClientIp(req);
    console.log(clientIp);
    next();
})


app.use(session({// 中间件应该放在顶上
    name: 'session-name', // 这里是cookie的name，默认是connect.sid
    secret: 'my_session_secret', // 建议使用 128 个字符的随机字符串
    resave: true,
    saveUninitialized: false,
    cookie: {
        // 1000 * 60 * 300 —— 300分钟，5小时
        maxAge: 60 * 1000 * 300,
        httpOnly: true // 开启后前端无法通过 JS 操作
    }
}));

// 用来获取ip的方法2
var get_client_ip = function(req) {
    var ip = req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
    if(ip.split(',').length>0){
        ip = ip.split(',')[0]
    }
    return ip;
};


app.get('/a',function (request, response, next) {
    const clientIp = get_client_ip(request);
    console.log(clientIp);
    console.log(request.headers);
    response.json({abc:'abc'})
});


// 监听app服务开启。只执行一次
app.listen(PORT, function (err) {
    if (err){
        console.log(`连接${PORT}失败！`);
        throw err
    }
    console.log(`连接成功！http://127.0.0.1:${PORT}`);
});



