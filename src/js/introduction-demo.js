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
            }
        )
    );

    diagram.add(node1);

    var node2 = g(
        go.Node,
        'Auto',
        g(
            go.Shape, {
                fill: '#943'
            }
        ),
        g(
            go.TextBlock, {
                text: 'node1'
            }
        )
    );

    diagram.add(node2);

    diagram.add(g(
        go.Link, {
            fromNode: node1,
            toNode: node2
        },
        g(
            go.Shape
        )
    ));

    window.g = {
        make: g,
        diagram: diagram
    };
});
