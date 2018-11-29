;
(function(ns) {
    var $ = go.GraphObject.make;
    var createLinkShapeByStyle = ns.utils.createLinkShapeByStyle;

    ns.defaultLinkTemplate = {
        createDefaultLinkTemplate: createDefaultLinkTemplate,
    };

    return void(0);

    function createDefaultLinkTemplate(option) {
        var defaultLinkStyle = option.config.style.links.defaultLink;
        return $(
            go.Link, {
                routing: go.Link.Orthogonal,
            },

            createLinkShapeByStyle(defaultLinkStyle),
        );
    }
})(NetBrain);