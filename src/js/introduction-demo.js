$(function() {
    // For conciseness. See the "Building Parts" intro page for more
    var $ = go.GraphObject.make;

    var diagram = $(go.Diagram, 'myDiagramDiv', {
        initialContentAlignment: go.Spot.Center
    });

    var W_geometry = go.Geometry.parse(
        "M 0,0 L 10,50 20,10 30,50 40,0", false);

    diagram.add(
        $(go.Part, "Horizontal",
            $(go.Shape, {
                geometry: W_geometry,
                strokeWidth: 2
            }),
            $(go.Shape, {
                geometry: W_geometry,
                stroke: "blue",
                strokeWidth: 10,
                strokeJoin: "miter",
                strokeCap: "butt"
            }),
            $(go.Shape, {
                geometry: W_geometry,
                stroke: "blue",
                strokeWidth: 10,
                strokeJoin: "miter",
                strokeCap: "round"
            }),
            $(go.Shape, {
                geometry: W_geometry,
                stroke: "blue",
                strokeWidth: 10,
                strokeJoin: "miter",
                strokeCap: "square"
            }),
            $(go.Shape, {
                geometry: W_geometry,
                stroke: "green",
                strokeWidth: 10,
                strokeJoin: "bevel",
                strokeCap: "butt"
            }),
            $(go.Shape, {
                geometry: W_geometry,
                stroke: "green",
                strokeWidth: 10,
                strokeJoin: "bevel",
                strokeCap: "round"
            }),
            $(go.Shape, {
                geometry: W_geometry,
                stroke: "green",
                strokeWidth: 10,
                strokeJoin: "bevel",
                strokeCap: "square"
            }),
            $(go.Shape, {
                geometry: W_geometry,
                stroke: "red",
                strokeWidth: 10,
                strokeJoin: "round",
                strokeCap: "butt"
            }),
            $(go.Shape, {
                geometry: W_geometry,
                stroke: "red",
                strokeWidth: 10,
                strokeJoin: "round",
                strokeCap: "round"
            }),
            $(go.Shape, {
                geometry: W_geometry,
                stroke: "red",
                strokeWidth: 10,
                strokeJoin: "round",
                strokeCap: "square"
            }),
            $(go.Shape, {
                geometry: W_geometry,
                stroke: "purple",
                strokeWidth: 2,
                strokeDashArray: [4, 2]
            }),
            $(go.Shape, {
                geometry: W_geometry,
                stroke: "purple",
                strokeWidth: 2,
                strokeDashArray: [6, 6, 2, 2]
            })
        ));

    window.g = {
        make: $,
        diagram: diagram
    };
});
