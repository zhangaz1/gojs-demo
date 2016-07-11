var jsdom = require('jsdom');

var http = require('http');

http.createServer(function(request, response) {
    writeResponse(response);
}).listen(8888);

function writeResponse(response) {
    getMapImage('', function(imgData) {
        if(response) {
            response.writeHeader(200, {
                "Content-Type": "text/html"
            });
            response.write('<img src="' + imgData + '" />');
            response.end();
        }
    });
}



function getMapImage(mapPageUrl, cb) {
    var virtualConsole = jsdom.createVirtualConsole();
    virtualConsole.on("jsdomError", function(error) {
        console.error(error.stack, error.detail);
    });


    var mapPageUrl = mapPageUrl ||
        'http://localhost:8080/testForJsdom.html' ||
        'http://localhost:8080/virtualizedForceLayout.html';

    var result = jsdom.env({
        virtualConsole: virtualConsole,
        url: mapPageUrl,
        features: {
            FetchExternalResources: ["script", 'link'],
            ProcessExternalResources: ["script", 'link'],
            SkipExternalResources: false
        },
        resourceLoader: function(resource, callback) {
            var pathname = resource.url.pathname;
            console.log(pathname);
            return resource.defaultFetch(callback);
        },
        done: function(error, window) {
            if(error) {
                console.log(error);
            } else {
                console.log(window.$('body').html());
                console.log(window.onMapReady);
                console.log(window.diagram);

                window.onMapReady = function(diagram) {
                    console.log('on map ready: ', diagram);
                    cb('https://nodejs.org/static/images/logos/nodejs-new-white-pantone.png');
                    var imgData = diagram.makeImageData({
                        scale: 1
                    });
                    console.log(imgData);
                    cb(imgData);
                };

                setTimeout(function() {
                    var diagram = window.diagram;
                    if(!diagram) {
                        console.log('no diagram!!!');
                        return;
                    }
                    var imgData = diagram.makeImageData({
                        scale: 1
                    });
                    console.log(imgData);
                    cb(imgData);
                }, 5000);

                window.addEventListener("error", function(event) {
                    console.error("script error!!", event.error);
                });

                console.log(window.onMapReady);
            }
        }
    });

    console.log('env: ', result)
}

function doGetTheMapImage(diagram) {
    return diagram.makeImageData({
        scale: 1
    });
}
