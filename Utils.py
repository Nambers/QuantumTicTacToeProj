reflection_map = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]


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


class UI:
    def __init__(self, moves):
        self.moves = moves
        self.actions = {"m": lambda: moves.measure(ask_for_qid("to measure")),
                        "h": lambda: moves.h(ask_for_qid("to apply Hadamard gate")),
                        "zh": lambda: moves.z_h(ask_for_qid("to apply z + h gate")),
                        "cnot": lambda: moves.c_not(ask_for_qid("to the control qubit of cnot gate"),
                                                    ask_for_qid("to the target qubit of cnot gate")),
                        "swap": lambda: moves.swap(ask_for_qid("to the first qubit of swap gate"),
                                                   ask_for_qid("to the second qubit of swap gate"))}

    def ask_for_action(self):
        """
        Ask the user for an action and execute it
        :return: None
        """
        action = input(
            "Enter the action you want to take(m - measure, h - Hadamard gate, zh - z + h gate, cnot - Control Not gate, swap - swap gate): ")
        while action not in self.actions.keys():
            action = input("input invalid, plz re-enter:")
        self.actions[action]()
        return
