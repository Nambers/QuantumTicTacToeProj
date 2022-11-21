from Board import Board
from Move import Moves
from Utils import UI

# create Board instance
board = Board()
# create Moves instance to get all possible movement
moves = Moves(board)
# UI component
ui = UI(moves)
# print board in console
board.print_board()
while board.check_win():
    # do action
    ui.ask_for_action()
    # print board
    board.print_board()
    # print image to qubits
    board.show_image()
