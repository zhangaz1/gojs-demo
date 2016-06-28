$(function() {
    // For conciseness. See the "Building Parts" intro page for more
    var $ = go.GraphObject.make;

    var diagram = $(go.Diagram, 'myDiagramDiv', {
        initialContentAlignment: go.Spot.Center
    });

    diagram.add(
        $(go.Part, "Vertical",
            $(go.TextBlock, {
                text: "a Text Block\nwith three logical lines\nof text",
                background: "lightgreen",
                // padding: 5,
                margin: 20,
                isMultiline: false
            }),
            $(go.TextBlock, {
                text: "a Text Block\nwith three logical lines\nof text",
                background: "lightgreen",
                margin: 2,
                isMultiline: true
            }),
            $(go.TextBlock, {
                text: "a Text Block\nwith three logical lines\nof centered text",
                background: "lightgreen",
                margin: 2,
                isMultiline: true,
                textAlign: "center"
            }),
            $(go.TextBlock, {
                text: "a single line of centered text that should wrap because we will limit the width",
                background: "lightgreen",
                margin: 2,
                width: 80,
                wrap: go.TextBlock.WrapFit,
                textAlign: "center"
            })
        ));

    window.g = {
        make: $,
        diagram: diagram
    };
});
