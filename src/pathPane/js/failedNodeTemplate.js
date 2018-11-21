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
            // new go.Binding('location', '', calculateLocation),

            createFailedIconTemplate(),
        );

        // return void(0);

        function createFailedIconTemplate() {
            return $(
                go.Picture, {
                    name: 'failedIcon',
                    portId: 'icon',
                    width: 16,
                    height: 16,
                    source: failedConfig.icon,
                },
                new go.Binding('source', 'icon'),
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