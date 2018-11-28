;
(function(ns) {
    var $ = go.GraphObject.make;
    var RangeLink = ns.RangeLink;

    ns.rangeLinkTemplate = {
        createRangeLinkTemplate: createRangeLinkTemplate,
    };

    return void(0);

    function createRangeLinkTemplate(option) {
        var rangeLinkStyle = option.config.style.links.rangeLink;

        return $(
            RangeLink, {
                routing: go.Link.Orthogonal,
            },
            $(
                go.Shape, {
                    strokeWidth: 2,
                    stroke: rangeLinkStyle.color,
                },
                new go.Binding('stroke', 'color'),
                new go.Binding('', '', function(data) {
                    data.deviceConfig = option.config.style.nodes.device;
                }),
            ),
        );
    }
})(NetBrain);