const {PriorityQueue} = require("./pq.js");



//Find all words
const findAll = function(node, prefix){
	while(prefix.length) {
		if(!prefix || !node){return node;}
		var keys = Object.keys(node.children);
		//loop throu children nodes and if there is char match, find till where it match or doesn't match 
		for(let child in node.children){
			//if there is char match
			if(child.charAt(0)===prefix.charAt(0)){
				//find till where it match or doesn't match 
				for(let i=0;i<prefix.length;i++){
					//if prefix doesn't match
					if(prefix.charAt(i)!=child.charAt(i)){
						//if no node string left
						if(!child.charAt(i)) {	
							node = node.children[child];
							prefix = prefix.substring(i);
							break;
						} else {
							//if we reached the length of the prefix
							if(!prefix.charAt(i)){
								node = node.children[child];prefix = "";break;
							} else {
								return "";
							}
						}
					} else {
						//if we reached the length of the prefix
						if(i===prefix.length-1) return node.children[child];
						}
					}
				break;
			} else {
				//if we reached the length of the prefix
				if(child === keys[keys.length-1]) return "";
			}
		}
	}
	return node;
}


class TrieNode {
  constructor(key,score) {
    this.key = key;
		this.search = new PriorityQueue();
		this.children = {};
		this.end = false;
  }
}


class Trie {
  constructor(key,score) {
    this.root = new TrieNode(null);
	}
	//check where the insert needs to be fit in
  compare(node,word,start,stop,parent,prefix,score){
		if(!word){return null}
		//loop throu child nodes and check for a match
	for(var child in node.children) {
		if(child.charAt(0) === word.charAt(0)) {
			//if a match is found, insert the word to the queue
			prefix?node.children[child].search.enqueue(prefix+"_"+start+word,score):node.children[child].search.enqueue(start+word,score);
			if(child === word) {
				return {node, word, start, stop};
			} else {
				//check till where it matches
				let maxLength = Math.max(child.length,word.length);
				for(var i=0;i<maxLength;i++){
					//if there is  a mismatch, pass how the string has be to splitted
					if(child.charAt(i)!=word.charAt(i)){
						parent = node;
						node = node.children[child];
						start = start+word.substring(0,i);
						//new node key will be passed
						word = word.substr(i,word.length-1);
						if(i === child.length) {
							stop = "";
							return this.compare(node,word,start,stop,parent,prefix,score);
						} else {
							//if no mismatch, pass how the string has be to splitted
							//node key will remain same
							start = child.substr(0,i);
							stop = child.substr(i);
							return {node,word,start,stop,parent};
						}
					}}}
			break;
		}}
		return {node,word,start, stop,parent};
	}

	//Insert word
  insert(word,score,prefix){
	let root = this;
	let node = this.root;
	word = word.toLowerCase();
	//get the compared result
	let _r = this.compare(node,word,"","",root,prefix,score);
	//if there needs split, generate the node , children node, delete old node and enqueue the search results
		if(_r.stop.length>0) {
			let oldKey = _r.node.key;
			//new node for start of the split string
			_r.parent.children[_r.start] = new TrieNode(_r.start);
			_r.parent.children[_r.start].search = _r.parent.children[oldKey].search;
			_r.parent.children[_r.start].search.enqueue(word,score);
			//new children node for start of the split string
			_r.parent.children[_r.start].children[_r.stop] = new TrieNode(_r.stop);
			_r.parent.children[_r.start].children[_r.stop].children = _r.node.children;
			let start_child = _r.node.children;
			for(var child in start_child){
				for(var data in start_child[child].search.container)
					_r.parent.children[_r.start].children[_r.stop].search.enqueue(start_child[child].search.container[data].data,start_child[child].search.container[data].score);
			}
			if(_r.parent.children[_r.start+_r.stop].end){
				_r.parent.children[_r.start].children[_r.stop].end = true;
				_r.parent.children[_r.start].children[_r.stop].search.enqueue(word.substring(0,Math.abs(word.length - _r.word.length))+_r.stop,score);
			}
			//if is word is passed from compare function, it implies the node key responsible for node split
			if(_r.word.length) {
				_r.parent.children[_r.start].children[_r.word] = new TrieNode(_r.word);
				_r.parent.children[_r.start].children[_r.word].search.enqueue(word,score);
				_r.parent.children[_r.start].children[_r.word].end = true;
			}
			//delete the old one
			delete _r.parent.children[oldKey];
			return
		} else {
			_r.node.children[_r.word] = new TrieNode(_r.word);
			prefix?_r.node.children[_r.word].search.enqueue(prefix+"_"+word,score):_r.node.children[_r.word].search.enqueue(word,score);
			_r.node.children[_r.word].end = true;
			let checkPrefix = word.indexOf("_");
			//If there is a underscore repeat the steps with the string followed by underscore
			if(checkPrefix>=0) {
				this.insert(word.substr(checkPrefix+1),score,word.substr(0,checkPrefix))
			}
		}
  }
  find(prefix){
	var node = this.root;
	var result =  findAll(node,prefix);
	return result?result.search:"No match found";
	//return result?result.search.container:"No match found";
	}
}
module.exports = {
	Trie,
	TrieNode,
}