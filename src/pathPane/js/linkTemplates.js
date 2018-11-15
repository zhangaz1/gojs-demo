;
(function(ns) {
    var $ = go.GraphObject.make;

    ns.linkTemplates = {
        mappingLinkTemplates: mappingLinkTemplates,
    };

    return void(0);

    function mappingLinkTemplates(diagram, config) {
        var linkTemplateMap = diagram.linkTemplateMap;

        linkTemplateMap.add('hopLink', ns.hopLinkTemplate.createHopLinkTemplate(config));
    }

})(NetBrain);