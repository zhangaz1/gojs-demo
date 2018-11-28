;
(function(ns) {
    var nodeCategories = ns.consts.enums.nodeCategories;
    var topoTypes = ns.consts.enums.topoTypes;
    var upperCaseFirstChar = ns.utils.upperCaseFirstChar;

    ns.pathPaneView = {
        createView: createView,
    };

    var layoutNodesData = ns.nodesDataLayout.layout;
    var layoutNodes = ns.nodesLayout.layout;
    var updateDiagram = ns.utils.updateDiagram;

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
        var option = {
            config: config,
            api: api,
        };

        var diagram = createPathPanelDiagram(option);

        var view = createViewInstance();

        var publicMethods = [
            'getDiagram',

            'bindData',
            'getData',

            'canMoveUp',
            'canMoveDown',
            'moveUp',
            'moveDown',
        ];

        return publish(view, publicMethods);

        // return void(0);

        function publish(obj, methods) {
            var proxy = {};

            _.each(methods, function(method) {
                proxy[method] = obj[method].bind(obj);
            });

            return proxy;
        }

        function createViewInstance() {
            return {
                getDiagram: getDiagram,

                bindData: bindData,
                getData: getData,
                getScrollInfo: getScrollInfo,
                canMoveUp: canMoveUp,
                canMoveDown: canMoveDown,
                moveUp: moveUp,
                moveDown: moveDown,
                scroll: scroll,
                canMove: canMove,
            };
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
            var nodes = data.nodeDataArray;
            mergeNodesTopoTypes(nodes);
            calculateDeviceDetailLeft(nodes);

            var links = data.linkDataArray;
            addDefaultLinks(nodes, links);

            return updateDiagram(diagram, function() {
                    diagram.model = createModel(data, config);
                })
                .then(doNodesLayout);
        }

        function addDefaultLinks(nodes, links) {
            var lastNode = null;
            var isFailed = false;
            _.each(nodes, function(node) {
                if (!isFailed && lastNode) {
                    links.push({
                        category: 'defaultLink',
                        from: lastNode.id,
                        fromPort: 'icon',
                        to: node.id,
                        toPort: 'icon',
                        // color: '#D98805'
                    });
                }

                isFailed = isFailedNode(node);
                lastNode = node;
            });
        }

        function isFailedNode(node) {
            return node.category === nodeCategories.failed;
        }

        function mergeNodesTopoTypes(nodes) {
            _.chain(nodes)
                .filter(isDeviceNode)
                .map(mergeNodeTopoTypes);
        }

        function isDeviceNode(node) {
            return node.category === nodeCategories.device;
        }

        function mergeNodeTopoTypes(node) {
            var topoTypesDic = {};
            addSpecialTopoTypes(topoTypesDic, 'in', node);
            addSpecialTopoTypes(topoTypesDic, 'out', node);

            node.topoTypes = _.chain(topoTypesDic)
                .values()
                .sortBy('order')
                .value();
        }

        function addSpecialTopoTypes(topoTypesDic, key, node) {
            var types = node[key + 'TopoTypes'];
            var typeKey = 'is' + upperCaseFirstChar(key);
            if (types) {
                _.each(types, function(type) {
                    var existType = topoTypesDic[type.id];
                    if (!existType) {
                        existType = type;

                        topoTypesDic[type.id] = existType;
                        existType.order = topoTypes[type.id].order;
                    } else {
                        existType.isActived = existType.isActived || type.isActived;
                        existType.hasUpTip = existType.hasUpTip || type.hasUpTip;
                        existType.hasDownTip = existType.hasDownTip || type.hasDownTip;
                    }

                    existType[typeKey] = true;
                });
            }
        }

        function calculateDeviceDetailLeft(nodes) {
            var baseLeft = 10;
            var topoTypeWidth = 25;
            var maxTopoTypes = getMaxTopoTypes(nodes);
            config.style.nodes.device.details.left = baseLeft + maxTopoTypes * topoTypeWidth;
        }

        function getMaxTopoTypes(nodes) {
            return _.chain(nodes)
                .map(topoTypesCountMax)
                .max()
                .value();
        }

        function topoTypesCountMax(node) {
            return getLength(node.topoTypes);
        }

        function getLength(arr) {
            return arr && arr.length ||
                0;
        }

        function doNodesLayout() {
            return layoutNodes(diagram.nodes, option);
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
                contentHeight: 800,    // 内容高度
                viewPortHeight: 300, // 可视区域的高度
                // current: 0,     // 当前上端偏移位置
            }
         *
         */
        function getScrollInfo() {
            return {
                contentHeight: diagram.documentBounds.height,
                contentY: diagram.documentBounds.y,
                viewportHeight: diagram.viewportBounds.height,
                viewportY: diagram.viewportBounds.y,
                current: diagram.documentBounds.y - diagram.viewportBounds.y,
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
         * 向上移动内容
         *
         * @param {Number} step: 移动的距离
         */
        function moveUp(step) {
            this.scroll(-step);
        }

        /**
         * 向下移动内容
         *
         * @param {Number} step: 移动的距离
         */
        function moveDown(step) {
            this.scroll(step);
        }

        /**
         * 滚动距离，正值向下移动，负值向上移动
         *
         * @param {number} step
         */
        function scroll(step) {
            if (!this.canMove(step)) {
                return;
            }

            var oldPosition = diagram.position;
            diagram.position = new go.Point(
                oldPosition.x,
                oldPosition.y + step,
            );
        }

        function canMove(step) {
            if (step < 0) {
                return this.canMoveUp();
            }

            if (step > 0) {
                return this.canMoveDown();
            }

            return false;
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

        layoutNodesData(data, config);

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
                    // allowSelect: true,
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
            padding: new go.Margin(20, 0, 20, 0),
            initialContentAlignment: go.Spot.Top, // 上对齐布局
            allowMove: false,
            allowHorizontalScroll: false,
            allowVerticalScroll: false,
            allowZoom: false,
            allowDelete: false,
            allowCopy: false,

            allowSelect: false,

            'dragSelectingTool.isEnabled': false,
            'undoManager.isEnabled': false,
            'animationManager.isEnabled': false,
        };
    }

    function canDiagramMoveUp(scrollInfo) {
        return scrollInfo.viewportHeight < scrollInfo.contentHeight &&
            scrollInfo.current < 0;
    }

    function canDiagramMoveDown(scrollInfo) {
        return scrollInfo.viewportHeight < scrollInfo.contentHeight &&
            scrollInfo.viewportHeight - scrollInfo.current < scrollInfo.contentHeight;
    }

})(NetBrain);