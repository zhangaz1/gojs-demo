$(function() {
    // For conciseness. See the "Building Parts" intro page for more
    var $ = go.GraphObject.make;

    var diagram = $(go.Diagram, 'myDiagramDiv', {
        initialContentAlignment: go.Spot.Center
    });

    diagram.add(
        $(go.Part, "Table",
            $(go.Shape, {
                row: 0,
                column: 1,
                figure: "Club",
                fill: "green",
                width: 40,
                height: 40,
            }), // default angle is zero; default scale is one
            $(go.Shape, {
                row: 0,
                column: 2,
                figure: "Club",
                fill: "green",
                width: 40,
                height: 40,
                angle: -90
            }),
            $(go.Shape, {
                row: 0,
                column: 3,
                figure: "Club",
                fill: "green",
                width: 40,
                height: 40,
                scale: 5
            }),
            $(go.Shape, {
                row: 0,
                column: 4,
                figure: "Club",
                fill: "green",
                width: 40,
                height: 40,
                angle: 30,
                scale: 1.5
            })
        ));

    window.g = {
        make: $,
        diagram: diagram
    };
});
