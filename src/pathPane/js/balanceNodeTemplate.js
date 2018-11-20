;
(function(ns) {

    var $ = go.GraphObject.make;

    ns.balanceTemplate = {
        createBalanceTemplate: createBalanceTemplate
    };

    var createEventData = ns.utils.createEventData;

    return void(0);

    function createBalanceTemplate(option) {
        var nodeConfig = option.config.style.nodes;
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
                go.Panel, 'Position', {
                    name: 'balanceNamePanel',
                    alignment: go.Spot.Left,
                    height: 50,
                },
                $(
                    go.Picture, {
                        name: 'balanceIcon',
                        portId: 'balance',
                        width: 16,
                        height: 16,
                        source: balanceConfig.icon,
                        position: new go.Point(37, 17),
                        cursor: 'pointer',
                        click: switchBalance,
                    },
                    new go.Binding('source', 'icon'),
                ),
                $(
                    go.TextBlock, {
                        name: 'balanceHostNameText',
                        font: 'bold 12px sans-serif',
                        stroke: '#111',
                        isMultiline: false,

                        position: new go.Point(37 + 20, 17),
                    },
                    new go.Binding('text', 'name').makeTwoWay(),
                ),
            );
        }

        function switchBalance(inputEvent, graphObject) {
            var eventData = createEventData(inputEvent, graphObject);
            option.api.switchBalance(eventData);
        }
    }

})(NetBrain);