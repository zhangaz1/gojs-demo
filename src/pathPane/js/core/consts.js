;
(function(netBrain) {
    var ns = netBrain.pathPaneView;

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
            id: 'L2_Topo_Type', // 前后端对应的key
            name: 'L2', // 显示名称

            // backgroundColor: 'green', // 特定颜色、优先级更高，不指定则走默认颜色
            // borderColor: 'red',       // 特定颜色、优先级更高，不指定则走默认颜色
            // active: {
            //     backgroundColor: '#F8A200',
            //     borderColor: '#D98805',
            // },

            order: 1, // 显示顺序, 如果不指定（undefined）会排在后面，值相同的先出现的会排在前面
        }, {
            id: 'L3_Topo_Type',
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
                nodeCategories: getNodeCategories(),
                linkCategories: getLinkCategories(),
                topoTypes: topoTypesDic,
            },
            config: {
                style: {
                    nodes: createNodesStyleConfig(),
                    links: createLinksStyleConfig(),
                },
            },
        };
    }

    /**
     * node 类别定义，category指定此值之一时，会自动使用相应模板
     */
    function getNodeCategories() {
        return {
            device: 'device',
            media: 'media',
            balance: 'balance',
            failed: 'failed',
        };
    }

    /**
     * link 类别定义，category指定此值之一时，会自动使用相应模板
     */
    function getLinkCategories() {
        return {
            hopLink: 'hopLink', // 左侧topoType链接关系线
            rangeLink: 'rangeLink', // 向上折叠tip同时显示的范围链接线
            defaultLink: 'defaultLink', // 右侧图标主链接线，无需指定，会自动根据node顺序生成，遇到failed自动终止
        };
    }

    /**
     * 把topoTypes数组构造成字典，方便访问
     */
    function createTopoTypesDic() {
        // var dic = Object.create(null);
        var dic = {};

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
            // device的一些默认颜色、图标等信息，若不具体指定，则取此做默认值
            width: 280,                 // node默认宽度
            backgroundColor: '#ECF5FC', // node默认背景颜色
            borderColor: '#CEE0ED',     // node默认边框颜色
            borderWidth: 1,
            device: {
                // backgroundColor: 'blue', // node默认背景颜色，不指定则取node背景颜色
                // borderColor: 'blue',     // node默认边框颜色，不指定则取node边框颜色

                icon: './../../imgs/icons/router.png', // default icon ?
                aIcon: './../../imgs/icons/path_point_a.bmp',
                bIcon: './../../imgs/icons/path_point_b.bmp',

                topoTypesPanel: {
                    group: {
                        inBackgroundColor: '#666A63',   // inTopoTypes标记颜色
                        outBackgroundColor: '#2778A7',  // outTopoTypes标记颜色
                        width: 20,                      // in/out色块标记的宽度（等于topoType高度）
                        height: 3,                      // in/out色块标记的高度
                    },
                },
                topoTypeBase: {
                    backgroundColor: '#D1E6FA', // topoType的默认背景颜色
                    borderColor: '#D1E6FA',     // topoType的默认边框颜色
                    highlightColor: '#F5A623',  // topoType的高亮边框颜色
                    active: {
                        backgroundColor: '#88CBFC', // topoType的激活（使用）背景颜色
                        borderColor: '#88CBFC',     // topoType的激活（使用）边框颜色
                    },
                    angle: 270,                 // topoType文字旋转角度
                    font: '10px sans-serif',    // topoType问题字号字体，（最小只支持10，好像）
                    width: 20,                  // topoType宽度
                    height: 40,                 // topoType高度
                },
                topoTypes: topoTypesDic,

                details: {
                    in: {
                        font: 'bold 10px ans-serif',    // detail中in的字号和字体及样式
                        labelFont: '10px sans-serif',   // detail中inLabel的字号和字体及样式
                    },
                    hostName: {
                        font: 'bold 12px sans-serif',   // detail中hostName的字号和字体及样式
                        color: '#111',                  // detail中hostName的字的颜色
                        width: 170,                     // detail中hostName的文本最大长度，超过则显示...
                    },
                    out: {
                        font: 'bold 10px ans-serif',    // detail中out的字号和字体及样式
                        labelFont: '10px sans-serif',   // detail中outLabel的字号和字体及样式
                    },
                    icon: {
                        width: 24,      // detail中icon宽度
                        height: 24,     // detail中icon高度
                    },
                    abIcon: {
                        width: 16,      // detail中abIcon宽度
                        height: 16,     // detail中abIcon高度
                    },
                },
            },
            media: {
                height: 35,     // mediaNode的高度
                icon: './../../imgs/icons/lan.png',     // 默认图标
                iconSize: {
                    width: 16,      // mediaIcon的宽度
                    height: 16,     // mediaIcon的高度
                },
                font: 'bold 12px sans-serif',   // mediaName的字体字号样式
                color: 'black',                 // mediaName的颜色

                // backgroundColor: 'blue',     // media的背景颜色
                // borderColor: 'red',          // media的边框颜色
            },
            balance: {
                icon: './../../imgs/icons/balance.png', // balance的默认图标
                iconSize: {
                    width: 32,          // balance图标的宽度
                    height: 32,         // balance图标的高度
                },
                font: '10px sans-serif',    // balance文本的字体字号样式
                color: 'black',             // balance文本的颜色
            },
            failed: {
                icon: './../../imgs/icons/failed.png', // failed的默认图标
                iconSize: {
                    width: 16,      // failed图标宽度
                    height: 16,     // failed图标高度
                },
            },
        };
    }

    /**
     * links样式配置
     */
    function createLinksStyleConfig() {
        return {
            hopLink: {
                color: '#7F8A90',           // link 颜色
                strokeDashArray: [3, 2],    // link 线型3实2虚等
                width: 1,                   // link宽度
            },
            rangeLink: {
                color: '#519BC6',
                strokeDashArray: [8, 6],
                width: 4,
            },
            defaultLink: {
                color: '#619E99',
                strokeDashArray: [5, 2],
                width: 2,
            },
        };
    }

})(NetBrain);