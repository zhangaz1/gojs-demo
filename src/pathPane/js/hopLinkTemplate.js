;
(function(ns) {
    var $ = go.GraphObject.make;

    ns.hopLinkTemplate = {
        createHopLinkTemplate: createHopLinkTemplate,
    };

    return void(0);

    function createHopLinkTemplate(option) {
        var hopLinkStyle = option.config.style.links.hopLink;
        return $(
            go.Link, {
                routing: go.Link.Orthogonal,
            },
            $(go.Shape, {
                    strokeWidth: 2,
                    stroke: hopLinkStyle.color,
                },
                new go.Binding('stroke', 'color'),
            ),
        );
    }
})(NetBrain);