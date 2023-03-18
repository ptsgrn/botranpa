# Copyright (c) 2023 Patsagorn Y.
#
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT
# from pythainlp.spell import correct
# from pythainlp.tokenize import word_tokenize
import re
from trie import Trie


def trie_regex_from_words(words):
    trie = Trie()
    for word in words:
        trie.add(word)
    return re.compile('(' + (trie.pattern() or '') + ')', re.I)


class MenuExtractor():
    def __init__(self, regex_menu_matcher):
        self.regex_menu_matcher = regex_menu_matcher

    def extract(self, raw_menu):
        marked_matches = self.regex_menu_matcher.findall(raw_menu)
        return marked_matches if marked_matches else None


class MenuExtractorFactory:
    def __init__(self, availabel_word_list=[]):
        # sort by length, lonest to shortest
        self.availabel_word_list = sorted(
            availabel_word_list, key=len, reverse=True) if availabel_word_list else []

    def create_menu_regex_matcher(self):
        return trie_regex_from_words(self.availabel_word_list)

    def create_menu_extractor(self):
        return MenuExtractor(self.create_menu_regex_matcher())
