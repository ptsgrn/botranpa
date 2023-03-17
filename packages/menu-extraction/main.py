# Copyright (c) 2023 Patsagorn Y.
#
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT
import pythainlp
from pythainlp.spell import correct
from pythainlp.tokenize import deepcut


class MenuExtractor():
    def __init__(self, raw_menu):
        self.menu = raw_menu

    def extract(self):
        return self.menu

    def correct_spelling(self):
        return correct(self.menu)

    def tokenize(self):
        return deepcut.tokenize(self.menu)
