$(function() {
    // For conciseness. See the "Building Parts" intro page for more
    var G = go.GraphObject.make;

    var diagram = G(go.Diagram, 'myDiagramDiv', {
        initialContentAlignment: go.Spot.Center
    });

    diagram.add(G(
        go.Part,
        'Table',
        G(
            go.Shape, {
                row: 0,
                column: 1,
                width: 40,
                height: 40,
                margin: 5,
                fill: '#492',
                strokeWidth: 0
            }
        ),
        G(
            go.Shape, {
                row: 0,
                column: 2,
                width: 40,
                height: 40,
                margin: 5,
                fill: '#492',
                strokeWidth: 0,
                angle: 15
            }
        ),
        G(
            go.Shape, {
                row: 0,
                column: 3,
                width: 40,
                height: 40,
                margin: 5,
                fill: '#492',
                strokeWidth: 0,
                scale: 1.5
            }
        )
    ));

    window.g = {
        make: G,
        diagram: diagram
    };
});
