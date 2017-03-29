$(function() {
	var myDiagram = initDiagram();
	bindHandlers();

	return void(0);

	function bindHandlers() {
		$('#toSvg').click(makeSvg);

		return void(0);

		function makeSvg() {
			var svg = myDiagram.makeSvg({
				scale: 1,
				background: "white"
			});
			var svgstr = new XMLSerializer().serializeToString(svg);
			var blob = new Blob([svgstr], {
				type: "image/svg+xml"
			});
			myCallback(blob);
		}

		// When the blob is complete, make an anchor tag for it and use the tag to initiate a download
		// Works in:
		// * Chrome
		// * IE11, Edge
		// * Firefox
		function myCallback(blob) {
			var url = window.URL.createObjectURL(blob);
			var filename = "mySVGFile.svg";

			var a = document.createElement("a");
			a.style = "display: none";
			a.href = url;
			a.download = filename;

			// IE 11
			if(window.navigator.msSaveBlob !== undefined) {
				window.navigator.msSaveBlob(blob, filename);
				return;
			}

			document.body.appendChild(a);
			requestAnimationFrame(function() {
				a.click();
				window.URL.revokeObjectURL(url);
				document.body.removeChild(a);
			});
		}
	}

	function initDiagram() {
		var $ = go.GraphObject.make;
		var diagram = makeDiagram();

		diagram.nodeTemplate = getNodeTemplate();
		diagram.model.nodeDataArray = getNodes();
		diagram.model.linkDataArray = getLinks();

		return diagram;

		// return void(0);

		function getNodeTemplate() {
			return $(go.Node, "Auto",
				$(go.Shape, "RoundedRectangle", {
						strokeWidth: 0
					},
					new go.Binding("fill", "color")),
				$(go.TextBlock, {
						margin: 8
					},
					new go.Binding("text", "key"))
			);
		}

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
