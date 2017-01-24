// Function that conditionally removes the last element of object if empty ""
exports.removeEmptyElements = function(object) {
  var lastElementIndex = (object.length - 1);
  if (object[lastElementIndex].Contig == "") {
    delete object[lastElementIndex];
    console.log(object);
    console.log(Object.keys(object).length);
  }
}

var graphMaxima = {
	"xMin": 0,
	"yMin": 0,
	"zMin": 0,
	"xMax": 0,
	"yMax": 0,
	"zMax": 0
};

exports.graphMaxima = graphMaxima;

var lineCount;
//get the maxima/minima of each axis (dim)
//Takes response.data as input, returns modified graphMaxima
exports.getMinMax = function(object) {
  lineCount = Object.keys(object).length;
	for (var i=0; i<lineCount; i++){
		//if the current lines value is less than the min, it is the new min.
		if (object[i].dim1 < graphMaxima["xMin"]){
			graphMaxima["xMin"] = object[i].dim1;
			//console.log("New X-Minimum: ", graphMaxima["xMin"]);
		}
		if (object[i].dim1 > graphMaxima["xMax"]){
			graphMaxima["xMax"] = object[i].dim1;
			//console.log("New X-Maximum ", graphMaxima["xMax"]);
		}
		//compare the Y values to find min & max.
		if (object[i].dim2 < graphMaxima["yMin"]){
			graphMaxima["yMin"] = object[i].dim2;
			//console.log("New Y-Minimum: ", graphMaxima["yMin"]);
		}
		if (object[i].dim2 > graphMaxima["yMax"]){
			graphMaxima["yMax"] = object[i].dim2;
			//console.log("New Y-Maximum ", graphMaxima["yMax"]);
		}
		//compare the Z values to find min & max.
		if (object[i].dim3 < graphMaxima["zMin"]){
			graphMaxima["zMin"] = object[i].dim3;
			//console.log("New Z-Minimum: ", graphMaxima["zMin"]);
		}
		if (object[i].dim3 > graphMaxima["zMax"]){
			graphMaxima["zMax"] = object[i].dim3;
			//console.log("New Z-Minimum: ", graphMaxima["zMax"]);
		}
	}

	return graphMaxima;
}

var speciesArray = []; //array that will contain the different species
exports.speciesArray = speciesArray;
//function takes in response data, and splits the different species into
//different objects. These objects are then stored in an array.
exports.createSpeciesObjects = function(object){
	var speciesName1 = "";
	var speciesCount = -1;
	//loop through parsedData Object, for each line, add to corresponding species obj.
	for (var i=0; i<lineCount; i++){
		//if the species name changes, create a new object for it.
		if (speciesName1 != object[i].Organism){
			speciesName1 = object[i].Organism;
			speciesArray.push(new Object())
			speciesCount++; //start the count at zero.
		}
		//speciesArray[speciesCount] is object, as above, add data entry to that species object.
		speciesArray[speciesCount][i] = object[i];
	}
	// console.log("The contents of array are: \n",speciesArray[2]); //method access single species obj.
	// console.log("The value of speciesCount is: ",(speciesCount+1));

	return speciesArray;
}
