;
(function(ns) {

    var $ = go.GraphObject.make;

    ns.balanceTemplate = {
        createBalanceTemplate: createBalanceTemplate
    };

    return void(0);

    function createBalanceTemplate(config) {
        var nodeConfig = config.style.nodes;
        var balanceConfig = nodeConfig.balance;

        return $(
            go.Node,
            'Auto', {
                name: 'balanceNode',
                locationSpot: go.Spot.Center,
                padding: new go.Margin(1, 0, 1, 0),
                background: nodeConfig.borderColor,

                width: nodeConfig.width,
            },
            new go.Binding('location', 'location', go.Point.parse),

            createDeviceNameTemplate(),
        );

        // return void(0);

        function createDeviceNameTemplate() {
            return $(
                go.Panel, 'Horizontal', {
                    name: 'balanceNamePanel',
                    alignment: go.Spot.Left,
                    height: 50,
                    margin: new go.Margin(0, 0, 0, 18),
                },
                $(
                    go.Picture, {
                        name: 'balanceIcon',
                        portId: 'balance',
                        width: 16,
                        height: 16,
                        source: balanceConfig.icon,
                    },
                    new go.Binding('source', 'icon'),
                ),
                $(
                    go.TextBlock, {
                        name: 'balanceHostNameText',
                        font: 'bold 12px sans-serif',
                        stroke: '#111',
                        isMultiline: false,
                    },
                    new go.Binding('text', 'name').makeTwoWay(),
                ),
            );
        }

    }

})(NetBrain);