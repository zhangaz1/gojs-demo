;
(function(ns) {
    var $ = go.GraphObject.make;

    ns.nodeTemplates = {
        device: createDeviceTemplate(),
    };

    return void(0);

    function createDeviceTemplate() {
        return $(go.Node, "Auto", {
                locationSpot: go.Spot.Center
            },
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Shape, "Rectangle", {
                    stroke: null,
                    strokeWidth: 0,
                    fill: "white", // the default fill, if there is no data-binding
                    portId: "",
                    cursor: "pointer", // the Shape is the port, not the whole Node
                    // allow all kinds of links from and to this port
                    fromLinkable: true,
                    fromLinkableSelfNode: true,
                    fromLinkableDuplicates: true,
                    toLinkable: true,
                    toLinkableSelfNode: true,
                    toLinkableDuplicates: true
                },
                new go.Binding("fill", "color")),
            $(go.TextBlock, {
                    font: "bold 18px sans-serif",
                    stroke: '#111',
                    margin: 8, // make some extra space for the shape around the text
                    isMultiline: false, // don't allow newlines in text
                    editable: true // allow in-place editing by user
                },
                new go.Binding("text", "text").makeTwoWay())
        );
    }

})(NetBrain);