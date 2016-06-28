$(function() {
    // For conciseness. See the "Building Parts" intro page for more
    var $ = go.GraphObject.make;

    var diagram = $(go.Diagram, 'myDiagramDiv', {
        initialContentAlignment: go.Spot.Center
    });

    diagram.add(
        $(go.Part, "Vertical",
            $(go.TextBlock, {
                text: "a Text Block",
                background: "lightgreen",
                margin: 2
            }),
            $(go.TextBlock, {
                text: "a Text Block",
                background: "lightgreen",
                margin: 2,
                width: 50,
                wrap: go.TextBlock.None
            }),
            $(go.TextBlock, {
                text: "a Text Block",
                background: "lightgreen",
                margin: 2,
                width: 50,
                wrap: go.TextBlock.WrapDesiredSize
            }),
            $(go.TextBlock, {
                text: "a Text Block",
                background: "lightgreen",
                margin: 2,
                width: 50,
                wrap: go.TextBlock.WrapFit
            })
        ));
    window.g = {
        make: $,
        diagram: diagram
    };
});
