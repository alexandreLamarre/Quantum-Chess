# Quantum Chess

A web-app that implements a game of chess augmented with quantum rules dictated by underlying quantum circuits.
The backend is written in Golang and its directory can be found [here](https://github.com/alexandreLamarre/Quantum-Chess-Backend)

For those unfamiliar with Quantum mechanics, a brief overview is given in [Quantum Mechanics Overview](#Quantum-Mechanics-Overview) Section

## Table of contents
- [Rules](#Rules)
- [Quantum Mechanics Overview](#Quantum-Mechanics-Overview)
- [References](#References)

### Rules

We wall call the game pieces in Quantum Chess Q-pieces for convenience.
For those unfamiliar with Quantum mechanics, a brief overview is given in Quantum Mechanics.

- Each Q-piece has a **state space**, **initial state** and **quantum gate(or action)** associated with it:
  - Q-pawn: 
      - State space: {Pawn, The piece starting behind it}
      - Initial state: 
        - 1.0 Pawn 
        - 0.0 Piece behind it
      - Quantum gate: **Pauli Z**, (qantum phase shift) 
  - Q-queen:
      - State space: {Queen, Pawn}
      - Initial state: 
         - 1/sqrt(2) Queen
         - 1/Sqrt(2) Pawn
      - Quantum gate: **Hadamard Gate**
  - Q-king (regular chess king):
      - State space: {King}
      - Initial state: 
        - 1.0 King
      - Quantum gate: **None**
  - Q-Rook:
      - State space: {Rook, Pawn}
      - Initial state: 
        - 1/sqrt(2) Rook
        - 1/sqrt(2) Pawn
      - Quantum action: **Measurement**
  - Q-Bishop:
      - State space: {Bishop, Pawn}
      - Initial state: 
        - 1/sqrt(2) Bishop
        - 1/sqrt(2) Pawn
      - Quantum gate: **Pauli Y**
  - Q-Knight:
      - State space: {Knight, Pawn}
      - Initial state:
        - 1/sqrt(2) Knight
        - 1/sqrt(2) Pawn
      - Quantum gate: **Pauli Z**
        
- Q-pieces in a mixed state can move in terms of pieces in their state space
  - Example: A Q-rook in a mixed state can move as a rook or pawn

- Q pieces in a determined state, i.e. one of the states = 1.0 and the other 0.0, can only move as the piece whose state they are in.
  - Example: A Q-queen with state (0.0 Queen, 1.0 Pawn) can **ONLY** move as a **PAWN**.
 
- A Q-piece's **area of influence** is determined when a Q-piece is moved. The area of influence is the path upon which the Q-piece could have been to reach its destination.As it is moving, pieces in the moved Q-piece's area of influence become entangled with the moved Q-piece, unless it is performing a capture. 
  - Examples shown below
  
  TODO: ADD EXAMPLE PICTURES

- A Q-piece's quantum gate is applied to the entangled state produced by its **area of influence**, unless it is performing a capture with its move.
  

- A Q-piece's state is determined when it performs a capture or is captured itself. (Following the rules of quantum mechanics, entangled q-pieces that perform the capture or are captured are also measured). A Q-piece's state can also be measured by a Rook's **area of influence**.

- An entangled state of 8 or more pieces collapses on itself due to instability and becomes measured. (The real reason this rule is implemented is due to **hardware limitations**)

- The game ends when a player has only one remaining king in a determined state that is checkmated.

### Refereces
- Nielsen, Michael A., and Isaac Chuang. "Quantum computation and quantum information." (2002): 558-559.
