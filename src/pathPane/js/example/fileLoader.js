;
(function() {

    var root = './../../../';
    var files = [{
        type: 'js',
        path: 'libs/underscore/underscore.js',
    }, {
        type: 'js',
        path: 'libs/jquery/jquery.js',
    }, {
        type: 'js',
        path: 'libs/gojs/go-src.js',
    }, {
        type: 'js',
        path: 'libs/gojs/ExtendedBrush.js',
    }, {
        type: 'js',
        path: 'libs/gojs/spectrum.js',
    }, {
        type: 'css',
        path: 'libs/gojs/spectrum.css',
    }, {
        type: 'css',
        path: 'libs/gojs/DataInspector.css',
    }, {
        type: 'js',
        path: 'libs/gojs/DataInspector.js',
    }, {
        type: 'css',
        path: 'libs/gojs/DebugInspector.css',
    }, {
        type: 'js',
        path: 'libs/gojs/DebugInspector.js',
    }, {
        type: 'js',
        path: 'pathPane/js/path.js',
    }, ];

    loadFiles(files);

    return void(0);

    function loadFiles(files) {
        files.forEach(function(file) {
            var tag = createTag(file);
            document.write(tag);
        });
    }

    function createTag(file) {
        switch (file.type) {
            case 'js':
                return createJsTag(file.path);
            case 'css':
                return createCssTag(file.path);
        }
    }

    function createJsTag(filePath) {
        return '<script src="' + root + filePath + '"></script>';
    }

    function createCssTag(filePath) {
        return '<link rel="stylesheet" href="' + root + filePath + '" />';
    }

})();