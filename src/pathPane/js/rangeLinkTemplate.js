;
(function(ns) {
    var $ = go.GraphObject.make;
    var RangeLink = ns.RangeLink;

    ns.rangeLinkTemplate = {
        createRangeLinkTemplate: createRangeLinkTemplate,
    };

    return void(0);

    function createRangeLinkTemplate() {
        return $(
            RangeLink, {
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