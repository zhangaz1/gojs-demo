;
(function(ns) {

    var $ = go.GraphObject.make;

    ns.failedTemplate = {
        createFailedTemplate: createFailedTemplate
    };

    return void(0);

    function createFailedTemplate(option) {
        var nodeConfig = option.config.style.nodes;
        var failedConfig = nodeConfig.failed;

        return $(
            go.Node,
            'Auto', {
                name: 'failedNode',
                locationSpot: go.Spot.Center,
            },
            new go.Binding('location', 'location', go.Point.parse),

            createFailedIconTemplate(),
        );

        // return void(0);

        function createFailedIconTemplate() {
            var iconSize = failedConfig.iconSize;
            return $(
                go.Picture, {
                    name: 'failedIcon',
                    portId: 'icon',
                    width: iconSize.width,
                    height: iconSize.height,
                    source: failedConfig.icon,
                },
            );
        }

        // function calculateLocation(data, graphObject) {
        //     var inLink = graphObject.part.findLinksInto('icon').first();
        //     if (inLink) {
        //         var x = inLink.points.first().x;
        //         data.location = x + ' ' + graphObject.part.actualBounds.y;
        //     }
        // }

    }

})(NetBrain);