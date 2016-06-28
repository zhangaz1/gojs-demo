$(function() {
    // For conciseness. See the "Building Parts" intro page for more
    var $ = go.GraphObject.make;

    var diagram = $(go.Diagram, 'myDiagramDiv', {
        initialContentAlignment: go.Spot.Center
    });

    diagram.add(
        $(go.Part, "Horizontal",
            $(go.Panel, "Vertical", {
                    width: 150,
                    defaultStretch: go.GraphObject.Horizontal
                },
                $(go.TextBlock, {
                    text: "textAlign: 'left'",
                    background: "lightgreen",
                    margin: 2,
                    textAlign: "left"
                }),
                $(go.TextBlock, {
                    text: "textAlign: 'center'",
                    background: "lightgreen",
                    margin: 2,
                    textAlign: "center"
                }),
                $(go.TextBlock, {
                    text: "textAlign: 'right'",
                    background: "lightgreen",
                    margin: 2,
                    textAlign: "right"
                })
            ),
            $(go.Panel, "Vertical", {
                    width: 150,
                    defaultStretch: go.GraphObject.None
                },
                $(go.TextBlock, {
                    text: "alignment: Left",
                    background: "lightgreen",
                    margin: 2,
                    alignment: go.Spot.Left
                }),
                $(go.TextBlock, {
                    text: "alignment: Center",
                    background: "lightgreen",
                    margin: 2,
                    alignment: go.Spot.Center
                }),
                $(go.TextBlock, {
                    text: "alignment: Right",
                    background: "lightgreen",
                    margin: 2,
                    alignment: go.Spot.Right
                })
            )
        ));

    window.g = {
        make: $,
        diagram: diagram
    };
});
