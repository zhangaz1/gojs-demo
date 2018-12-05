;
(function(netBrain) {
    var ns = netBrain.pathPaneView;

    var enums = ns.consts.enums;
    var nodeCategories = enums.nodeCategories;
    var linkCategories = enums.linkCategories;
    var topoTypes = enums.topoTypes;

    var upperCaseFirstChar = ns.utils.upperCaseFirstChar;
    var publish = ns.utils.publish;

    ns.createView = createView;

    var layoutNodesData = ns.nodesDataLayout.layout;
    var layoutNodes = ns.nodesLayout.layout;
    var updateDiagram = ns.utils.updateDiagram;

    // topo type 自动填充属性列表
    var propertiesToFill = [
        'name',
        'order',
        'backgroundColor',
        'borderColor',
        'active',
    ];

    // path view api:
    var publicMethods = [
        // public
        'bindData',
        'canMoveUp',
        'canMoveDown',
        'moveUp',
        'moveDown',

        // debug
        'getDiagram',
        'getData',
    ];

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
            // public api:
            bindData(data): 通过此函数绑定data，渲染path视图
            canMoveUp(): return boolean: 是否可以向上移动可视区
            canMoveDown(): return boolean: 是否可以向下移动可视区
            moveUp(step: number): 可视区向上移动step像素
            moveDown(step: number): 可视区向下移动step像素

            // debug api:
            getDiagram: 返回内部gojs diagram 实例引用
            getData： 返回diagram当前bangding的数据：nodeDataArray、linkDataArray等
        }
     *
     *
     * 使用示例：
     *
        function init() {
            var api = {
                getUpTopoTypeRange:                 获取上一层的起止范围,

                showUpTip:                          显示向上箭头tip,
                showDownTip:                        显示向下箭头tip,

                switchUpTopoType:                   向上topoType切换,
                switchDownTopoType:                 向下topoType切换,
                switchBalance:                      切换loadBalance,

                getIcon:                            获取device或media等的icon
                closeTip:                           用于鼠标移出后关闭tip
                suggestPaneWidth：                  根据node宽度调整画布大小
            };
            var pathPaneView = ns.pathPaneView.createView('myDiagramDiv'， api);

            var data = {
                nodeDataArray: ns.data.getNodes(),
                linkDataArray: ns.data.getLinks()
            };

            pathPaneView.bindData(data)
                .then(function(){
                    // todo something:
                    // update move up/down status...
                });
        }
     *
     */
    function createView(containerId, api) {
        var nodeWidth = getDiagramWidth(containerId);

        var config = mergeNewConfig(nodeWidth);
        var option = {
            config: config,
            api: api,
        };

        var diagram = createPathPanelDiagram(option);

        var view = createViewInstance();

        return publish(view, publicMethods);

        // return void(0);

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

        function mergeNewConfig(nodeWidth) {
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
                    isFailed = isFailedNode(node);

                    var portTail = isFailed ?
                        '_copy' :
                        '';
                    var toPort = 'icon' + portTail;

                    links.push({
                        category: linkCategories.defaultLink,
                        from: lastNode.id,
                        fromPort: 'icon',
                        to: node.id,
                        toPort: toPort,
                        // color: '#D98805'
                    });
                }

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
                        tryFillDefaultInfo(type, topoTypes);
                    } else {
                        existType.isActived = existType.isActived || type.isActived;
                        existType.hasUpTip = existType.hasUpTip || type.hasUpTip;
                        existType.hasDownTip = existType.hasDownTip || type.hasDownTip;
                    }

                    existType[typeKey] = true;
                });
            }
        }

        function tryFillDefaultInfo(type, topoTypes) {
            _.each(propertiesToFill, function(propertyName) {
                setDefaultPropertyIfNotAssign(type, topoTypes, propertyName);
            });
        }

        function setDefaultPropertyIfNotAssign(type, topoTypes, propertyName) {
            var topoTypeDefine = topoTypes[type.id];
            if (
                topoTypeDefine &&
                _.isUndefined(type[propertyName])
            ) {
                type[propertyName] = topoTypeDefine[propertyName];
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