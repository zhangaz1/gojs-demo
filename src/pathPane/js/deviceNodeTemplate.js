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
                createDeviceLevelsTemplate(),
                createDeviceDetailTemplate(),
            );
        }

        function createDeviceLevelsTemplate() {
            return $(
                go.Panel,
                'Horizontal', {
                    name: 'levelsPanel',
                    padding: 5,
                    background: deviceConfig.levels.backgroundColor,
                },
                createVisiableLevelsTemplate(),
                createElseLevelsTemplate(),
            );
        }

        function createElseLevelsTemplate() {
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
                new go.Binding('visible', 'elseLevels', function(value, graphObject) {
                    return (
                            value &&
                            value.length &&
                            true
                        ) ||
                        false;
                }),
            );
        }

        function createVisiableLevelsTemplate() {
            return $(
                go.Panel,
                'Horizontal', {
                    name: 'levelsPanel',
                    itemTemplate: createLevelItemTemplate(),
                },
                new go.Binding('itemArray', 'levels'),
            );
        }

        function createLevelItemTemplate() {
            return $(
                go.Panel,
                'Auto', {
                    name: 'levelItemPanel',
                    padding: 1,
                },
                new go.Binding('portId', 'name'),
                new go.Binding('background', '', getLevelColor('borderColor')),

                createLevelItemTextTemplate(),
            );
        }

        function createLevelItemTextTemplate() {
            return $(
                go.TextBlock, {
                    angle: 270,
                    desiredSize: new go.Size(40, 18),
                    textAlign: 'center',
                    click: function(event, textBlock) {
                        console.log('click:', textBlock.part.data);
                    },
                },
                new go.Binding('text', 'name'),
                new go.Binding('background', '', getLevelColor('backgroundColor')),
            );
        }

        function getLevelColor(colorKey) {
            return function(data) {
                var key = data.name.toLowerCase();
                var level = deviceConfig.levels[key];
                return data.current ?
                    level.active[colorKey] :
                    level[colorKey];
            }
        }

        function createDeviceDetailTemplate() {
            return $(
                go.Panel,
                'Vertical', {
                    name: 'detailPanel',
                    width: 170,
                    margin: new go.Margin(0, 0, 0, 90),
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