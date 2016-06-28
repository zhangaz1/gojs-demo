$(function() {
    // For conciseness. See the "Building Parts" intro page for more
    var $ = go.GraphObject.make;

    var diagram = $(go.Diagram, 'myDiagramDiv', {
        initialContentAlignment: go.Spot.Center
    });

    diagram.add(
        $(go.Part, "Horizontal",
            $(go.Shape, {
                figure: "Club",
                width: 40,
                height: 40,
                margin: 4
            }), // default fill and stroke are "black"
            $(go.Shape, {
                figure: "Club",
                width: 40,
                height: 40,
                margin: 4,
                fill: "green"
            }),
            $(go.Shape, {
                figure: "Club",
                width: 40,
                height: 40,
                margin: 4,
                fill: "green",
                stroke: null
            }),
            $(go.Shape, {
                figure: "Club",
                width: 40,
                height: 40,
                margin: 4,
                fill: null,
                stroke: "green"
            }),
            $(go.Shape, {
                figure: "Club",
                width: 40,
                height: 40,
                margin: 4,
                fill: null,
                stroke: "green",
                strokeWidth: 3
            }),
            $(go.Shape, {
                figure: "Club",
                width: 40,
                height: 40,
                margin: 4,
                fill: null,
                stroke: "green",
                strokeWidth: 6
            }),
            $(go.Shape, {
                figure: "Club",
                width: 40,
                height: 40,
                margin: 4,
                fill: "green",
                background: "orange"
            })
        ));

    window.g = {
        make: $,
        diagram: diagram
    };
});
