import Qpiece from "./Qpiece.js";
import Normal_state from "./NormalState.js";
import QWQUEEN from "../../models/qwqueen.png";

const WHITE = 0;
const BLACK = 1;

class Qqueen extends Qpiece{
  constructor(color){
    const s = new Set(["Queen", "Pawn"]);
    const model = new Image();
    if(color === WHITE) model.src = QWQUEEN;
    super(s, Normal_state, "Hadamard", color, model);
  }
}

export default Qqueen;
