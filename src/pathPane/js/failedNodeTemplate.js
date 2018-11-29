;
(function(netBrain) {
    var ns = netBrain.pathPaneView;

    var $ = go.GraphObject.make;

    ns.failedTemplate = {
        createFailedTemplate: createFailedTemplate
    };

    return void(0);

    function createFailedTemplate(option) {
        var nodeConfig = option.config.style.nodes;
        var deviceConfig = nodeConfig.device;
        var failedConfig = nodeConfig.failed;

        return $(
            go.Node,
            'Horizontal', {
                name: 'failedNode',
                locationSpot: go.Spot.Center,
            },

            new go.Binding('width', 'width'),
            new go.Binding('location', 'location', go.Point.parse),

            new go.Binding('padding', '', function() {
                var verify = 35; // 与devicenodeIcon偏差
                return new go.Margin(0, 0, 0, deviceConfig.details.left + verify);
            }),

            createFailedIconTemplate('_copy'),
            createFailedIconTemplate(),
        );

        // return void(0);

        function createFailedIconTemplate(tail) {
            var iconSize = failedConfig.iconSize;
            var icon = $(
                go.Picture, {
                    name: 'failedIcon',
                    portId: 'icon' + (tail || ''),
                    width: iconSize.width,
                    height: iconSize.height,
                    source: failedConfig.icon,
                },
            );

            if (!tail) {
                icon.margin = new go.Margin(0, 0, 0, -100);
            }

            return icon;
        }

    }

})(NetBrain);