;
(function(netBrain) {
    var ns = netBrain.pathPaneView;

    jQuery(function() {

        init();

        return void(0);

        function init() {
            var api = getApi();
            var pathPaneView = ns.pathPaneView.createView('myDiagramDiv', api);

            initData(pathPaneView)
                .then(function() {
                    bindMoveHandler(pathPaneView);

                    var diagram = pathPaneView.getDiagram();
                    testInspector(diagram);

                    bindDataHandler(pathPaneView);
                });
        }

        function bindDataHandler(pathPaneView) {
            $('#getData').click(function() {
                $('#data').val(pathPaneView.getData());
            });

            $('#setData').click(function() {
                var dataStr = $('#data').val();
                var data = JSON.parse(dataStr);

                bindPathPaneViewData(pathPaneView, data);
            });
        }

        function bindMoveHandler(pathPaneView) {
            var step = 50;
            $('#up').click(createMoveHandler(pathPaneView, step, 'moveUp'));
            $('#down').click(createMoveHandler(pathPaneView, step, 'moveDown'));

            updateMoveButtonStatus(pathPaneView);
        }

        function createMoveHandler(pathPaneView, step, action) {
            return function() {
                pathPaneView[action](step);
                updateMoveButtonStatus(pathPaneView);
            };
        }

        function updateMoveButtonStatus(pathPaneView) {
            $('#up').prop('disabled', !pathPaneView.canMoveUp());
            $('#down').prop('disabled', !pathPaneView.canMoveDown());
        }

        function initData(pathPaneView) {
            var data = {
                nodeDataArray: ns.data.getNodes(),
                linkDataArray: ns.data.getLinks()
            };

            return bindPathPaneViewData(pathPaneView, data);
        }

        function bindPathPaneViewData(pathPaneView, data) {
            return pathPaneView.bindData(data)
                .then(function() {
                    updateMoveButtonStatus(pathPaneView);
                });
        }

        function testInspector(diagram) {
            ns.dataInspectors.makeDataInspectors(diagram);
            ns.debugInspector.makeInspector(diagram);

            // select a Node, so that the first Inspector shows something
            diagram.select(diagram.nodes.first());
        }

        function getApi() {
            return {
                getUpTopoTypeRange: getUpTopoTypeRange,

                showUpTip: showUpTip,
                showDownTip: showDownTip,

                switchUpTopoType: switchUpTopoType,
                switchDownTopoType: switchDownTopoType,
                switchBalance: switchBalance,

                getIcon: getIcon,

                closeTip: closeTip,

                suggestPaneWidth: suggestPaneWidth,
            };
        }

        /**
         * 获取上一层的起止范围
         *
         * @param {object} eventData : 例：
         *
            {
                location: {
                    x: 100,
                    y: 200
                },
                topoType: {            // 仅用于topoType相关调用
                    name: 'Vxlan',
                    // ...
                },
                node: {
                    id: 105,
                    // ...
                }
            }
         *
         *
         * @returns {object} : linkData // 结构参见linkData
         *
         */
        function getUpTopoTypeRange(eventData) {
            console.log('getUpTopoTypeRange:', eventData);
            return {
                category: 'rangeLink',
                from: 102,
                fromPort: 'vxlan',
                to: 104,
                toPort: 'vxlan',
                // points: [{
                //     x: 100,
                //     y: 20,
                // }],
                // color: '#94CDF6'
            };
        }

        /**
         * 显示向上箭头tip
         *
         * @param {object} eventData : 同上
         *
         */
        function showUpTip(eventData) {
            console.log('showUpTip:', eventData);
            return 1;
        }

        /**
         * 显示向下箭头tip
         *
         * @param {object} eventData : 同上
         *
         */
        function showDownTip(eventData) {
            console.log('showDownTip:', eventData);
            return 2;
        }

        /**
         * 向上topoType切换
         *
         * @param {object} eventData : 同上
         *
         */
        function switchUpTopoType(eventData) {
            console.log('switchUpTopoType:', eventData);
        }

        /**
         * 向下topoType切换
         *
         * @param {object} eventData : 同上
         *
         */
        function switchDownTopoType(eventData) {
            console.log('switchDownTopoType:', eventData);
        }

        /**
         * 切换loadBalance
         *
         * @param {object} eventData : 同上
         */
        function switchBalance(eventData) {
            console.log('switchBalance:', eventData);
        }

        /**
         * 获取node的icon
         *
         * @param {object} nodeData
         */
        function getIcon(nodeData) {
            var icons = {
                '101': './../../imgs/icons/pc.png',
                '102': './../../imgs/icons/router.png',
                '103': './../../imgs/icons/switch.png',
                '104': './../../imgs/icons/router.png',
                '104.5': './../../imgs/icons/lan.png',
                '105': './../../imgs/icons/pc.png',
            };

            return icons[nodeData.id];
        }

        /**
         * 关闭指定的tip
         *
         * @param {Number} id
         */
        function closeTip(id) {
            console.log('closeTip:', id);
        }

        /**
         * 根据node宽度更改pane宽度
         *
         * @param {Number} width
         */
        function suggestPaneWidth(width) {
            console.log('suggestPaneWidth:', width);
            $('#myDiagramDiv').width(width);
        }

    });
})(NetBrain);