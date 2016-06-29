$(function() {
    // For conciseness. See the "Building Parts" intro page for more
    var $ = go.GraphObject.make;

    var diagram = $(go.Diagram, 'myDiagramDiv', {
        initialContentAlignment: go.Spot.Center
    });

    diagram.nodeTemplate =
        $(go.Node, "Auto",
            $(go.Shape, "Rectangle",
                new go.Binding("fill", "color")),
            $(go.TextBlock, {
                    margin: 5
                },
                new go.Binding("text", "key"))
        );

    diagram.model.nodeDataArray = [{
        key: "Alpha",
        color: "lightblue"
    }];

    window.g = {
        make: $,
        diagram: diagram
    };
});
