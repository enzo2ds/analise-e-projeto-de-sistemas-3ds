
# teste-calculadora.py

import unittest
from calculadora import soma, subtrai, multiplica, divide


class TestCalculadora(unittest.TestCase):

    def test_soma(self):
        casos = [
            (1, 2, 3),
            (-1, 1, 0),
            (-1, -1, -2),
            (10, 5, 15),
            (0, 0, 0)
        ]

        for a, b, esperado in casos:
            with self.subTest(a=a, b=b):
                self.assertEqual(soma(a, b), esperado)

        print("CONFIRMADO: Todos os testes de soma passaram!")

    def test_subtrai(self):
        casos = [
            (10, 5, 5),
            (-1, -1, 0),
            (0, 1, -1),
            (20, 10, 10),
            (5, 10, -5)
        ]

        for a, b, esperado in casos:
            with self.subTest(a=a, b=b):
                self.assertEqual(subtrai(a, b), esperado)

        print("CONFIRMADO: Todos os testes de subtração passaram!")

    def test_multiplica(self):
        casos = [
            (3, 7, 21),
            (-1, 1, -1),
            (0, 10, 0),
            (5, 5, 25),
            (-2, -3, 6)
        ]

        for a, b, esperado in casos:
            with self.subTest(a=a, b=b):
                self.assertEqual(multiplica(a, b), esperado)

        print("CONFIRMADO: Todos os testes de multiplicação passaram!")

    def test_divide(self):
        casos = [
            (10, 2, 5),
            (-10, 2, -5),
            (20, 4, 5),
            (-10, -2, 5),
            (0, 5, 0)
        ]

        for a, b, esperado in casos:
            with self.subTest(a=a, b=b):
                self.assertEqual(divide(a, b), esperado)

        with self.assertRaises(ValueError):
            divide(10, 0)

        print("CONFIRMADO: Todos os testes de divisão passaram!")
        print("CONFIRMADO: A divisão por zero foi identificada corretamente!")

    @classmethod
    def tearDownClass(cls):
        print("\n====================================")
        print("TODOS OS TESTES FORAM EXECUTADOS!")
        print("====================================")


if __name__ == '__main__':
    unittest.main(verbosity=2)
