;
(function(ns) {
    var $ = go.GraphObject.make;

    ns.hopLinkTemplate = {
        createHopLinkTemplate: createHopLinkTemplate,
    };

    return void(0);

    function createHopLinkTemplate(option) {
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