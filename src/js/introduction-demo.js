$(function() {
    // For conciseness. See the "Building Parts" intro page for more
    var G = go.GraphObject.make;

    var diagram = G(go.Diagram, 'myDiagramDiv', {
        initialContentAlignment: go.Spot.Center
    });

    diagram.add(
        G(go.Part,
            'Horizontal',
            G(
                go.TextBlock, {
                    text: '文本块',
                    background: 'blue'
                }
            ),
            G(
                go.TextBlock, {
                    text: '文本块颜色',
                    stroke: '#492'
                }
            ),
            G(
                go.TextBlock, {
                    text: '文本块背景',
                    background: '#492'
                }
            ),
            G(
                go.TextBlock, {
                    text: '文本块字体',
                    font: 'bold 22px serif'
                }
            )
        )
    );

    window.g = {
        make: G,
        diagram: diagram
    };
});
