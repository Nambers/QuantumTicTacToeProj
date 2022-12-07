import random

reflection_map = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
transform = {
    0: "X",
    1: "O",
    -1: "?",
    2: "draw"
}


def ask_for_qid(msg=""):
    """
    Asks for a qubit id used by moves
    :param msg: tips message to be displayed in input
    :return: None
    """
    qid = input("Enter the qubit id (" + msg + "): ")
    while not qid.isnumeric() or (9 < int(qid) or int(qid) < 0):
        qid = input("input invalid, please enter a number between 0 and 8: ")
    return int(qid)


def select_difficulty():
    diff = input("enter the difficulty you want to play (simple/normal): ")
    while not (diff == "simple" or diff == "normal"):
        diff = input("input invalid, please enter simple or normal: ")
    return diff


def select_mode():
    mode = input("enter the mode you want to play (pve/pvp): ")
    while not (mode == "pve" or mode == "pvp"):
        mode = input("input invalid, please enter pve or pvp: ")
    return mode


class UI:
    def __init__(self, moves):
        self.moves = moves
        self.actions = {"m": lambda: moves.measure(ask_for_qid("to measure")),
                        "h": lambda: moves.h(ask_for_qid("to apply Hadamard gate")),
                        "zh": lambda: moves.z_h(ask_for_qid("to apply z + h gate")),
                        "cnot": lambda: moves.c_not(ask_for_qid("to the control qubit of cnot gate"),
                                                    ask_for_qid("to the target qubit of cnot gate")),
                        "swap": lambda: moves.swap(ask_for_qid("to the first qubit of swap gate"),
                                                   ask_for_qid("to the second qubit of swap gate")),
                        "reset": lambda: moves.reset()}

    def ask_for_action(self):
        """
        Ask the user for an action and execute it
        :return: None
        """
        action = input(
            "Enter the action you want to take(m - measure, h - Hadamard gate, zh - z + h gate, cnot - Control Not gate, swap - swap gate, reset - reset game): ")
        while action not in self.actions.keys():
            action = input("input invalid, plz re-enter:")
        self.actions[action]()
        return

    def pick_move(self):
        mid = random.randint(1, 2) if self.moves.quantum_left() == 1 else random.randint(1, 4)
        if mid == 1:
            self.moves.h(self.moves.random_quantum())
        elif mid == 2:
            self.moves.z_h(self.moves.random_quantum())
        elif mid == 3:
            first = self.moves.random_quantum()
            self.moves.c_not(first, self.moves.random_second_quantum(first))
        elif mid == 4:
            first = self.moves.random_quantum()
            self.moves.swap(first, self.moves.random_second_quantum(first))

    def random_move(self):
        if random.randint(0, 1):
            self.moves.measure(self.moves.random_quantum())
        else:
            self.pick_move()

    def smart_move(self):
        maxProb = 0
        qid = 0
        for i in range(0, 8):
            if self.moves.board.return_probiblity(i) > maxProb and self.moves.board.result[i] == -1:
                maxProb = self.moves.board.return_probiblity(i)
                qid = i
        print(maxProb)
        if maxProb > 0.6:
            self.moves.measure(qid)
        else:
            self.pick_move()
