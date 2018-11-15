;
(function(ns) {

    ns.nodeTemplates = {
        mappingNodeTeamplates: mappingNodeTeamplates,
    };

    return void(0);

    function mappingNodeTeamplates(diagram, config) {
        var nodeTemplateMap = diagram.nodeTemplateMap;

        nodeTemplateMap.add('device', ns.deviceTemplate.createDeviceTemplate(config));
        nodeTemplateMap.add('media', ns.mediaTemplate.createMediaTemplate(config));
        nodeTemplateMap.add('balance', ns.balanceTemplate.createBalanceTemplate(config));
        nodeTemplateMap.add('failed', ns.failedTemplate.createFailedTemplate(config));
    }


})(NetBrain);