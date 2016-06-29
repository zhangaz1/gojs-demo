$(function() {
    // For conciseness. See the "Building Parts" intro page for more
    var G = go.GraphObject.make;

    var diagram = G(go.Diagram, 'myDiagramDiv', {
        initialContentAlignment: go.Spot.Center
    });

    diagram.add(G(
        go.Part,
        go.Panel.Position, {
            background: '#eee',
            padding: 50
        },
        G(
            go.TextBlock, {
                text: '0, 0',
                background: '#394',
                position: new go.Point(-50, -50)
            }
        ),
        G(
            go.TextBlock, {
                text: '0, 0',
                background: '#394'
            }
        ),
        G(
            go.TextBlock, {
                text: '100, 100',
                background: '#394',
                position: new go.Point(100, 100)
            }
        ),
        G(
            go.TextBlock, {
                text: '0, 100',
                background: '#394',
                position: new go.Point(0, 100)
            }
        ),
        G(
            go.TextBlock, {
                text: '100, 000',
                background: '#394',
                position: new go.Point(100, 0)
            }
        )
    ));

    window.g = {
        make: G,
        diagram: diagram
    };
});
