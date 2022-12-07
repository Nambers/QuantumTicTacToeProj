# Do the necessary imports
import base64
import io

import matplotlib
import matplotlib.pyplot as plt
from qiskit import Aer
from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister, execute
from qiskit.quantum_info import Statevector

from Utils import reflection_map

matplotlib.use('agg')


class Board:
    """
    The board is represented by a 3x3 matrix, 9 quantum bits and 1 classical bit(used to measure)
    """
    quantum_bits = QuantumRegister(9, name="q")
    classic_bits = ClassicalRegister(1, name="c")
    qc = QuantumCircuit(quantum_bits, classic_bits)
    backend = Aer.get_backend('aer_simulator')
    # default value is -1
    result = [-1, -1, -1, -1, -1, -1, -1, -1, -1]

    def reset(self):
        self.result = [-1, -1, -1, -1, -1, -1, -1, -1, -1]
        self.quantum_bits = QuantumRegister(9, name="q")
        self.classic_bits = ClassicalRegister(1, name="c")
        self.qc = QuantumCircuit(self.quantum_bits, self.classic_bits)
        for a in self.quantum_bits:
            self.qc.h(a)

    def __init__(self):
        for a in self.quantum_bits:
            self.qc.h(a)

    def check_win(self):
        if self.result[0] == self.result[1] == self.result[2] != -1     \
                or self.result[0] == self.result[4] == self.result[8] != -1 \
                or self.result[0] == self.result[3] == self.result[6] != -1:
            print(self.result[0], "wins")
            return [False, self.result[0]]
        elif self.result[3] == self.result[4] == self.result[5] != -1 \
                or self.result[1] == self.result[4] == self.result[7] != -1\
                or self.result[2] == self.result[4] == self.result[6] != -1:
            print(self.result[4], "wins")
            return [False, self.result[4]]
        elif self.result[6] == self.result[7] == self.result[8] != -1 \
                or self.result[2] == self.result[5] == self.result[8] != -1:
            print(self.result[8], "wins!")
            return [False, self.result[8]]
        elif -1 not in self.result:  # draw
            print("draw")
            return [False, 2]
        else:
            # don't have result yet
            return [True, -1]


    def refresh_result(self, qid):
        """
        Grab the result from classic bit and refresh the result in board
        :param qid:
        :return: None
        """
        job = execute(self.qc, self.backend, shots=100)
        res = job.result().get_counts()
        if "0" in res and "1" not in res:
            self.result[qid] = 0
        elif "0" not in res and "1" in res:
            self.result[qid] = 1
        elif res["0"] >= res["1"]:
            self.result[qid] = 0
        else:
            self.result[qid] = 1

    def show_image(self, output='mpl'):
        """
        Show the board as an image
        :param output: draw option
        :return: None
        """
        self.qc.draw(output=output).show()

    def get_image_base64(self, output='mpl'):
        """
        Save the board as an image
        :param output: draw option
        :return: None
        """
        buf = io.BytesIO()
        fig = self.qc.draw(output=output)
        fig.savefig(buf, format='jpg')
        buf.seek(0)
        plt.close(fig)
        return base64.b64encode(buf.read())

    def print_board(self):
        """
        Print console board
        :return: None
        """
        print("---------")
        for i in reflection_map:
            temp = ""
            for k in i:
                if self.result[k] == -1:
                    temp += "|?|"
                else:
                    temp += "|" + str(self.result[k]) + "|"
            print(temp)
            print("---------")

    def return_probabilities(self, qid):
        backend = Aer.get_backend('statevector_simulator')
        ouput_state = backend.run(self.qc, shots=50).result().get_statevector()
        return Statevector(ouput_state).probabilities([qid])[0]
