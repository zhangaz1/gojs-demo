;
(function(ns) {

    ns.nodesLayout = {
        layout: layout
    };

    return void(0);

    function layout(nodes) {
        if (nodes.count < 1) {
            return;
        }

        var distanceY = 50;
        var lastNode = null;
        var lastY = 0;

        nodes.each(function(node) {
            if (lastNode) {
                var y = lastY +
                    lastNode.actualBounds.height / 2 +
                    node.actualBounds.height / 2 +
                    distanceY;

                node.data.location = node.location.x + ' ' + y;

                lastY = y;
            } else {
                lastY = node.location.y;
            }

            lastNode = node;
        });

        lastNode.diagram.updateAllTargetBindings();
    }

})(NetBrain);