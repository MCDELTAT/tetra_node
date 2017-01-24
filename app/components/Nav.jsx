var React = require('react');
var Papa = require('Papa');

var Nav = React.createClass({
  handleFileSelect: function (evt) {
    var file = evt.target.files[0];
    //console.log(file);
    var data;

    Papa.parse(evt.target.files[0], {
      header: true,
      dynamicTyping: true,
      complete: function(results) {
        data = results;
        //call handler functions from in here, don't worry about data races.
        //first, check to see if the final object in array is empty, if true, remove.
        console.log(data);
      }
    });
  },
      //   minMax = getMinMax();
      //   scale(Math.abs(minMax["xMax"]/minMax["xMin"]),Math.abs(minMax["yMax"]/minMax["yMin"]),Math.abs(minMax["zMax"]/minMax["zMin"]));
      //               createSpeciesObjects();
      //
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
