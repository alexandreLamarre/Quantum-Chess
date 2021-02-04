import Qpiece from "./Qpiece.js";
import Normal_state from "./NormalState.js";
import QWBISHOP from "../../models/qwbishop.png";

const WHITE = 0;
const BLACK = 1;

class Qbishop extends Qpiece{
  constructor(color){
    const s = new Set(["Bishop", "Pawn"]);
    const model = new Image();
    if(color === WHITE) model.src = QWBISHOP;
    super(s, Normal_state, "PauliY", color, model);
  }
}

export default Qbishop;
