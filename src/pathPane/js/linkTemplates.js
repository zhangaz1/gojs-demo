;
(function(ns) {
    var $ = go.GraphObject.make;

    ns.linkTemplates = {
        link: createLinkTemplate(),
    };

    return void(0);

    function createLinkTemplate() {
        return $(go.Link, {},
            $(go.Shape, {
                    strokeWidth: 2
                },
                new go.Binding('stroke', 'color')
            ),
        );
    }
})(NetBrain);