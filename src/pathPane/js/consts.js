;
(function(ns) {
    ns.consts = createConsts();

    return void(0);

    function createConsts() {
        return {
            enums: {
                nodeCategories: {
                    device: 'device',
                    media: 'media',
                    balance: 'balance',
                    failed: 'failed',
                    elseLevels: 'elseLevels',
                },
                linkCategories: {
                    hopLink: 'hopLink',
                    rangeLink: 'rangeLink',
                },
            },
            config: {
                style: {
                    nodes: createNodesStyleConfig(),
                    links: {},
                },
            },
        };
    }

    function createNodesStyleConfig() {
        return {
            // device的一些默认颜色、图标等信息
            width: 280,
            backgroundColor: '#ECF5FC',
            borderColor: '#CEE0ED',
            borderWidth: 1,
            device: {
                icon: './imgs/icons/router.png', // default icon ?
                aIcon: './imgs/icons/path_point_a.bmp',
                bIcon: './imgs/icons/path_point_b.bmp',

                levels: createLevelsConfig(),
                details: {

                },
            },
            media: {
                icon: './imgs/icons/lan.png',
            },
            balance: {
                icon: './imgs/icons/balance.png',
            },
            failed: {
                icon: './imgs/icons/failed.png',
            },
        };
    }

    function createLevelsConfig() {
        // levels的默认颜色和激活颜色等
        return {
            backgroundColor: '#DEF0FB',
            borderColor: '#D98805',

            l2: {
                backgroundColor: 'green',
                borderColor: 'red',
                active: {
                    backgroundColor: '#F8A200',
                    borderColor: '#D98805',
                },
            },
            l3: {
                borderColor: '#B2E88E',
                backgroundColor: '#E8FDDA',
                active: {
                    borderColor: '#3F9105',
                    backgroundColor: '#4DBB00',
                },
            },
            vxlan: {
                borderColor: '#94CDF6',
                backgroundColor: '#DDF0FF',
                active: {
                    borderColor: 'green',
                    backgroundColor: 'red',
                },
            },
        };
    }

})(NetBrain);