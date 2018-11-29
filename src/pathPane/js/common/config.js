;
(function(netBrain) {
    var ns = netBrain.pathPaneView;

    ns.config = {
        getConfig: getConfig,
    };

    return void(0);

    function getConfig(customize) {
        return $.extend(
            true, {},
            ns.consts.config,
            customize
        );
    }

})(NetBrain);