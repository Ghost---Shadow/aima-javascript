
var breadthFirstSearch = function(problem){
  this.problem = problem;
  this.node = problem.INITIAL;
  if(this.problem.GOAL_TEST(this.node)){
    return this.problem.NO_ACTION;
  }
  this.frontier = [this.node];
  this.explored = {};
  this.iterate = function(){
    var isNewState = false;
    //If Goal reached, Return No Action
    if(this.problem.GOAL_TEST(this.node)){
      return [isNewState,this.problem.NO_ACTION];
    }
    //If stack is empty, return No Action
    if(this.frontier.length == 0){
      return [isNewState,this.problem.NO_ACTION];
    }
    //Extract the shallowest node from the queue
    node = this.frontier.shift();
    this.node = node;
    //Add Extracted node to explored
    this.explored[node] = true;
    actions = this.problem.ACTIONS(node)
    for(var i = 0; i < actions.length; i++){
      var action = actions[i]
      child = this.problem.CHILD_NODE(node,action);
      if(!this.explored[child]){
        this.frontier.push(child);
        this.explored[child] = true;
      }
    }
    isNewState = true;
    return [isNewState,node]
  }
}
