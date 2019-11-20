class PriorityQueue {
   constructor(maxSize) {
      if (isNaN(maxSize)) {
         maxSize = 10;
       }
      this.maxSize = maxSize;
      this.container = [];
   }
   display() {
      //console.log(this.container);
   }
   isEmpty() {
      return this.container.length === 0;
   }
   isFull() {
      return this.container.length >= this.maxSize;
   }
   enqueue(data, score) {
      if (this.isFull()) {
         //console.log("Queue Overflow!");
         return;
      }
      let currElem = new this.Element(data, score);
      let addedFlag = false;
      for (let i = 0; i < this.container.length; i++) {
         if (currElem.score > this.container[i].score) {
            this.container.splice(i, 0, currElem);
            addedFlag = true; break;
         }
      }
      if (!addedFlag) {
         this.container.push(currElem);
      }
   }
   dequeue() {
		if (this.isEmpty()) {
			// console.log("Queue Underflow!");
		return;
	}
		return this.container.pop();
	}
	peek() {
		if (isEmpty()) {
		//  console.log("Queue Underflow!");
			return;
		}
		return this.container[this.container.length - 1];
	}
	clear() {
	this.container = [];
   }
}

PriorityQueue.prototype.Element = class {
   constructor(data, score) {
      this.data = data;
      this.score = score;
   }
};

module.exports.PriorityQueue = PriorityQueue;