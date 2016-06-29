$(function() {
    // For conciseness. See the "Building Parts" intro page for more
    var $ = go.GraphObject.make;

    var diagram = $(go.Diagram, 'myDiagramDiv', {
        initialContentAlignment: go.Spot.Center
    });

    diagram.nodeTemplate =
        $(go.Node, "Auto", {
                locationSpot: go.Spot.Center
            },
            new go.Binding("location", "loc", go.Point.parse),
            $(go.Shape, "RoundedRectangle", {
                fill: "lightgray"
            }),
            $(go.TextBlock, {
                    margin: 5
                },
                new go.Binding("text", "key"))
        );

    diagram.linkTemplate =
        $(go.Link, {
                routing: go.Link.Orthogonal, // may be either Orthogonal or AvoidsNodes
                curve: go.Link.JumpOver
            },
            $(go.Shape),
            $(go.Shape, {
                toArrow: "Standard"
            })
        );

    var nodeDataArray = [{
        key: "Alpha",
        loc: "0 50"
    }, {
        key: "Beta",
        loc: "100 50"
    }, {
        key: "Alpha2",
        loc: "50 0"
    }, {
        key: "Beta2",
        loc: "50 100"
    }];
    var linkDataArray = [{
            from: "Alpha",
            to: "Beta"
        }, // these two links will cross
        {
            from: "Alpha2",
            to: "Beta2"
        }
    ];
    diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

    window.g = {
        make: $,
        diagram: diagram
    };
});
