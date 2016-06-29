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
            go.TextBlock, {
                text: '文本块宽度和高度',
                background: '#492',
                margin: 5
            }
        ),
        G(
            go.TextBlock, {
                text: '文本块宽度和高度',
                background: '#492',
                margin: 5,
                width: 100,
                height: 30
            }
        ),
        G(
            go.TextBlock, {
                text: '文本块宽度和高度',
                background: '#492',
                margin: 5,
                width: 60,
                height: 30
            }
        ),
        G(
            go.TextBlock, {
                text: '文本块宽度和高度',
                background: '#492',
                margin: 5,
                width: 60,
                height: 20
            }
        ),
        G(
            go.TextBlock, {
                text: '文本块宽度和高度',
                background: '#492',
                margin: 5,
                width: 60,
                height: 10
            }
        )
    ));
    window.g = {
        make: G,
        diagram: diagram
    };
});
