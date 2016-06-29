$(function() {
    // For conciseness. See the "Building Parts" intro page for more
    var G = go.GraphObject.make;

    var diagram = G(go.Diagram, 'myDiagramDiv', {
        initialContentAlignment: go.Spot.Center
    });

    diagram.add(G(
        go.Part,
        'Vertical',
        G(
            go.TextBlock, {
                text: '选中后，单击编辑，不可换行',
                background: '#492',
                margin: 5,
                editable: true,
                isMultiline: false
            }
        ),
        G(
            go.TextBlock, {
                text: '允许嵌入换行',
                background: '#492',
                margin: 5,
                editable: true
            }
        )
    ));

    window.g = {
        make: G,
        diagram: diagram
    };
});
