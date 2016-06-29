$(function() {
    // For conciseness. See the "Building Parts" intro page for more
    var G = go.GraphObject.make;

    var diagram = G(go.Diagram, 'myDiagramDiv', {
        initialContentAlignment: go.Spot.Center
    });

    diagram.add(G(
        go.Part,
        'Horizontal',
        G(
            go.Shape,
            'Rectangle', {
                width: 40,
                height: 60,
                margin: 4,
                fill: null
            }
        ),
        G(
            go.Shape,
            'Ellipse', {
                desiredSize: new go.Size(40, 60),
                margin: 4,
                fill: null
            }
        )
    ));

    window.g = {
        make: G,
        diagram: diagram
    };
});
