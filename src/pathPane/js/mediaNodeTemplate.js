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

                width: nodeConfig.width,
            },
            new go.Binding('location', 'location', go.Point.parse),

            createDeviceNameTemplate(),
        );

        // return void(0);

        function createDeviceNameTemplate() {
            return $(
                go.Panel, 'Horizontal', {
                    name: 'mediaNamePanel',
                    alignment: go.Spot.Left,
                    height: 50,
                    margin: new go.Margin(0, 0, 0, 18),
                },
                $(
                    go.Picture, {
                        name: 'mediaIcon',
                        portId: 'media',
                        width: 16,
                        height: 16,
                        source: mediaConfig.icon,
                    },
                    new go.Binding('source', 'icon'),
                ),
                $(
                    go.TextBlock, {
                        name: 'mediaHostNameText',
                        font: 'bold 12px sans-serif',
                        stroke: '#111',
                        isMultiline: false,
                    },
                    new go.Binding('text', 'name').makeTwoWay(),
                ),
            );
        }

    }

})(NetBrain);