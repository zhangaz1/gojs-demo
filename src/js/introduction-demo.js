$(function() {
    // For conciseness. See the "Building Parts" intro page for more
    var $ = go.GraphObject.make;

    var diagram = $(go.Diagram, 'myDiagramDiv', {
        initialContentAlignment: go.Spot.Center
    });

    diagram.nodeTemplate =
        $(go.Node, "Auto",
            new go.Binding("location", "loc", go.Point.parse),
            $(go.Shape, "RoundedRectangle", {
                fill: "lightgray"
            }),
            $(go.TextBlock, {
                    margin: 5
                },
                new go.Binding("text", "key"))
        );

    diagram.linkTemplate =
        $(go.Link, // the whole link panel
            $(go.Shape)); // the link shape, default black stroke

    var nodeDataArray = [{
        key: "Alpha",
        loc: "0 0"
    }, {
        key: "Beta",
        loc: "100 50"
    }];
    var linkDataArray = [{
        from: "Alpha",
        to: "Beta"
    }];
    diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);


    window.g = {
        make: $,
        diagram: diagram
    };
});
