;
(function(ns) {
    var $ = go.GraphObject.make;

    ns.rangeLinkTemplate = {
        createRangeLinkTemplate: createRangeLinkTemplate,
    };

    return void(0);

    function createRangeLinkTemplate() {
        return $(
            go.Link, {
                routing: go.Link.Orthogonal,
            },
            $(go.Shape, {
                    strokeWidth: 2
                },
                new go.Binding('stroke', 'color')
            ),
        );
    }
})(NetBrain);