const {Trie} = require("./trietree.js");
const fs = require('fs');
const filePath = process.env.RAW_FILE;
const serialisedPath = process.env.SERIALIZED_FILE;
const csv = require("csvtojson");

const createTree = function(){ return new Promise (function(resolve, reject) {
	var trie = new Trie();
	//Read and insert raw data
	let csvhandler = csv({
      objectMode: true
    })
    .fromStream(fs.createReadStream(filePath));
	csvhandler.on('data',function(chunk){
		let data = JSON.parse(chunk.toString());
		trie.insert(data.name,data.score);
	})
	.on('done', function(){
		//Serialize the tree to disk
		let serializefile = fs.openSync(serialisedPath,'w');
		if(!serializefile)throw err;
		console.log("!---------- Serializing the data structure --------!");
		resolve (serialize(trie.root.children,serializefile));
	})
	.on('error', function(err) {
		reject (err);
	})
})};
const serialize = (root,fd) => {
	if(root===null){return}
	var node = root;
	for(var child in node){
		//Writing node key
		fs.writeSync(fd,child);
		//Marking search results start indicator
		fs.writeSync(fd,"#");
		let search_t = node[child].search.container.map(function(item){
			return item.data;
		});
		//Writing the search results
		fs.writeSync(fd,search_t);
		//Marking search results end indicator
		fs.writeSync(fd,"#");
		//Serialize child nodes
		serialize(node[child].children,fd,"");
	}
	fs.writeSync(fd,")");
}
module.exports = {createTree};