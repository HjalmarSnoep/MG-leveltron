/*!
* ASSET BEEP 'beep' 
*/
'use strict';
(function (){
	var recipe=`
	{"o":[
{"t":0,"f":440,"v":1,"c":-1}
],

"l":0.05,
"e":[{"t":0,"v":0.2},
{"t":0.6,"v":0.8},
{"t":1,"v":0.1}],"k":"beep","v":1}
`;
	MG.sfx.add("beep",recipe); // you can add a min repeat time to avoid sounds being played too often..
})();

