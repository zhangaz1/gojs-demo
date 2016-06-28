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
                width: 100,
                height: 33
            }),
            $(go.TextBlock, {
                text: "a Text Block",
                background: "lightgreen",
                margin: 2,
                width: 60,
                height: 33
            }),
            $(go.TextBlock, {
                text: "a Text Block",
                background: "lightgreen",
                margin: 2,
                width: 50,
                height: 22
            }),
            $(go.TextBlock, {
                text: "a Text Block",
                background: "lightgreen",
                margin: 2,
                width: 40,
                height: 9
            })
        ));

    window.g = {
        make: $,
        diagram: diagram
    };
});
