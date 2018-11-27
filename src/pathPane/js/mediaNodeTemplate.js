;
(function(ns) {

    var $ = go.GraphObject.make;

    ns.mediaTemplate = {
        createMediaTemplate: createMediaTemplate
    };

    return void(0);

    function createMediaTemplate(option) {
        var nodeConfig = option.config.style.nodes;
        var mediaConfig = nodeConfig.media;

        return $(
            go.Node,
            'Auto', {
                name: 'mediaNode',
                locationSpot: go.Spot.Center,
                padding: new go.Margin(1, 0, 1, 0),
                background: nodeConfig.borderColor,
            },
            new go.Binding('width', 'width'),
            new go.Binding('location', 'location', go.Point.parse),

            createDeviceNameTemplate(),
        );

        // return void(0);

        function createDeviceNameTemplate() {
            var iconSize = mediaConfig.iconSize;
            return $(
                go.Panel, 'Horizontal', {
                    name: 'mediaNamePanel',
                    height: mediaConfig.height,
                },
                new go.Binding('margin', 'iconMargin', go.Margin.parse),
                $(
                    go.Picture, {
                        name: 'mediaIcon',
                        portId: 'icon',
                        width: iconSize.width,
                        height: iconSize.height,
                        source: mediaConfig.icon,
                    },
                    new go.Binding('source', 'icon'),
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