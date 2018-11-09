;
(function(ns) {

    var $ = go.GraphObject.make;

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
                    itemTemplate: createLevelItemTemplate(),
                },
                new go.Binding('itemArray', 'levels')
            );
        }

        function createLevelItemTemplate() {
            return $(
                go.Panel,
                'Auto', {
                    name: 'levelItemPanel',
                    background: '#ECF5FC',
                    areaBackground: '#C8DCEA',
                },
                new go.Binding('portId', 'name'),
                new go.Binding('background', 'backgroundColor'),
                new go.Binding('areaBackground', 'borderColor'),

                createLevelItemTextTemplate(),
            );
        }

        function createLevelItemTextTemplate() {
            return $(
                go.TextBlock, {
                    margin: 2,
                    angle: 270,
                    desiredSize: new go.Size(40, 18),
                    textAlign: 'center',
                },
                new go.Binding('text', 'name')
            );
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
                new go.Binding('opacity', 'in', function(v) {
                    return v ? 1 : 0;
                }),
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
                $(
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
                ),
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

        function createDeviceOutTemplate() {
            return $(
                go.Panel,
                'Horizontal', {
                    name: 'devcieOutPanel',
                    alignment: go.Spot.Left,
                },
                new go.Binding('opacity', 'out', function(v) {
                    return v ? 1 : 0;
                }),
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