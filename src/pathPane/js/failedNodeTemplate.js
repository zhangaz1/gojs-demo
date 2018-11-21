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
            return $(
                go.Picture, {
                    name: 'failedIcon',
                    portId: 'failed',
                    width: 16,
                    height: 16,
                    source: failedConfig.icon,
                },
                new go.Binding('source', 'icon'),
            );
        }

    }

})(NetBrain);