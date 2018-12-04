;
(function(netBrain) {
    var ns = netBrain.pathPaneView;

    var $ = go.GraphObject.make;

    ns.mediaTemplate = {
        createMediaTemplate: createMediaTemplate
    };

    return void(0);

    function createMediaTemplate(option) {
        var nodeConfig = option.config.style.nodes;
        var deviceConfig = nodeConfig.device;
        var mediaConfig = nodeConfig.media;
        var api = option.api;

        return $(
            go.Node,
            'Auto', {
                name: 'mediaNode',
                locationSpot: go.Spot.Center,
                padding: new go.Margin(1, 0, 1, 0),
                background: mediaConfig.borderColor ||
                    nodeConfig.borderColor,
            },

            new go.Binding('width', 'width'),
            new go.Binding('location', 'location', go.Point.parse),
            new go.Binding('background', 'borderColor'),

            createDeviceNameTemplate(),
        );

        // return void(0);

        function createDeviceNameTemplate() {
            var iconSize = mediaConfig.iconSize;
            return $(
                go.Panel,
                'Horizontal', {
                    name: 'mediaNamePanel',
                    height: mediaConfig.height,
                    background: mediaConfig.backgroundColor ||
                        nodeConfig.backgroundColor,
                },

                new go.Binding('padding', '', function() {
                    var verify = 35; // 与devicenodeIcon偏差
                    return new go.Margin(0, 0, 0, deviceConfig.details.left + verify);
                }),

                new go.Binding('background', 'backgroundColor'),

                $(
                    go.Picture, {
                        name: 'mediaIcon',
                        portId: 'icon',
                        width: iconSize.width,
                        height: iconSize.height,
                        source: mediaConfig.icon,
                    },
                    new go.Binding('source', '', function(data) {
                        return data.icon || api.getIcon(data);
                    }),
                ),
                $(
                    go.TextBlock, {
                        name: 'mediaHostNameText',
                        font: mediaConfig.font,
                        stroke: mediaConfig.color,
                        isMultiline: false,
                        margin: 5,
                    },
                    new go.Binding('text', 'name').makeTwoWay(),
                ),
            );
        }

    }

})(NetBrain);