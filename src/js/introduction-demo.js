$(function() {
    // For conciseness. See the "Building Parts" intro page for more
    var $ = go.GraphObject.make;

    var diagram = $(go.Diagram, 'myDiagramDiv', {
        initialContentAlignment: go.Spot.Center
    });

    diagram.nodeTemplate =
        $(go.Node, "Auto",
            $(go.Shape,
                new go.Binding("figure", "fig"),
                new go.Binding("fill", "color")),
            $(go.TextBlock, {
                    margin: 5,
                    editable: true
                },
                new go.Binding("text", "key"))
        );

    diagram.model.nodeDataArray = [{
        key: "Alpha",
        color: "lightblue",
        fig: "RoundedRectangle"
    }, {
        key: "Beta",
        color: "lightblue",
        fig: "Ellipse"
    }, {
        key: "Gamma",
        color: "lightblue",
        fig: "Hexagon"
    }, {
        key: "Delta",
        color: "lightblue",
        fig: "FramedRectangle"
    }, {
        key: "Epsilon",
        color: "lightblue",
        fig: "Cloud"
    }, {
        key: "Zeta",
        color: "lightblue",
        fig: "Procedure"
    }];

    window.g = {
        make: $,
        diagram: diagram
    };
});
