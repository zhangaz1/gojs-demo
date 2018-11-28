;
(function(ns) {

    var topoTypes = createTopoTypes();
    var topoTypesDic = createTopoTypesDic();

    ns.consts = createConsts();

    return void(0);

    /**
     * TopoTypes config for support
     *
     * 可以动态添加新的topoType
     */
    function createTopoTypes() {
        return [{
            id: 'l2',
            name: 'L2',

            // backgroundColor: 'green',
            // borderColor: 'red',
            // active: {
            //     backgroundColor: '#F8A200',
            //     borderColor: '#D98805',
            // },

            order: 1, // 显示顺序
        }, {
            id: 'l3',
            name: 'L3',

            order: 2,
        }, {
            id: 'vxlan',
            name: 'Vxlan',

            order: 10,
        }, {
            id: 'ipSec',
            name: 'IP Sec',

            order: 10,
        }, {
            id: 'gre',
            name: 'GRE',

            order: 10,
        }];
    }

    function createConsts() {
        return {
            enums: {
                nodeCategories: {
                    device: 'device',
                    media: 'media',
                    balance: 'balance',
                    failed: 'failed',
                    elseTopoTypes: 'elseTopoTypes',
                },
                linkCategories: {
                    hopLink: 'hopLink',
                    rangeLink: 'rangeLink',
                },
                topoTypes: topoTypesDic,
            },
            config: {
                style: {
                    nodes: createNodesStyleConfig(),
                    links: {
                        hopLink: {
                            color: '#7F8A90',
                        },
                        rangeLink: {
                            color: '#7F8A90',
                        },
                        defaultLink: {
                            color: '#7F8A90',
                        },
                    },
                },
            },
        };
    }

    /**
     * 把topoTypes数组构造成字典，方便访问
     */
    function createTopoTypesDic() {
        // var dic = Object.create(null);
        var dic = {
            backgroundColor: '#DEF0FB',
            borderColor: '#D98805',
        };

        _.each(topoTypes, function(topoType) {
            dic[topoType.id] = topoType;
        });

        return dic;
    }

    /**
     * node 样式配置
     */
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

                topoTypes: topoTypesDic,
                topoTypeBase: {
                    backgroundColor: '#D1E6FA',
                    borderColor: '#D1E6FA',
                    active: {
                        backgroundColor: '#88CBFC',
                        borderColor: '#88CBFC',
                    },
                },
                details: {

                },
            },
            media: {
                height: 35,
                icon: './imgs/icons/lan.png',
                iconSize: {
                    width: 16,
                    height: 16,
                },
                font: 'bold 12px sans-serif',
                color: 'black',
            },
            balance: {
                icon: './imgs/icons/balance.png',
                iconSize: {
                    width: 32,
                    height: 32,
                },
                font: '10px sans-serif',
                color: 'black',
            },
            failed: {
                icon: './imgs/icons/failed.png',
                iconSize: {
                    width: 16,
                    height: 16,
                },
            },
        };
    }

})(NetBrain);