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

            backgroundColor: 'green',
            borderColor: 'red',
            active: {
                backgroundColor: '#F8A200',
                borderColor: '#D98805',
            },
        }, {
            id: 'l3',
            name: 'L3',

            borderColor: '#B2E88E',
            backgroundColor: '#E8FDDA',
            active: {
                borderColor: '#3F9105',
                backgroundColor: '#4DBB00',
            },
        }, {
            id: 'vxlan',
            name: 'Vxlan',

            borderColor: '#94CDF6',
            backgroundColor: '#DDF0FF',
            active: {
                borderColor: 'green',
                backgroundColor: 'red',
            },
        }, {
            id: 'ipSec',
            name: 'IP Sec',

            backgroundColor: 'green',
            borderColor: 'red',
            active: {
                backgroundColor: '#F8A200',
                borderColor: '#D98805',
            },
        }, {
            id: 'gre',
            name: 'GRE',

            backgroundColor: 'green',
            borderColor: 'red',
            active: {
                backgroundColor: '#F8A200',
                borderColor: '#D98805',
            },
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
                    links: {},
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
                details: {

                },
            },
            media: {
                icon: './imgs/icons/lan.png',
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