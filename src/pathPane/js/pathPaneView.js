;
(function(ns) {

    ns.pathPaneView = {
        createView: createView,
    };

    var layoutNodes = ns.nodesLayout.layout;

    return void(0);

    /**
     * 创建pathView：
     *
     * @param {string} containerId ：gojs diagram canvas 所在divId
     * @param {object} api: pane提供的api和回调函数
     *
     * @returns: {object}： 包含api，例：
     *
        {
            bindData(data): 通过此函数绑定data，渲染path视图
            getScrollInfo:  获取画布大小和位置信息，以便控制滚动,
            scroll:         滚动画布，正值向下，负值向上,
        }
     *
     *
     * 使用示例：
     *
        function init() {
            var api = {
                getUpLevelRange:                    获取上一层的起止范围,

                showUpTip:                          显示向上箭头tip,
                showDownTip:                        显示向下箭头tip,

                switchUpLevel:                      向上level切换,
                switchDownLevel:                    向下level切换,
                switchBalance:                      切换loadBalance,
            };
            var pathPaneView = ns.pathPaneView.createView('myDiagramDiv'， api);

            var data = {
                nodeDataArray: ns.data.getNodes(),
                linkDataArray: ns.data.getLinks()
            };
            pathPaneView.bindData(data);

            var scrollInfo = pathPanView.getScrollInfo();
        }
     *
     */
    function createView(containerId, api) {
        var nodeWidth = getDiagramWidth(containerId);
        var config = ns.config.getConfig({
            containerId: containerId,
            api: api,
            style: {
                nodes: {
                    width: nodeWidth,
                },
            },
        });

        var diagram = createPathPanelDiagram(config);

        return {
            getDiagram: getDiagram,
            bindData: bindData,
            getScrollInfo: getScrollInfo,
            scroll: scroll,
        };

        // return void(0);

        /**
         * 为方便暂提供，不建议使用，有需求可以通过api提供
         */
        function getDiagram() {
            return diagram;
        }

        /**
         * 绑定视图数据，显示path
         *
         * @param {object} data : 指定nodeDataArray和linkDataArray，例：
         *
            {
                nodeDataArray：array
                linkDataArray：array
            }
         *
         */
        function bindData(data) {
            diagram.model = createModel(data, config);
        }

        /**
         * 获取视图大小和位置，以用于滚动
         *
         * @return {object}：例：
         *
            {
                height: 800,    // 画布高度
                current: 0,     // 当前上端偏移位置
            }
         *
         */
        function getScrollInfo() {

        }

        /**
         * 滚动距离，正值向下移动，负值向上移动
         *
         * @param {number} step
         */
        function scroll(step) {

        }
    }

    function getDiagramWidth(containerId) {
        return jQuery('#' + containerId).width() - 50;
    }

    function createModel(data, config) {
        var model = new go.GraphLinksModel();

        model.nodeKeyProperty = 'id';
        model.linkFromPortIdProperty = 'fromPort';
        model.linkToPortIdProperty = 'toPort';

        // test
        // some shared model data
        model.modelData = {
            test: true,
            hello: 'world',
            version: 42
        };

        layoutNodes(data, config);

        model.nodeDataArray = data.nodeDataArray;
        model.linkDataArray = data.linkDataArray

        return model;
    }

    function createPathPanelDiagram(config) {
        var diagram = createDiagram(config);

        ns.nodeTemplates.mappingNodeTeamplates(diagram, config);
        ns.linkTemplates.mappingLinkTemplates(diagram, config);

        return diagram;
    }

    function createDiagram(config) {
        var diagram = go.GraphObject
            .make(
                go.Diagram,
                config.containerId,
                getDiagramConfig(), {
                    // temp: for test
                    allowSelect: true,
                    // automatically show the state of the diagram's model on the page
                    'ModelChanged': function(e) {
                        if (e.isTransactionFinished) {
                            document.getElementById('savedModel').textContent = diagram.model.toJson();
                        }
                    }
                }
            );

        return diagram;
    }

    function getDiagramConfig() {
        return {
            initialContentAlignment: go.Spot.Top, // 上对齐布局
            allowMove: false,
            allowHorizontalScroll: false,
            allowVerticalScroll: false,
            allowZoom: false,
            allowDelete: false,
            allowCopy: false,

            allowSelect: false,

            'dragSelectingTool.isEnabled': false,
            'undoManager.isEnabled': true,
        };
    }

})(NetBrain);