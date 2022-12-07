from Board import Board
from Move import Moves
from Utils import UI, select_mode, select_difficulty

# create Board instance
board = Board()
# create Moves instance to get all possible movement
moves = Moves(board)
# UI component
ui = UI(moves)
mode = select_mode()
diff = select_difficulty() if (mode == "pve") else ""

# print board in console
board.print_board()
playerTurn = True
while board.check_win()[0]:
    if playerTurn:
        print("player's turn")
        ui.ask_for_action()
    else:
        print("AI's turn")
        if diff == "simple":
            ui.random_move()
        else:
            ui.smart_move()
    # print board
    board.print_board()
    # print image to qubits
    board.show_image()
    if mode == "pve":
        playerTurn = not playerTurn
