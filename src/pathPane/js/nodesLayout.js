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

        var lastNode = null;
        var lastY = 0;

        nodes.each(function(node) {
            if (lastNode) {
                var y = calculateY(lastY, lastNode, node);
                var x = calculateX(node);

                node.data.location = x + ' ' + y;

                lastY = y;
            } else {
                lastY = node.location.y;
            }

            lastNode = node;
        });

        lastNode.diagram.updateAllTargetBindings();
    }

    function calculateX(node) {
        return node.location.x;
    }

    function calculateY(lastY, lastNode, node) {
        var distanceY = 20;

        return lastY +
            lastNode.actualBounds.height / 2 +
            node.actualBounds.height / 2 +
            distanceY;
    }

})(NetBrain);