$(function() {
    var diagram = new go.Diagram('diagram');
    var g = go.GraphObject.make;



    window.g = {
        make: g,
        diagram: diagram
    };
});
