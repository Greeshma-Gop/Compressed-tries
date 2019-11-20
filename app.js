 const autocomplete = require('./autocomplete.js');
 const {createTree} = require('./build.js');
 const serialisedPath = process.env.SERIALIZED_FILE;//"./serialize.txt";
 const fs = require('fs');
 
const buildNode = function() {
	let arg = process.argv[2] || console.log("Please provide a search argument");
	console.log("!---------- Deserializing the data structure --------!");
	let trie = autocomplete.recreate();
	console.log(trie.root);
	console.log(trie.find(arg.toLowerCase()));
}
 
 const main = function() {
	 //Check if the serialised disk file exist, if so proceeding to creating trie inserting the values. Then deserialize the same
		 if (!fs.existsSync(serialisedPath)) {
			 console.log("!---------- Building the data structure --------!");
			let build_prom = createTree();
			build_prom.then(buildNode);
		} else {
			buildNode();
		}
 };

 main();
