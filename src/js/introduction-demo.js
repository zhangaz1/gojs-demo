$(function() {
    var diagram = new go.Diagram('diagram');
    var g = go.GraphObject.make;

    diagram.nodeTemplate = g(
        go.Node,
        'Auto',
        g(
            go.Shape,
            'RoundedRectangle', {
                fill: '#fff'
            },
            new go.Binding('fill', 'color')
        ),
        g(
            go.TextBlock,
            new go.Binding('text', 'text')
        )
    )
    diagram.linkTemplate = g(
        go.Link,
        g(
            go.Shape,
            new go.Binding('stroke', 'color'),
            new go.Binding('strokeWidth', 'thick')
        ),
        g(
            go.Shape, {
                toArrow: 'OpenTriangle',
                fill: null
            }
        )
    )
    var nodeDataArray = [{
        key: '1',
        text: 'hello1',
        color: '#345'
    }, {
        key: '2',
        text: 'hello2',
        color: '#245'
    }, {
        key: '3',
        text: 'hello3'
    }]
    var linkDataArray = [{
        from: '1',
        to: '2',
        color: '#452',
        thick: 2
    }, {
        from: '2',
        to: '3',
        color: '#452',
        thick: 2
    }, ]
    diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

    window.g = {
        make: g,
        diagram: diagram
    };
});
