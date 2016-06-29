$(function() {
    // For conciseness. See the "Building Parts" intro page for more
    var g = go.GraphObject.make;

    var diagram = g(go.Diagram, 'myDiagramDiv', {
        initialContentAlignment: go.Spot.Center
    });

    diagram.add(g(
        go.Part,
        g(
            go.Panel,
            'Table', {
                defaultAlignment: go.Spot.Left
            },
            g(
                go.RowColumnDefinition, {
                    column: 0,
                    width: 200
                }
            ),
            g(
                go.RowColumnDefinition, {
                    column: 1,
                    width: 15,
                }
            ),
            g(
                go.Panel,
                'Auto', {
                    row: 0,
                    column: 0,
                    alignment: go.Spot.Left
                },
                g(
                    go.Shape,
                    'RoundedRectangle', {
                        fill: '#493'
                    }
                ),
                g(
                    go.TextBlock,
                    'auot panel'
                )
            ),
            g(
                go.TextBlock, {
                    text: 'alignment: left',
                    row: 0,
                    column: 2
                }
            ),
            g(
                go.Panel,
                'Auto', {
                    row: 1,
                    column: 0,
                    alignment: go.Spot.Center
                },
                g(
                    go.Shape,
                    'RoundedRectangle', {
                        fill: '#493'
                    }
                ),
                g(
                    go.TextBlock,
                    'auto panel'
                )
            ),
            g(
                go.TextBlock, {
                    text: 'alignment: center',
                    row: 1,
                    column: 2
                }
            ),
            g(
                go.Panel,
                'Auto', {
                    row: 2,
                    column: 0,
                    alignment: go.Spot.Right,
                    stretch: go.GraphObject.Fill
                },
                g(
                    go.Shape,
                    'RoundedRectangle', {
                        fill: '#493'
                    }
                ),
                g(
                    go.TextBlock,
                    'auto panel'
                )
            ),
            g(
                go.TextBlock, {
                    text: 'alignment: right',
                    row: 2,
                    column: 2
                }
            )
        )
    ));

    window.g = {
        make: g,
        diagram: diagram
    };
});
