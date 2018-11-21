;
(function(ns) {

    jQuery(function() {

        init();

        return void(0);

        function init() {
            var api = getApi();
            var pathPaneView = ns.pathPaneView.createView('myDiagramDiv', api);
            bindData(pathPaneView);

            bindMoveHandler(pathPaneView);

            var diagram = pathPaneView.getDiagram();
            testInspector(diagram);

            bindDataHandler(pathPaneView);
        }

        function bindDataHandler(pathPaneView) {
            $('#getData').click(function() {
                $('#data').val(pathPaneView.getData());
            });
        }

        function bindMoveHandler(pathPaneView) {
            var step = 50;
            $('#up').click(createMoveHandler(pathPaneView, -step));
            $('#down').click(createMoveHandler(pathPaneView, step));

            updateMoveButtonStatus(pathPaneView);
        }

        function createMoveHandler(pathPaneView, step) {
            return function() {
                pathPaneView.scroll(step);
                updateMoveButtonStatus(pathPaneView);
            };
        }

        function updateMoveButtonStatus(pathPaneView) {
            var upButton = $('#up');
            if (pathPaneView.canMoveUp()) {
                upButton.show();
            } else {
                upButton.hide();
            }

            var downButton = $('#down');
            if (pathPaneView.canMoveDown()) {
                downButton.show();
            } else {
                downButton.hide();
            }
        }

        function bindData(pathPaneView) {
            var data = {
                nodeDataArray: ns.data.getNodes(),
                linkDataArray: ns.data.getLinks()
            };

            pathPaneView.bindData(data);
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
                showElseTopoTypesTip: showElseTopoTypesTip,

                switchUpTopoType: switchUpTopoType,
                switchDownTopoType: switchDownTopoType,
                switchBalance: switchBalance,

                getIcon: getIcon,

                closeTip: closeTip,
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
                elseTopoTypes: [{      // 仅用于elseTopoTypes相关调用
                    name: 'Vxxxx',
                    // ...
                }],
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
                fromPort: 'in_vxlan',
                to: 104,
                toPort: 'out_vxlan',
                points: [{
                    x: 100,
                    y: 20,
                }],
                color: '#94CDF6'
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
         *
         * @param {object} eventData : 同上
         */
        function showElseTopoTypesTip(eventData) {
            console.log('showElseTopoTypesTip:', eventData);
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
            console.log('getIcon:', eventData);
        }

        /**
         * 关闭指定的tip
         *
         * @param {Number} id
         */
        function closeTip(id) {
            console.log('closeTip:', id);
        }

    });
})(NetBrain);