$(function() {
    // For conciseness. See the "Building Parts" intro page for more
    var G = go.GraphObject.make;

    var diagram = G(go.Diagram, 'myDiagramDiv', {
        initialContentAlignment: go.Spot.Center
    });

    diagram.add(G(
        go.Part,
        go.Panel.Horizontal, {
            position: new go.Point(500, 0),
            location: new go.Point(100, 200), // ?区别

            background: '#ddd',
            height: 150
        },
        G(
            go.Shape, {
                width: 30,
                height: 50,
                fill: '#394',
                alignment: go.Spot.Top //center bottom
            }
        ),
        G(
            go.Shape, {
                width: 30,
                height: 100,
                fill: '#394'
            }
        )
    ));

    window.g = {
        make: G,
        diagram: diagram
    };
});
