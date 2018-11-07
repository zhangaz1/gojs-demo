;
(function(ns) {
    var $ = go.GraphObject.make;

    ns.nodeTemplates = {
        device: createDeviceTemplate(),
    };

    return void(0);

    function createDeviceTemplate() {
        return $(go.Node, 'Auto', {
                locationSpot: go.Spot.Center
            },
            new go.Binding('location', 'location', go.Point.parse), // .makeTwoWay(go.Point.stringify),

            createDeviceBackground(),
            $(go.TextBlock, {
                    font: 'bold 18px sans-serif',
                    stroke: '#111',
                    margin: 8, // make some extra space for the shape around the text
                    isMultiline: false, // don't allow newlines in text
                    editable: true // allow in-place editing by user
                },
                new go.Binding('text', 'name').makeTwoWay())
        );
    }

    function createDeviceBackground() {
        return $(
            go.Shape,
            'Rectangle', {
                stroke: '#C8DCEA',
                strokeWidth: 1,
                fill: '#ECF5FC',
            },
            new go.Binding('fill', 'color'),
            new go.Binding('stroke', 'borderColor')
        );
    }

})(NetBrain);