;
(function(ns) {

    var $ = go.GraphObject.make;
    var opacityByValue = ns.utils.opacityByValue;

    ns.deviceTemplate = {
        createDeviceTemplate: createDeviceTemplate
    };

    return void(0);

    function createDeviceTemplate(config) {
        var nodeConfig = config.style.nodes;
        var deviceConfig = nodeConfig.device;

        return $(
            go.Node,
            'Auto', {
                name: 'deviceNode',
                locationSpot: go.Spot.Center,

                width: nodeConfig.width,
                padding: new go.Margin(1, 0, 1, 0),
                background: nodeConfig.borderColor,
            },
            new go.Binding('location', 'location', go.Point.parse),

            createMainLayout(),
        );

        // return void(0);

        function createMainLayout() {
            return $(
                go.Panel,
                'Position', {
                    name: 'mainLayout',
                    padding: 10,
                    background: nodeConfig.backgroundColor,
                },
                createDeviceTopoTypesTemplate(),
                createDeviceDetailTemplate(),
            );
        }

        function createDeviceTopoTypesTemplate() {
            return $(
                go.Panel,
                'Horizontal', {
                    name: 'topoTypesPanel',
                },
                createVisiableTopoTypesTemplate(),
                createElseTopoTypesTemplate(),
            );
        }

        function createElseTopoTypesTemplate() {
            // 可以考虑改成icon
            return $(
                go.TextBlock, {
                    text: '...',
                    angle: 90,
                    desiredSize: new go.Size(40, 18),
                    textAlign: 'center',
                    visible: false,
                    click: function(event, textBlock) {
                        console.log('click:', textBlock.part.data);
                    },
                },
                new go.Binding('visible', 'elseTopoTypes', function(value, graphObject) {
                    return (
                            value &&
                            value.length &&
                            true
                        ) ||
                        false;
                }),
            );
        }

        function createVisiableTopoTypesTemplate() {
            return $(
                go.Panel,
                'Vertical', {
                    name: 'topoTypesPanel',
                },
                createTopoTypesTemplate('in'),
                createTopoTypesTemplate('out'),
            );
        }

        function createTopoTypesTemplate(type) {
            return $(
                go.Panel,
                'Horizontal', {
                    name: type + 'TopoTypesPanel',
                    alignment: go.Spot.Left,
                    margin: new go.Margin(1, 0, 1, 0),
                    padding: 5,
                    background: deviceConfig.topoTypes.backgroundColor,
                    itemTemplate: createTopoTypeItemTemplate(type),
                },
                new go.Binding('itemArray', type + 'TopoTypes'),
            );
        }

        function createTopoTypeItemTemplate(type) {
            return $(
                go.Panel,
                'Auto', {
                    name: type + 'TopoTypeItemPanel',
                    padding: 1,
                },
                new go.Binding('portId', 'id', function(value) {
                    return type + '_' + value;
                }),
                new go.Binding('background', '', getTopoTypeColor('borderColor')),

                createTopoTypeItemTextTemplate(),
            );
        }

        function createTopoTypeItemTextTemplate() {
            return $(
                go.TextBlock, {
                    angle: 270,

                    font: '10px sans-serif',
                    desiredSize: new go.Size(40, 18),
                    textAlign: 'center',
                    click: function(event, textBlock) {
                        console.log('click:', textBlock.part.data);
                    },
                },
                new go.Binding('text', 'name'),
                new go.Binding('background', '', getTopoTypeColor('backgroundColor')),
            );
        }

        function getTopoTypeColor(colorKey) {
            return function(data) {
                var key = data.name.toLowerCase();
                var topoType = deviceConfig.topoTypes[key];
                return data.isUsed ?
                    topoType.active[colorKey] :
                    topoType[colorKey];
            }
        }

        function createDeviceDetailTemplate() {
            return $(
                go.Panel,
                'Vertical', {
                    name: 'detailPanel',
                    width: 170,
                    margin: new go.Margin(0, 0, 0, 130),
                },
                createDeviceInTemplate(),
                createDeviceNameTemplate(),
                createDeviceOutTemplate(),
            );
        }

        function createDeviceInTemplate() {
            return $(
                go.Panel,
                'Horizontal', {
                    name: 'devcieInPanel',
                    alignment: go.Spot.Left,
                },
                new go.Binding('opacity', 'in', opacityByValue),
                $(
                    go.TextBlock, {
                        name: 'deviceInLabel',
                        text: 'In:',
                        font: '10px sans-serif',
                    },
                ),
                $(
                    go.TextBlock, {
                        name: 'deviceInText',
                        font: 'bold 8px ans-serif',
                    },
                    new Binding('text', 'in'),
                )
            );
        }

        function createDeviceNameTemplate() {
            return $(
                go.Panel, 'Horizontal', {
                    name: 'deviceNamePanel',
                    alignment: go.Spot.Left,
                },
                createABIconTemplate(),
                $(
                    go.Picture, {
                        name: 'deviceIcon',
                        width: 16,
                        height: 16,
                    },
                    new go.Binding('source', 'icon')
                ),
                $(
                    go.TextBlock, {
                        name: 'deviceHostNameText',
                        font: 'bold 12px sans-serif',
                        stroke: '#111',
                        isMultiline: false,
                    },
                    new go.Binding('text', 'name').makeTwoWay(),
                ),
            );
        }

        function createABIconTemplate() {
            return $(
                go.Picture, {
                    name: 'abIcon',
                    visible: false,
                    width: 16,
                    height: 16,
                },
                new go.Binding('source', 'abIcon'),
                new go.Binding('visible', '', function(data, picture) {
                    if (!picture.source) {
                        if (data.isA) {
                            picture.source = deviceConfig.aIcon;
                        } else if (data.isB) {
                            picture.source = deviceConfig.bIcon;
                        }
                    }

                    return data.isA || data.isB || false;
                }),
            );
        }

        function createDeviceOutTemplate() {
            return $(
                go.Panel,
                'Horizontal', {
                    name: 'devcieOutPanel',
                    alignment: go.Spot.Left,
                },
                new go.Binding('opacity', 'out', opacityByValue),
                $(
                    go.TextBlock, {
                        name: 'deviceOutLabel',
                        text: 'Out:',
                        font: '10px sans-serif',
                    },
                ),
                $(
                    go.TextBlock, {
                        name: 'deviceOutText',
                        font: 'bold 8px ans-serif',
                    },
                    new Binding('text', 'out'),
                )
            );
        }

    }

})(NetBrain);