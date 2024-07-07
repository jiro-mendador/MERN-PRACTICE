// * every action in computer = event (connection opened, file is opened)
// * node.js can fire events, like readStream obj = opening and closing file event

import fs from "fs";

const readStream = fs.createReadStream("./writeFile.txt");
readStream.on("open", function () {
  console.log("file is open");
});

// * built-in events module - to create, fire and listene for ur own events
import events from "events";
// * all event prop and methods are instance of an EventEmitter obj so u need to create an EventEmitter obj
const eventEmitter = new events.EventEmitter();

// * assign event handler to ur own events using emitter obj
let eventHandler = function () {
  console.log("A sample event happended using emit().");
};

eventEmitter.on("sampleEvent", eventHandler);

// * to trigger event use emit() func
eventEmitter.emit("sampleEvent");
// * this means u can create your own event and trigger it, not just using built-in events