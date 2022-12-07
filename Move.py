import random

import Utils


class Moves:
    def __init__(self, board):
        self.board = board

    def measure(self, qid):
        """
        Measure a qubit to classical bit, and refresh the result from classical bit
        :param qid: qubit id
        :return: None
        """
        while self.board.result[qid] != -1:
            qid = Utils.ask_for_qid("again, choose non-measured qubits")
        self.board.qc.measure(self.board.quantum_bits[qid], self.board.classic_bits[0])
        self.board.refresh_result(qid)

    def h(self, qid):
        """
        Apply Hadamard gate to a qubit
        :param qid: qubit id
        :return: None
        """
        self.board.qc.h(qid)

    def z_h(self, qid):
        """
        Apply Z gate followed by H gate
        :param qid: qubit id
        :return: None
        """
        self.board.qc.z(qid)
        self.board.qc.h(qid)

    def c_not(self, qid1, qid2):
        """
        Apply Control NOT gate to two qubits
        :param qid1: control qubit
        :param qid2: target qubit
        :return: None
        """
        self.board.qc.cx(self.board.quantum_bits[qid1], self.board.quantum_bits[qid2])

    def swap(self, qid1, qid2):
        """
        Apply SWAP to two qubits
        :param qid1: qubit 1
        :param qid2: qubit 2
        :return: None
        """
        self.board.qc.swap(self.board.quantum_bits[qid1], self.board.quantum_bits[qid2])
        tmp = self.board.result[qid1]
        self.board.result[qid1] = self.board.result[qid2]
        self.board.result[qid2] = tmp

    def reset(self):
        self.board.reset()

    def random_quantum(self):
        rid = random.randint(0, 8)
        while self.board.result[rid] == -1:
            rid = random.randint(0, 8)
        return rid

    def random_second_quantum(self, controlled: int):
        rid = random.randint(0, 8)
        while self.board.result[rid] == -1 or rid == controlled:
            rid = random.randint(0, 8)
        return rid

    def quantum_left(self):
        count = 0
        for i in range(0, 8):
            if self.board.result[i] == -1:
                count = count + 1
        return count
