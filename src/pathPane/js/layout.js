;
(function(ns) {

    ns.layout = {
        layoutNodes: layoutNodes
    };

    return void(0);

    function layoutNodes(data, config) {
        var x = '100 ';
        var y = 0;
        _.each(data.nodeDataArray, function(node, index) {
            node.location = x + y;
            y += 100;
        });
        return data;
    }

})(NetBrain);