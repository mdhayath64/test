import unittest

from prime import is_prime

class Tests(unittest.TestCase):

    def test_1(self):
        """check that 1 is not a prime."""
        self.assertFalse(is_prime(1))

    def test_2(self):
        """check that 2 is a prime."""
        self.assertTrue(is_prime(2))


    def test_8(self):
        """check that 8 is not a prime."""
        self.assertFalse(is_prime(8))

    def test_11(self):
        """check that 11 is a prime."""
        self.assertTrue(is_prime(11))

    def test_25(self):
        """check that 25 is not a prime."""
        self.assertFalse(is_prime(25))

    def test_28(self):
        """Check that 28 is not prime."""
        self.assertFalse(is_prime(28))

    def test_28(self):
        """check that q is not a prime."""
        self.assertFalse(is_prime(1))



if __name__ == "__main__":
    unittest.main()




