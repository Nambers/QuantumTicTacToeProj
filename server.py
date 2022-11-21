from flask import Flask, request, make_response, jsonify

from Board import Board
from Move import Moves
from Utils import UI

# Initializing flask app
app = Flask(__name__)
# set flask static folder and web folder is web
app.static_folder = "./web"
app.static_url_path = ""

# create Board instance
board = Board()
# create Moves instance to get all possible movement
moves = Moves(board)
# UI component
ui = UI(moves)


@app.route('/data', methods=['GET'])
def data():
    global moves
    global board
    selectQubits = [int(i) for i in request.args.get('selectQubits')[1:-1].split(',')]
    option = int(request.args.get('option'))
    if option == 0:
        moves.measure(selectQubits[0])
    elif option == 1:
        moves.h(selectQubits[0])
    elif option == 2:
        moves.z_h(selectQubits[0])
    elif option == 3:
        moves.c_not(selectQubits[0], selectQubits[1])
    elif option == 4:
        moves.swap(selectQubits[0], selectQubits[1])
    transform = {
        0: "X",
        1: "O",
        -1: "?"
    }

    response = jsonify(
        qubits=[transform[i] for i in board.result],
        base64=board.get_image_base64().decode()
    )
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


# Running app
if __name__ == '__main__':
    print(board.get_image_base64())
    app.run(debug=True)
