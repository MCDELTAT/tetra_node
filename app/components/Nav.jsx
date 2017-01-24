var React = require('react');
var Papa = require('Papa');
var Stats = require('Stats');

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
        // scale(Math.abs(minMax["xMax"]/minMax["xMin"]),Math.abs(minMax["yMax"]/minMax["yMin"]),Math.abs(minMax["zMax"]/minMax["zMin"]));
        console.log(minMax);
        Stats.createSpeciesObjects(data);
      }
    });
  },
      //   scale(Math.abs(minMax["xMax"]/minMax["xMin"]),Math.abs(minMax["yMax"]/minMax["yMin"]),Math.abs(minMax["zMax"]/minMax["zMin"]));
      //               //for # of species in SpeciesArray, calculate the lengths
      //               getSpeciesLength();
      //               getVisibilityRange(); //generate the ranges for the visibility function.
      //               //for # of species, draw them all.
      //               for (var i=0; i<speciesArray.length; i++){
      //                  drawPoints(i, speciesLengths[i]);
      //               }
      // }
  render: function () {
    return (
      <div className="top-bar">
  			<div className="top-bar-left">
  				<ul className="menu">
  					<li className="menu-text">Tetra</li>
  				</ul>
  			</div>
  			<div className="top-bar-right">
          <form>
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
  					</ul>
          </form>
  			</div>
  		</div>
    );
  }
});

module.exports = Nav;
