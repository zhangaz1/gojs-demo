$(function() {
    // For conciseness. See the "Building Parts" intro page for more
    var g = go.GraphObject.make;

    var diagram = g(go.Diagram, 'myDiagramDiv', {
        initialContentAlignment: go.Spot.Center
    });

    var node1 = g(
        go.Node,
        'Auto',
        g(
            go.Shape, {
                fill: '#493'
            }
        ),
        g(
            go.TextBlock, {
                text: 'node1'
            },
            new go.Binding('text', 'key')
        )
    );

    diagram.nodeTemplate = node1;

    diagram.add(node1);

    var nodeDataArray = [{
        key: "Alpha"
    }, {
        key: "Beta"
    }];
    var linkDataArray = [{
        from: "Alpha",
        to: "Beta"
    }];

    diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

    window.g = {
        make: g,
        diagram: diagram
    };
});
