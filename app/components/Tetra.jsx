var React = require('react');
var Graph = require('Graph');

var Tetra = React.createClass ({
  componentDidMount: function () {
	   Graph.init();
     Graph.animate();
	},
  render: function () {
    return (
      <div id="threeContainer" ref="threeContainer">
      </div>
    );
  }
});

module.exports = Tetra;
