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
                getUpTopoTypeRange:                    获取上一层的起止范围,

                showUpTip:                          显示向上箭头tip,
                showDownTip:                        显示向下箭头tip,

                switchUpTopoType:                      向上topoType切换,
                switchDownTopoType:                    向下topoType切换,
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
        var config = mergeNewConfig();

        var diagram = createPathPanelDiagram({
            config: config,
            api: api,
        });

        return createViewInstance();

        // return void(0);

        function createViewInstance() {
            var view = {
                currentPosition: 0,
                getDiagram: getDiagram,
            };

            view.bindData = bindData.bind(view);
            view.getData = getData.bind(view);

            view.getScrollInfo = getScrollInfo.bind(view);
            view.canMoveUp = canMoveUp.bind(view);
            view.canMoveDown = canMoveDown.bind(view);
            view.scroll = scroll.bind(view);

            return view;
        }

        function mergeNewConfig() {
            return ns.config.getConfig({
                containerId: containerId,
                style: {
                    nodes: {
                        width: nodeWidth,
                    },
                },
            });
        }

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
            refresh(this); // 奇怪
        }

        function refresh(pathPaneView) {
            setTimeout(function() {
                setTimeout(function() {
                    pathPaneView.scroll(-20);
                    pathPaneView.currentPosition = 0;
                    diagram.updateAllTargetBindings();
                }, 0);
            }, 0);
        }

        /**
         * 获取当前绑定的数据
         *
         * @returns {Object}：
         */
        function getData() {
            return diagram.model.toJson();
        }

        /**
         * 获取视图大小和位置，以用于滚动
         *
         * @return {object}：例：
         *
            {
                height: 800,    // 画布高度
                current: 0,     // 当前上端偏移位置
                viewPortHeight: 300, // 可视区域的高度
            }
         *
         */
        function getScrollInfo() {
            var bounds = diagram.computeBounds()
            return {
                height: bounds.height,
                current: this.currentPosition,
                viewPortHeight: diagram.viewportBounds.height,
            };
        }

        /**
         * 是否可以向上移动（viewPort）（即内容向下移动）
         *
         * @returns {boolean}
         */
        function canMoveUp() {
            var scrollInfo = this.getScrollInfo();
            return canDiagramMoveUp(scrollInfo);
        }

        /**
         * 是否可以向下移动（viewPort）（即内容向上移动）
         *
         * @returns {boolean}
         */
        function canMoveDown() {
            var scrollInfo = this.getScrollInfo();
            return canDiagramMoveDown(scrollInfo);
        }

        /**
         * 滚动距离，正值向下移动，负值向上移动
         *
         * @param {number} step
         */
        function scroll(step) {
            this.currentPosition += step;
            var oldPosition = diagram.position;
            diagram.position = new go.Point(
                oldPosition.x,
                oldPosition.y + step,
            );
        }
    }

    function getDiagramWidth(containerId) {
        return jQuery('#' + containerId).width(); //- 50;
    }

    function createModel(data, config) {
        var model = new go.GraphLinksModel();

        model.nodeKeyProperty = 'id';
        model.linkFromPortIdProperty = 'fromPort';
        model.linkToPortIdProperty = 'toPort';

        // test
        // some shared model data
        // model.modelData = {
        //     test: true,
        //     hello: 'world',
        //     version: 42
        // };

        layoutNodes(data, config);

        model.nodeDataArray = data.nodeDataArray;
        model.linkDataArray = data.linkDataArray

        return model;
    }

    function createPathPanelDiagram(option) {
        var diagram = createDiagram(option);

        option.diagram = diagram;
        ns.nodeTemplates.mappingNodeTeamplates(option);
        ns.linkTemplates.mappingLinkTemplates(option);

        return diagram;
    }

    function createDiagram(option) {
        var diagram = go.GraphObject
            .make(
                go.Diagram,
                option.config.containerId,
                getDiagramConfig(), {
                    // temp: for test
                    allowSelect: true,
                    // allowMove: true,
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
            padding: 0,
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

    function canDiagramMoveUp(scrollInfo) {
        return (
                scrollInfo.viewPortHeight < scrollInfo.height &&
                scrollInfo.viewPortHeight - scrollInfo.current < scrollInfo.height
            ) ||
            (
                scrollInfo.viewPortHeight > scrollInfo.height &&
                scrollInfo.current > 0
            );
    }

    function canDiagramMoveDown(scrollInfo) {
        return (
                scrollInfo.viewPortHeight < scrollInfo.height &&
                scrollInfo.viewPortHeight - scrollInfo.current < scrollInfo.height
            ) ||
            (
                scrollInfo.viewPortHeight > scrollInfo.height &&
                scrollInfo.current > 0
            );
    }

})(NetBrain);