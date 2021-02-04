/**
Super class of all Quantum Pieces aka Q-pieces.
**/
class Qpiece{
  /**
  @param color int WHITE == 0, BLACK == 1
  @param stateSpace set of states which are represented as strings
  @param initialState array of floats of initial state values,
        !!! MUST match insertion order of state space !!!
  @param action string describing action of Qpiece
  **/
  constructor(stateSpace, initialState, action, color){
    this.color = color;
    this.stateSpace = stateSpace;
    this.action = action
    if(!this.action) this.action = "None";
    if(!stateSpace) {
      this.stateSpace = {};
      console.log("invalid state space for Q-piece")
    }

    if(!initialState || stateSpace.size !== initialState.length){
      console.log("Invalid initial state for Q-piece")
      this.initialState = {};
     }
     else{
       this.initialState = {};
       var i = 0;
       this.stateSpace.forEach(key => this.initialState[key] = initialState[i++])
     }
  }


}


export default Qpiece;
