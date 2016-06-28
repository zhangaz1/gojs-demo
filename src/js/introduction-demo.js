$(function() {
    // For conciseness. See the "Building Parts" intro page for more
    var $ = go.GraphObject.make;

    var diagram = $(go.Diagram, 'myDiagramDiv', {
        initialContentAlignment: go.Spot.Center
    });

    diagram.add(
        $(go.Part,
            $(go.TextBlock, {
                text: "select and then click to edit",
                background: "lightblue",
                editable: true,
                isMultiline: false
            })
        ));
    diagram.add(
        $(go.Part,
            $(go.TextBlock, {
                text: "this one allows embedded newlines",
                background: "lightblue",
                editable: true
            })
        ));

    window.g = {
        make: $,
        diagram: diagram
    };
});
