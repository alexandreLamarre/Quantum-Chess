import Qpiece from "./Qpiece.js";
import QWKING from "../../models/wking.png";

const WHITE = 0;
const BLACK = 1;

class Qking extends Qpiece{
  constructor(color){
    const s = ["King"]
    // const model = new Image();
    // if(color === WHITE) model.src = QWKING;
    const model = "\u{265A}";
    const secondary_model = null;
    super(s, [[1.0, 0.0]], "None", color, model, secondary_model);
  }
}

export default Qking;
