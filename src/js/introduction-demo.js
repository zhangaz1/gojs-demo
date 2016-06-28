$(function() {
    // For conciseness. See the "Building Parts" intro page for more
    var $ = go.GraphObject.make;

    var diagram = $(go.Diagram, 'myDiagramDiv', {
        initialContentAlignment: go.Spot.Center
    });

    diagram.add(
        $(go.Part, "Horizontal",
            $(go.Shape, "Rectangle", {
                width: 40,
                height: 60,
                margin: 4,
                fill: null
            }),
            $(go.Shape, "RoundedRectangle", {
                width: 40,
                height: 60,
                margin: 4,
                fill: null
            }),
            $(go.Shape, "Ellipse", {
                width: 40,
                height: 60,
                margin: 4,
                fill: null
            }),
            $(go.Shape, "Triangle", {
                width: 40,
                height: 60,
                margin: 4,
                fill: null
            }),
            $(go.Shape, "Diamond", {
                width: 40,
                height: 60,
                margin: 4,
                fill: null
            })
        ));

    window.g = {
        make: $,
        diagram: diagram
    };
});
