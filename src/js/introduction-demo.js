$(function() {
    // For conciseness. See the "Building Parts" intro page for more
    var g = go.GraphObject.make;

    var diagram = g(go.Diagram, 'myDiagramDiv', {
        initialContentAlignment: go.Spot.Center
    });

    diagram.add(g(
        go.Part,
        'Table', {
            background: '#ddd'
        },
        g(
            go.TextBlock, {
                text: '这里的文字会重叠',
                row: 0,
                column: 0
            }
        ),
        g(
            go.TextBlock, {
                text: '叠重会字文的里这',
                row: 0,
                column: 0
            }
        )
    ));

    window.g = {
        make: g,
        diagram: diagram
    };
});
