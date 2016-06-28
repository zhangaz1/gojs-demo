$(function() {
    // For conciseness. See the "Building Parts" intro page for more
    var $ = go.GraphObject.make;

    var diagram = new go.Diagram('myDiagramDiv');

    diagram.add(
        $(go.Part, "Vertical", {
                margin: 100
            },
            $(go.TextBlock, {
                text: "a Text Block",
                margin: 100
            }),
            $(go.TextBlock, {
                text: "a Text Block",
                stroke: "red"
            }),
            $(go.TextBlock, {
                text: "a Text Block",
                background: "lightblue"
            }),
            $(go.TextBlock, {
                text: "a Text Block",
                font: "bold 14pt serif"
            })
        ));

    window.g = {
        make: $,
        diagram: diagram
    };
});
