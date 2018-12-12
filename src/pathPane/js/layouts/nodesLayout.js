;
(function(netBrain) {
    var ns = netBrain.pathPaneView;

    var updateDiagram = ns.utils.updateDiagram;

    ns.nodesLayout = {
        layout: layout
    };

    return void(0);

    function layout(nodes, option) {
        if (nodes.count < 1) {
            return;
        }

        return updateDiagram(option.diagram, function() {
                resetNodesWidth(nodes, option);
            })
            .then(function() {
                return updateDiagram(option.diagram, function() {
                    doLayout(nodes, option);
                });
            });
    }

    function doLayout(nodes, option) {
        var config = option.config;
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

    function resetNodesWidth(nodes, option) {
        var maxNodeWidth = 0;
        nodes.each(function(node) {
            var nodeWidth = node.actualBounds.width;
            if (nodeWidth > maxNodeWidth) {
                maxNodeWidth = nodeWidth;
            }
        });

        nodes.each(function(node) {
            node.data.width = maxNodeWidth;
        });

        nodes.first().diagram.updateAllTargetBindings();
        option.api.suggestPaneWidth(maxNodeWidth);
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