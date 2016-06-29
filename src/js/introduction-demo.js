$(function() {
    // For conciseness. See the "Building Parts" intro page for more
    var g = go.GraphObject.make;

    var diagram = g(go.Diagram, 'myDiagramDiv', {
        initialContentAlignment: go.Spot.Center
    });

    var nodeDataArray = [{
        key: "Alpha"
    }, {
        key: "Beta"
    }];
    var linkDataArray = [{
        from: "Alpha",
        to: "Beta"
    }];
    diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

    window.g = {
        make: g,
        diagram: diagram
    };
});
