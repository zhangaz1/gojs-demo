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
                column: 0,
                figure: "Club",
                width: 40,
                height: 40,
                margin: 4,
                fill: "green"
            }),
            $(go.TextBlock, "green", {
                row: 1,
                column: 0
            }),
            $(go.Shape, {
                row: 0,
                column: 1,
                figure: "Club",
                width: 40,
                height: 40,
                margin: 4,
                fill: "white"
            }),
            $(go.TextBlock, "white", {
                row: 1,
                column: 1
            }),
            $(go.Shape, {
                row: 0,
                column: 2,
                figure: "Club",
                width: 40,
                height: 40,
                margin: 4,
                fill: "transparent"
            }),
            $(go.TextBlock, "transparent", {
                row: 1,
                column: 2
            }),
            $(go.Shape, {
                row: 0,
                column: 3,
                figure: "Club",
                width: 40,
                height: 40,
                margin: 4,
                fill: null
            }),
            $(go.TextBlock, "null", {
                row: 1,
                column: 3
            })
        ));

    window.g = {
        make: $,
        diagram: diagram
    };
});
