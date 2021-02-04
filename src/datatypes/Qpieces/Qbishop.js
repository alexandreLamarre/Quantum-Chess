import Qpiece from "./Qpiece.js";
import Normal_state from "./NormalState.js";

class Qbishop extends Qpiece{
  constructor(color){
    const s = new Set(["Bishop", "Pawn"]);
    super(s, Normal_state, "PauliY", color);
  }
}

export default Qbishop;
