$(function() {
    var $ = go.GraphObject.make;
    var myDiagram =
        $(go.Diagram, "myDiagramDiv", {
            initialContentAlignment: go.Spot.Center, // center Diagram contents
            "undoManager.isEnabled": true // enable Ctrl-Z to undo and Ctrl-Y to redo
        });

    // the template we defined earlier
    myDiagram.nodeTemplate =
        $(go.Node, "Horizontal", {
                background: "#44CCFF"
            },
            $(go.Picture, {
                    margin: 10,
                    width: 50,
                    height: 50,
                    background: "red"
                },
                new go.Binding("source")),
            $(go.TextBlock, "Default Text", {
                    margin: 12,
                    stroke: "white",
                    font: "bold 16px sans-serif"
                },
                new go.Binding("text", "name"))
        );

    var model = $(go.TreeModel);
    model.nodeDataArray = [ // the "key" and "parent" property names are required,
        // but you can add whatever data properties you need for your app
        {
            key: "2",
            parent: "1",
            name: "Demeter",
            source: "imgs/cat2.png"
        }, {
            key: "3",
            parent: "1",
            name: "Copricat",
            source: "imgs/cat3.png"
        }, {
            key: "4",
            parent: "3",
            name: "Jellylorum",
            source: "imgs/cat4.png"
        }, {
            key: "5",
            parent: "3",
            name: "Alonzo",
            source: "imgs/cat5.png"
        }, {
            key: "1",
            name: "Don Meow",
            source: "imgs/cat1.png"
        }, {
            key: "6",
            parent: "2",
            name: "Munkustrap",
            source: "imgs/cat6.png"
        }
    ];

    myDiagram.layout =
        $(go.TreeLayout, {
            angle: 270,
            layerSpacing: 70
        });

    myDiagram.model = model;

    window.g = {
        make: $,
        diagram: myDiagram,
        model: model
    };
});
