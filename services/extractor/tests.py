# Copyright (c) 2023 Patsagorn Y.
#
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT

import unittest

from main import MenuExtractorFactory
from main_spell_check import MenuExtractorFactory as MenuExtractorFactorySpellCheck
from time import time


def timer(func):
    # This function shows the execution time of
    # the function object passed
    def wrap_func(*args, **kwargs):
        t1 = time()
        result = func(*args, **kwargs)
        t2 = time()
        print(f'Function {func.__name__!r} executed in {(t2-t1):.4f}s')
        return result
    return wrap_func


with open('data/test.txt', 'r') as f:
    available_menus = [word.strip() for word in f.read().splitlines()]

# เล็กแห้งต้มยำ: เล็ก, แห้ง, ต้มยำ
# บะหมี่แห้งไม่กระเทียมเพิ่มเกี้ยว: บะหมี่, แห้ง, ไม่, กระเทียม, เพิ่ม, เกี้ยว
# วุ้นเส้นน้ำตกไม่ผัก: วุ้น, เส้น, น้ำตก, ไม่, ผัก
# หมี่ขาวน้ำตกไม่ผักไม่ตับ: หมี่, ขาว, น้ำตก, ไม่, ผัก, ไม่, ตับ
# วุ้นเส้นน้ำตกต้มยำไม่ผัก: วุ้น, เส้น, น้ำตก, ต้มยำ, ไม่, ผัก


class TestMenuExtractor(unittest.TestCase):

    @timer
    def test_normal_menu_extractor(self):
        menu_extractor = MenuExtractorFactory(
            available_menus).create_menu_extractor()
        self.assertEqual(menu_extractor.extract('เล็กแห้งต้มยำ'), [
            'เล็ก', 'แห้ง', 'ต้มยำ'])
        self.assertEqual(menu_extractor.extract(
            'บะหมี่แห้งไม่กระเทียมเพิ่มเกี้ยว'), ['บะหมี่', 'แห้ง', 'ไม่', 'กระเทียม', 'เพิ่ม', 'เกี้ยว'])
        self.assertEqual(menu_extractor.extract(
            'วุ้นเส้นน้ำตกไม่ผัก'), ['วุ้น', 'เส้น', 'น้ำตก', 'ไม่', 'ผัก'])
        self.assertEqual(menu_extractor.extract(
            'หมี่ขาวน้ำตกไม่ผักไม่ตับ'), ['หมี่', 'ขาว', 'น้ำตก', 'ไม่', 'ผัก', 'ไม่', 'ตับ'])
        self.assertEqual(menu_extractor.extract(
            'วุ้นเส้นน้ำตกต้มยำไม่ผัก'), ['วุ้น', 'เส้น', 'น้ำตก', 'ต้มยำ', 'ไม่', 'ผัก'])

    @timer
    def test_menu_extractor_with_spell_check(self):
        menu_extractor = MenuExtractorFactorySpellCheck(
            available_menus).create_menu_extractor()
        self.assertEqual(menu_extractor.extract('เล็กแห้งต้มยำ'), [
            'เล็ก', 'แห้ง', 'ต้มยำ'])
        self.assertEqual(menu_extractor.extract(
            'บะหมี่แห้งไม่กระเทียมเพิ่มเกี้ยว'), ['บะหมี่', 'แห้ง', 'ไม่', 'กระเทียม', 'เพิ่ม', 'เกี้ยว'])
        self.assertEqual(menu_extractor.extract(
            'วุ้นเส้นน้ำตกไม่ผัก'), ['วุ้น', 'เส้น', 'น้ำตก', 'ไม่', 'ผัก'])
        self.assertEqual(menu_extractor.extract(
            'หมี่ขาวน้ำตกไม่ผักไม่ตับ'), ['หมี่', 'ขาว', 'น้ำตก', 'ไม่', 'ผัก', 'ไม่', 'ตับ'])
        self.assertEqual(menu_extractor.extract(
            'วุ้นเส้นน้ำตกต้มยำไม่ผัก'), ['วุ้น', 'เส้น', 'น้ำตก', 'ต้มยำ', 'ไม่', 'ผัก'])



if __name__ == '__main__':
    unittest.main()
