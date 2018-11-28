;
(function(ns) {
    var $ = go.GraphObject.make;

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
            $(go.Shape, {
                    strokeWidth: 2,
                    stroke: defaultLinkStyle.color,
                },
                new go.Binding('stroke', 'color'),
            ),
        );
    }
})(NetBrain);