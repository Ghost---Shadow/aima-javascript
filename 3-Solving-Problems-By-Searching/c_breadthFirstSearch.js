var bfsProblemStatement = function(graph,start,end){

	this.graph = graph;
	this.ROWS = this.graph.length;
	this.COLS = this.graph[0].length;
	this.TOTAL_STATES = this.ROWS * this.COLS;
	this.INITIAL = start;
	this.END = end;

	this.NO_ACTION = 0;
	this.UP = 1;
	this.RIGHT = 2;
	this.DOWN = 3;
	this.LEFT = 4;

	this.at = function(i,j){
		return i * this.COLS + j;
	};
	this.getIJ = function(x){
		return [parseInt(x/this.COLS),x%this.COLS];
	};
	this.GOAL_TEST = function(state){
		return this.END == state;
	};
	this.ACTIONS = function(state){
		var actions = [this.NO_ACTION];
		var i = this.getIJ(state)[0];
		var j = this.getIJ(state)[1];
		if(i - 1 >= 0 && !this.graph[i-1][j]) actions.push(this.UP);
		if(i + 1 < this.ROWS && !this.graph[i+1][j]) actions.push(this.DOWN);
		if(j - 1 >= 0 && !this.graph[i][j-1]) actions.push(this.LEFT);
		if(j + 1 < this.COLS && !this.graph[i][j+1]) actions.push(this.RIGHT);
		return actions;
	};
	this.CHILD_NODE = function(state,action){
		var x = this.getIJ(state)[0];
		var y = this.getIJ(state)[1];
		switch(action){
			case this.NO_ACTION: break;
			case this.UP:x--;break;
			case this.RIGHT:y++;break;
			case this.DOWN:x++;break;
			case this.LEFT:y--;break;
		}
		return this.at(x,y)
	}
};



$(document).ready(function(){
	$.ajax({
		url : "breadthFirstSearch.js",
		dataType: "text",
		success : function (data) {
			$("#breadthFirstSearchCode").html(data);
		}
	});


	var two,canvas,bfs;

	var graph = [[0,0,0,0,1,1,0,0,1,1],
							[1,1,0,0,1,0,1,0,0,0],
							[0,0,0,0,0,0,0,0,1,1],
							[0,0,1,0,1,1,0,0,0,0],
							[0,1,1,0,1,1,1,1,0,1],
							[0,0,1,0,1,1,0,1,0,0],
							[1,0,1,0,1,0,0,0,0,0]];

	var start = 0;
	var end = 19;

	var DELAY = 0.5 *60;
	var SIZE = 40;
	var NONBLOCKING = "#AAAACC";
	var BLOCKING = "#555577";
	var EXPLORED = "#edb168";
	var STARTCOLOR = "#EE6622";
	var ENDCOLOR = "#66EE22";
	var FINISHCOLOR = "#0d6d1e";
	var w,h,baseX,baseY;

	var problem = undefined;
	var state,lastState;
	var m_frame = DELAY;
	var tiles = [];

	function updateHandler(frameCount){
		--m_frame;
		lastState = state;
		if(m_frame == 0){
			step();
			m_frame = DELAY
		}else{
			interpolate();
		}
	};
	function clickHandler(){
		two.unbind('update');
		tiles = [];
		m_frame = DELAY;
		init();
	}
	function init(){
		canvas = document.getElementById('breadthFirstSearchCanvas');
		canvas.addEventListener('click',clickHandler,false);
		canvas.innerHTML = "";
		w = canvas.offsetWidth, h = 300;
		two = new Two({width:w , height:h}).appendTo(canvas);
		problem = new bfsProblemStatement(graph,start,end);
		bfs = new breadthFirstSearch(problem);

		state = lastState = problem.INITIAL;
		baseX = two.width/2 - problem.COLS/2 * SIZE;
		baseY = two.height/2 - problem.ROWS/2 * SIZE;

		two.bind('update',updateHandler).play();

		drawBackground();
	};

	function step(){
		var isNewState,newState;
		[isNewState,newState] = bfs.iterate();
		if(isNewState){
			state = newState;
		}
	};



	function drawBackground(){
		for(var i = 0; i < problem.ROWS; i++){
			for(var j = 0; j < problem.COLS; j++){
				var temp = two.makeRectangle(SIZE/2+j*SIZE,SIZE/2+i*SIZE,SIZE,SIZE);
				if(problem.graph[i][j])
				temp.fill = BLOCKING;
				else
				temp.fill = NONBLOCKING;
				temp.noStroke();
				tiles.push(temp);

			}
		}
		tiles[problem.INITIAL].fill = STARTCOLOR;
		tiles[problem.END].fill = ENDCOLOR;
		var backgroundGroup = two.makeGroup(tiles);
		backgroundGroup.translation.set(baseX,baseY);
	};

	function interpolate(){
		if(state != problem.INITIAL && state!= problem.END){
			tiles[state].fill = EXPLORED;
		}
		if(state == problem.END){
			tiles[state].fill = FINISHCOLOR;
		}
	}
	
	init();
});
