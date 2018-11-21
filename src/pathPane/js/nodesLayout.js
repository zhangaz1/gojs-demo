;
(function(ns) {

    var consts = ns.consts;

    ns.nodesLayout = {
        layout: layout
    };

    return void(0);

    function layout(nodes, config) {
        if (nodes.count < 1) {
            return;
        }

        var lastNode = null;
        var lastY = 0;

        nodes.each(function(node) {
            if (lastNode) {
                var y = calculateY(lastY, lastNode, node);
                var x = calculateX(node, config);

                node.data.location = x + ' ' + y;

                lastY = y;
            } else {
                lastY = node.location.y;
            }

            lastNode = node;
        });

        lastNode.diagram.updateAllTargetBindings();
    }

    function calculateX(node, config) {
        var nodeCategories = consts.enums.nodeCategories;

        var x;
        switch (node.data.category) {
            case nodeCategories.failed:
            case nodeCategories.balance:
                x = getLinkAnotherX(node, config);
                break;
            default:
                x = node.location.x;
                break;
        }

        return x;
    }

    function getLinkAnotherX(node, config) {
        var inLink = node.findLinksInto('icon').first();
        return inLink.points.first().x;
    }

    function calculateY(lastY, lastNode, node) {
        var distanceY = 20;

        return lastY +
            lastNode.actualBounds.height / 2 +
            node.actualBounds.height / 2 +
            distanceY;
    }

})(NetBrain);