;
(function(ns) {
    var $ = go.GraphObject.make;
    var createLinkShapeByStyle = ns.utils.createLinkShapeByStyle;

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

            createLinkShapeByStyle(hopLinkStyle),
        );
    }
})(NetBrain);