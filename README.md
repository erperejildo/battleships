# Battleships

Battleships game with Node.js.<br>
Download repository and run `node start.js`<br>
Uncomment this to show coordinates:<br>
<pre>/*
console.log('-----------------');
console.log(fleet.battleship.boats);
console.log(fleet.destroyer.boats);
console.log('-----------------');
*/</pre>
<p>
You could add more types of boats in `boatNames` and in `fleet`.<br>
To add that boat to the game add in line 69 `createBoat(fleet.boatName.size);`. Repeat the line for more boats of same type.
