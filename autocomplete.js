const {Trie,TrieNode} = require("./trietree.js");
const fs = require('fs');
var _iterate = 0;
const serialisedPath = process.env.SERIALIZED_FILE;

const deserialize= function(root,data){
	//check if the string is ")"(representing the end), if so, return
	if(data.charAt(_iterate)===")"){
		_iterate++;
		return;
	}
	// Get the node key
	let temp = data.charAt(_iterate);
	if(data.charAt(_iterate+1)!="#"){
		temp = "";
		while(data.charAt(_iterate)!="#") {
			temp = temp +data.charAt(_iterate);
			_iterate++;
		}
	} else {
		_iterate++;
	}
	// Get the node children
	root.children[temp] =  new TrieNode(temp);
	// Get the node search items
	if(data.charAt(_iterate)==="#") {
		_iterate++;
		let tempArr = "";
		while(data.charAt(_iterate)!="#") {
			tempArr = tempArr +data.charAt(_iterate);
			_iterate++;
		}
		root.children[temp].search = tempArr;
		_iterate++
	}
	//Creating next node deserializing the next string
	deserialize(root.children[temp],data);
	//Creating children node deserializing the next string
	deserialize(root,data);
}
const recreate = function() {
	//Reading the serialized file
	var deserialized_data = fs.readFileSync(serialisedPath).toString();
	var trie = new Trie(null);
	//Deserialize the tree
	deserialize(trie.root,deserialized_data);
	_iterate = 0;
	return trie;
}
module.exports.recreate = recreate;
