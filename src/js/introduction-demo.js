$(function() {
    // For conciseness. See the "Building Parts" intro page for more
    var g = go.GraphObject.make;

    var diagram = g(go.Diagram, 'myDiagramDiv', {
        initialContentAlignment: go.Spot.Center
    });

    diagram.nodeTemplate =
        g(go.Node, "Auto",
            g(go.Shape, {
                    figure: "RoundedRectangle",
                    fill: "white"
                },
                new go.Binding("fill", "color")),
            g(go.TextBlock, {
                    margin: 5
                },
                new go.Binding("text", "key"))
        );

    var nodeDataArray = [{
        key: "Alpha",
        color: "lightblue"
    }, {
        key: "Beta",
        color: "pink"
    }];
    var linkDataArray = [{
        from: "Alpha",
        to: "Beta"
    }];
    diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

    diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

    window.g = {
        make: g,
        diagram: diagram
    };
});
