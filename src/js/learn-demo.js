$(function() {
    var $ = go.GraphObject.make;
    var myDiagram =
        $(go.Diagram, "myDiagramDiv", {
            initialContentAlignment: go.Spot.Center, // center Diagram contents
            "undoManager.isEnabled": true // enable Ctrl-Z to undo and Ctrl-Y to redo
        });

    var model = $(go.GraphLinksModel);
    model.nodeDataArray = [{
        key: "A"
    }, {
        key: "B"
    }, {
        key: "A"
    }];
    model.linkDataArray = [{
        from: "A",
        to: "B"
    }, {
        from: "B",
        to: "A"
    }];

    myDiagram.model = model;

    window.g = {
        make: make,
        diagram: myDiagram,
        model: model
    };
});
