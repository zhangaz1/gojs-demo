$(function() {
    // For conciseness. See the "Building Parts" intro page for more
    var $ = go.GraphObject.make;

    var diagram = $(go.Diagram, 'myDiagramDiv', {
        initialContentAlignment: go.Spot.Center
    });

    diagram.nodeTemplate =
        $(go.Node, "Auto",
            $(go.Shape, {
                fill: $(go.Brush, go.Brush.Linear, {
                    0: "white",
                    1: "lightblue"
                }),
                stroke: "darkblue",
                strokeWidth: 2
            }),
            $(go.Panel, "Table", {
                    defaultAlignment: go.Spot.Left,
                    margin: 4
                },
                $(go.RowColumnDefinition, {
                    column: 1,
                    width: 4
                }),
                $(go.TextBlock, {
                        row: 0,
                        column: 0,
                        columnSpan: 3,
                        alignment: go.Spot.Center
                    }, {
                        font: "bold 12pt sans-serif"
                    },
                    new go.Binding("text", "key")),
                $(go.TextBlock, "First: ", {
                    row: 1,
                    column: 0
                }),
                $(go.TextBlock, {
                        row: 1,
                        column: 2
                    },
                    new go.Binding("text", "prop1")),
                $(go.TextBlock, "Second: ", {
                    row: 2,
                    column: 0
                }),
                $(go.TextBlock, {
                        row: 2,
                        column: 2
                    },
                    new go.Binding("text", "prop2"))
            )
        );

    diagram.model.nodeDataArray = [{
        key: "Alpha",
        prop1: "value of 'prop1'",
        prop2: "the other property"
    }];

    window.g = {
        make: $,
        diagram: diagram
    };
});
