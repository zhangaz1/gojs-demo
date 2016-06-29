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
                angle: 0,
                scale: 1.5,
                fill: $(go.Brush, go.Brush.Linear, {
                    0.0: "blue",
                    1.0: "red"
                }),
                background: $(go.Brush, go.Brush.Linear, {
                    0.0: "yellow",
                    1.0: "green"
                }),
                areaBackground: $(go.Brush, go.Brush.Linear, {
                    0.0: "gray",
                    1.0: "lightgray"
                })
            }),
            $(go.Shape, {
                row: 0,
                column: 1,
                width: 10,
                fill: null,
                stroke: null
            }),
            $(go.Shape, {
                row: 0,
                column: 2,
                figure: "Club",
                width: 140,
                height: 10,
                angle: 45,
                scale: 1.5,
                fill: $(go.Brush, go.Brush.Linear, {
                    0.0: "blue",
                    1.0: "red"
                }),
                background: $(go.Brush, go.Brush.Linear, {
                    0.0: "yellow",
                    1.0: "green"
                }),
                areaBackground: $(go.Brush, go.Brush.Linear, {
                    0.0: "black",
                    1.0: "lightgray"
                })
            })
        ));

    window.g = {
        make: $,
        diagram: diagram
    };
});
