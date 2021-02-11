import Qpiece from "./Qpiece.js";
import QWPAWN_BISHOP from "../../models/qwpawn-bishop.png";
import QWPAWN_KING from "../../models/qwpawn-king.png";
import QWPAWN_KNIGHT from "../../models/qwpawn-knight.png";
import QWPAWN_QUEEN from "../../models/qwpawn-queen.png";
import QWPAWN_ROOK from "../../models/qwpawn-rook.png";

const WHITE = 0;
const BLACK = 1;

class Qpawn extends Qpiece{
  /**
  @param piece the string representing the piece that starts behind it
  **/
  constructor(piece, color){
    const s = ["Pawn", piece];
    var secondary_model;
    // let model = new Image();
    if(piece === "Bishop") secondary_model = "\u{265D}";
    if(piece === "King") secondary_model = "\u{265A}";
    if(piece === "Knight") secondary_model = "\u{265E}";
    if(piece === "Queen") secondary_model = "\u{265B}";
    if(piece === "Rook") secondary_model = "\u{265C}";
      const model = "\u{265F}";

    super(s, [[1.0,0.0], [0.0,0.0]], "PauliZ", color, model, secondary_model);
  }
}

export default Qpawn;
