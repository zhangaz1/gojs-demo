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
                text: '文本块默认',
                background: '#492',
                margin: 1,
                width: 40
            }
        ),
        G(
            go.TextBlock, {
                text: '文本块不换行剪裁',
                background: '#492',
                margin: 1,
                width: 75,
                wrap: go.TextBlock.None
            }
        ),
        G(
            go.TextBlock, {
                text: '文本块换行  Wrap',
                background: '#492',
                margin: 1,
                width: 75,
                wrap: go.TextBlock.WrapDesiredSize
            }
        ),
        G(
            go.TextBlock, {
                text: '文本块清理边距  Wrap',
                background: '#492',
                margin: 1,
                width: 120,
                wrap: go.TextBlock.WrapFit
            }
        )
    ));

    window.g = {
        make: G,
        diagram: diagram
    };
});
