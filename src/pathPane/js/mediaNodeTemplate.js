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
                    height: 35,
                },
                new go.Binding('margin', '', calculateIconMargin),
                $(
                    go.Picture, {
                        name: 'mediaIcon',
                        portId: 'icon',
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
                        margin: 5,
                    },
                    new go.Binding('text', 'name').makeTwoWay(),
                ),
            );
        }

        function calculateIconMargin(data, graphObject) {
            var inLink = graphObject.part.findLinksInto('icon').first();
            if (inLink) {
                var bounds = graphObject.part.actualBounds;
                var left = inLink.points.first().x -
                    bounds.x -
                    graphObject.findObject('mediaIcon').width / 2;
                return new go.Margin(0, 0, 0, left);
            }
        }

    }

})(NetBrain);