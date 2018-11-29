;
(function(netBrain) {
    var ns = netBrain.pathPaneView;

    ns.nodesDataLayout = {
        layout: layout
    };

    return void(0);

    function layout(data, config) {
        var x = '100 ';
        var y = 0;
        _.each(data.nodeDataArray, function(node, index) {
            node.location = x + y;
            y += 170;
        });
        return data;
    }

})(NetBrain);