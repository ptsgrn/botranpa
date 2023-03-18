from flask import Flask, request, json
from extractor import *

app = Flask(__name__)
with open('data/test.txt', 'r') as f:
    word_list = f.read().splitlines()
menu_extractor = MenuExtractorFactory(word_list).create_menu_extractor()


@app.route('/extract')
def extract():
    args = request.args
    raw_menu = args.get('raw_menu')
    return app.response_class(
        response=json.dumps(menu_extractor.extract(raw_menu)),
        status=200,
        mimetype='application/json'
    )
