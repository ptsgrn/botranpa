# Copyright (c) 2023 Patsagorn Y.
#
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT

import unittest
import main as m


class UnitTest(unittest.TestCase):
    def test_1(self):
        self.assertEqual(1, 1)

    def word_tokenize(self):
        self.assertEqual(m.MenuExtractor("น้ำดื่ม").tokenize(), ["น้ำดื่ม"])


if __name__ == '__main__':
    unittest.main()
