$(function() {
	initDiagram();

	return void(0);

	function initDiagram() {
		var $ = go.GraphObject.make;
		var diagram = makeDiagram();
		diagram.model.nodeDataArray = getNodes();
		diagram.model.linkDataArray = getLinks();

		return void(0);

		function getLinks() {
			return [{
				from: 'Alpha',
				to: 'Beta'
			}, {
				from: 'Alpha',
				to: 'Gamma'
			}, {
				from: 'Beta',
				to: 'Beta'
			}, {
				from: 'Gamma',
				to: 'Delta'
			}, {
				from: 'Delta',
				to: 'Alpha'
			}];
		}

		function getNodes() {
			return [{
				key: 'Alpha',
				color: 'lightblue'
			}, {
				key: 'Beta',
				color: 'orange'
			}, {
				key: 'Gamma',
				color: 'lightgreen'
			}, {
				key: 'Delta',
				color: 'pink'
			}];
		}

		function makeDiagram() {
			return $(go.Diagram, 'myDiagramDiv', {
				initialContentAlignment: go.Spot.Center,
				'undoManager.isEnabled': true
			});
		}
	}
});
