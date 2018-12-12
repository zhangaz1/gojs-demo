;
(function(netBrain) {
    var ns = netBrain.pathPaneView;

    var verify = 39; // 与devicenodeIcon偏差

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
                return new go.Margin(0, 0, 0, getMarginLeft());
            }),

            createFailedIconTemplate('_copy'),
            createFailedIconTemplate(),
        );

        // return void(0);

        function createFailedIconTemplate(tail) {
            var iconSize = failedConfig.iconSize;
            var isDefault = !tail;
            var iconLeft = isDefault ?
                -70 : // failed icon copy 默认左偏移
                0;

            var icon = $(
                go.Picture, {
                    name: 'failedIcon',
                    portId: 'icon' + (tail || ''),
                    width: iconSize.width,
                    height: iconSize.height,
                    source: failedConfig.icon,

                    margin: new go.Margin(0, 0, 0, iconLeft),
                },

                new go.Binding('margin', '', function() {
                    var left = isDefault ?
                        getCopyIconMarginLeft() :
                        0;
                    return new go.Margin(0, 0, 0, left);
                }),
            );

            return icon;
        }

        function getMarginLeft() {
            return deviceConfig.details.left + verify;
        }

        function getCopyIconMarginLeft() {
            return -(deviceConfig.details.left / 2 + verify);
        }

    }

})(NetBrain);