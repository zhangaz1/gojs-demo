;
(function(ns) {

    var consts = ns.consts;

    ns.nodesLayout = {
        layout: layout
    };

    return void(0);

    function layout(nodes, option) {
        if (nodes.count < 1) {
            return;
        }

        var config = option.config;
        var lastNode = null;
        var lastY = 0;
        var maxNodeWidth = 0;

        nodes.each(function(node) {
            var nodeWidth = node.actualBounds.width;
            if (nodeWidth > maxNodeWidth) {
                maxNodeWidth = nodeWidth;
            }

            if (lastNode) {
                var y = calculateY(lastY, lastNode, node);
                var x = calculateX(node, config);

                node.data.location = x + ' ' + y;

                lastY = y;

                if (node.data.category === consts.enums.nodeCategories.media) {
                    updateMediaIconMargin(node);
                }
            } else {
                lastY = node.location.y;
            }

            lastNode = node;
        });

        lastNode.diagram.updateAllTargetBindings();
        option.api.suggestPaneWidth(maxNodeWidth);
    }

    function updateMediaIconMargin(node) {
        var inLink = node.findLinksInto('icon').first();
        var bounds = node.actualBounds;
        var left = inLink.points.first().x -
            bounds.x -
            node.findObject('mediaIcon').width / 2;
        node.data.iconMargin = '0 0 0 ' + left;
    }

    function calculateX(node, config) {
        var nodeCategories = consts.enums.nodeCategories;

        // return node.location.x;

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
        if (inLink.fromNode.data.category === consts.enums.nodeCategories.media) {
            inLink = inLink.fromNode.findLinksInto('icon').first();
        }
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