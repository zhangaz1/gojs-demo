;
(function(ns) {

    jQuery(function() {

        var $ = go.GraphObject.make;

        init();

        return void(0);

        function init() {
            var api = getApi();
            var pathPaneView = ns.pathPaneView.createView('myDiagramDiv');
            bindData(pathPaneView);

            var diagram = pathPaneView.getDiagram();
            testInspector(diagram);
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

        }

        /**
         * 显示向上箭头tip
         *
         * @param {object} eventData : 同上
         *
         */
        function showUpTip(eventData) {

        }

        /**
         * 显示向下箭头tip
         *
         * @param {object} eventData : 同上
         *
         */
        function showDownTip(eventData) {

        }

        /**
         *
         * @param {object} eventData : 同上
         */
        function showElseTopoTypesTip(eventData) {

        }

        /**
         * 向上topoType切换
         *
         * @param {object} eventData : 同上
         *
         */
        function switchUpTopoType(eventData) {

        }

        /**
         * 向下topoType切换
         *
         * @param {object} eventData : 同上
         *
         */
        function switchDownTopoType(eventData) {

        }

        /**
         * 切换loadBalance
         *
         * @param {object} eventData : 同上
         */
        function switchBalance(eventData) {

        }

        /**
         * 获取node的icon
         *
         * @param {object} nodeData
         */
        function getIcon(nodeData) {

        }
    });
})(NetBrain);