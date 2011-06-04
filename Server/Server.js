require('./autoreleasepool');
var iOS = require('./node-iOS');
var http = require('http');

var headers =  {
    "Access-Control-Allow-Origin":"*",
    'Content-Type': 'application/javascript'
}
var version = "0.1";

http.createServer(function (req, res) {
    if(req.url == "/alert"){
        req.on('data', function(chunk) {
            var data = JSON.parse(chunk.toString());
            if(data.button == undefined){
                data.button = "OK";
            }
            if(data.title == undefined){
                data.title = "Alert";
            }
            if(data.message == undefined){
                data.message = "";
            }
            iOS.createNotification({
                message: data.message,
                header: data.title,
                defaultButton: data.button
            }, function(err, response) {
                console.log(response);
                res.writeHead(200, headers);
                res.end(JSON.stringify({
                    answer:response.result
                }));
            });
        });
    }else if(req.url == "/confirm"){
        req.on('data', function(chunk) {
            var data = JSON.parse(chunk.toString());
            if(data.button == undefined){
                data.button = "OK";
            }
            if(data.otherbutton == undefined){
                data.otherbutton = "Cancel";
            }
            if(data.title == undefined){
                data.title = "Alert";
            }
            if(data.message == undefined){
                data.message = "";
            }
            
            iOS.createNotification({
                message: data.message,
                header: data.title,
                defaultButton: data.button,
                alternateButton: data.otherbutton
            }, function(err, response) {
                console.log(response);
                res.writeHead(200, headers);
                res.end(JSON.stringify({
                    answer:response.result
                }));
            });
        });
    }else if(req.url == "/vibrate"){
        iOS.vibrate();
        res.writeHead(200, headers);
        res.end(JSON.stringify({
        }));
    }else if(req.url == "/device"){
        var Device = iOS.device();
        res.writeHead(200, headers);
        res.end(JSON.stringify({
            name:Device.name,
            phonegap: version,
            platform:"iPhone",
            uuid: Device.uniqueIdentifier,
            version: Device.systemVersion
        }));
    }else{
        res.writeHead(200, headers);
        res.end("{}");
    }
}).listen(427);