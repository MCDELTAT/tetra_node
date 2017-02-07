var React = require('react');
var Papa = require('Papa');
var Stats = require('Stats');
var Graph = require('Graph');

var data;
var minMax;

var Nav = React.createClass({
  handleFileSelect: function (evt) {
    var file = evt.target.files[0];
    //console.log(file);

    Papa.parse(evt.target.files[0], {
      header: true,
      dynamicTyping: true,
      complete: function(results) {
        data = results.data;
        //call handler functions from in here, don't worry about data races.
        Stats.removeEmptyElements(data);
        var minMax = Stats.getMinMax(data);
        console.log(minMax);
        var xScale = (minMax["xMax"]/minMax["xMin"]);
        var yScale = (minMax["yMax"]/minMax["yMin"]);
        var zScale = (minMax["zMax"]/minMax["zMin"]);
        Graph.scale(Graph.graph, Math.abs(xScale),Math.abs(yScale),Math.abs(zScale)); //scale box geometry
        Graph.scale(Graph.textMeshA1, Math.abs(xScale),Math.abs(yScale),Math.abs(zScale)); //scale box geometry
        Stats.createSpeciesObjects(data);
        //for # of species in SpeciesArray, calculate the lengths
        Stats.getSpeciesLength();
        Stats.getVisibilityRange(); //generate the ranges for the visibility function.
        Graph.pointsDraw();
      }
    });
  },
  render: function () {
    return (
      <div className="top-bar">
  			<div className="top-bar-left">
  				<ul className="menu">
  					<li className="menu-text">Tetra</li>
  				</ul>
  			</div>
  			<div className="top-bar-right">
          <form onSubmit={Graph.resetCamera}>
            <ul className="menu">
  						<li>
                <button className="file-upload button">
    							<input type="file" ref="csv-file" className="file-input" name="files"
                    onChange={(event)=> {
                      this.handleFileSelect(event)
                      event.target.value=null
                    }}/>Open File
                </button>
  						</li>
              <li>
                <button className="button top-bar-right"><i className="fa fa-video-camera fa-lg"/></button>
              </li>
  					</ul>
          </form>
  			</div>
  		</div>
    );
  }
});

module.exports = Nav;
