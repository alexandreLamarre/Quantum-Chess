import Qpiece from "./Qpiece.js";
import Normal_state from "./NormalState.js";
import QWBISHOP from "../../models/qwbishop.png";

const WHITE = 0;
const BLACK = 1;

class Qbishop extends Qpiece{
  constructor(color){
    const s = ["Bishop", "Hadamard"];
    //const model = new Image();
    //if(color === WHITE) model.src = QWBISHOP;
    const model = "\u{265D}";
    const secondary_model = "\u{265F}";
    super(s, Normal_state, "PauliY", color, model, secondary_model);
  }
}

export default Qbishop;
