$(function() {
    // For conciseness. See the "Building Parts" intro page for more
    var $ = go.GraphObject.make;

    var diagram = $(go.Diagram, 'myDiagramDiv', {
        initialContentAlignment: go.Spot.Center
    });

    diagram.nodeTemplate =
        $(go.Node, "Spot",
            // the main content:
            $(go.Panel, "Vertical",
                $(go.Picture, {
                        maxSize: new go.Size(50, 50)
                    },
                    new go.Binding("source", "img")),
                $(go.TextBlock, {
                        margin: new go.Margin(3, 0, 0, 0)
                    },
                    new go.Binding("text", "text"),
                    new go.Binding("stroke", "error", function(err) {
                        return err ? "red" : "black"
                    }))
            ),
            // decorations:
            $(go.Shape, "TriangleUp", {
                    alignment: go.Spot.TopLeft,
                    fill: "yellow",
                    width: 14,
                    height: 14,
                    visible: false
                },
                new go.Binding("visible", "info", function(i) {
                    return i ? true : false;
                })),
            $(go.Shape, "StopSign", {
                    alignment: go.Spot.TopRight,
                    fill: "red",
                    width: 14,
                    height: 14,
                    visible: false
                },
                new go.Binding("visible", "error")
            ), {
                toolTip: $(go.Adornment, "Auto",
                    $(go.Shape, {
                            fill: "#FFFFCC"
                        },
                        new go.Binding("visible", "info", function(i) {
                            return i ? true : false;
                        })),
                    $(go.TextBlock, {
                            margin: 4
                        },
                        new go.Binding("text", "info"))
                )
            }
        );

    diagram.model.nodeDataArray = [{
        text: "kitten",
        img: "images/50x40.png",
        info: ""
    }, {
        text: "kitten",
        img: "images/50x40.png",
        error: true,
        info: "shredded curtains"
    }];

    window.g = {
        make: $,
        diagram: diagram
    };
});
