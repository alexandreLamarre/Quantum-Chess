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
    const s = new Set(["Pawn", piece]);
    // let model = new Image();
    // if(piece === "Bishop" && color === WHITE) model.src = QWPAWN_BISHOP;
    // if(piece === "King" && color === WHITE) model.src = QWPAWN_KING;
    // if(piece === "Knight" && color === WHITE) model.src = QWPAWN_KNIGHT;
    // if(piece === "Queen" && color === WHITE) model.src = QWPAWN_QUEEN;
    // if(piece === "Rook" && color === WHITE) model.src = QWPAWN_ROOK;
      const model = "\u{265F}";
    super(s, [1.0, 0.0], "PauliZ", color, model);
  }
}

export default Qpawn;
