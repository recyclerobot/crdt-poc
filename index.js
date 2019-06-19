import Automerge from "automerge";

// let's start with an initial moonwalk document
let moonwalkDoc1 = Automerge.init();

// moonwalkDoc is immutable -- you cannot change it directly (if you try,
// you'll either get an exception or your change will be silently ignored,
// depending on your JavaScript engine). To change it, you need to call
// Automerge.change() with a callback in which you can mutate the state.
moonwalkDoc1 = Automerge.change(moonwalkDoc1, doc => {
  doc.entry = 0;
  doc.exit = 0;
  doc.floorY = 0;
  doc.completeBody = false;
  doc.appropriate = false;
});

console.log("⚡️ Initial Document 1:");
console.log(moonwalkDoc1);

// Let's update our doc
moonwalkDoc1 = Automerge.change(moonwalkDoc1, doc => {
  doc.entry = 300;
  doc.exit = 700;
});

console.log("⚡️ Updated Document 1:");
console.log(moonwalkDoc1);

// Now let's simulate another device, whose application state is doc2. We
// initialise it separately, and merge doc1 into it. After merging, doc2 has
// a copy of all the cards in doc1.

let moonwalkDoc2 = Automerge.init();
moonwalkDoc2 = Automerge.merge(moonwalkDoc2, moonwalkDoc1);

console.log("💎 Initial Document 2:");
console.log(moonwalkDoc2);

// Now make a change on device 1:
moonwalkDoc1 = Automerge.change(moonwalkDoc1, doc => {
  doc.completeBody = true;
});

console.log("⚡️ Updated Document 1:");
console.log(moonwalkDoc1);

// And, unbeknownst to device 1, also make a change on device 2:
moonwalkDoc2 = Automerge.change(moonwalkDoc2, doc => {
  doc.entry = 500;
});

console.log("💎 Updated Document 2:");
console.log(moonwalkDoc2);

// Now comes the moment of truth. Let's merge the changes from device 2 back
// into device 1. You can also do the merge the other way round, and you'll get
// the same result.

let finalDoc = Automerge.merge(moonwalkDoc1, moonwalkDoc2);

console.log("🏰 Final Document:");
console.log(finalDoc);
