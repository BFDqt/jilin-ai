from os import path
from pathlib import Path

from flask import Flask, render_template
from flask_frozen import Freezer


template_folder = path.abspath('./wiki')
static_folder = path.abspath('./static')

app = Flask(__name__, template_folder=template_folder, static_folder=static_folder)
#app.config['FREEZER_BASE_URL'] = environ.get('CI_PAGES_URL')
app.config['FREEZER_DESTINATION'] = 'public'
app.config['FREEZER_RELATIVE_URLS'] = True
app.config['FREEZER_IGNORE_MIMETYPE_WARNINGS'] = True
freezer = Freezer(app)

@app.cli.command()
def freeze():
    freezer.freeze()

@app.cli.command()
def serve():
    freezer.run()

@app.route('/')
def home():
    return render_template('pages/home.html')

@app.route('/<page>')
def pages(page):
    return render_template(str(Path('pages')) + '/' + page.lower() + '.html')

# This is the main entry point. When you run this script, it starts the web server on port 8080.
if __name__ == "__main__":
    app.run(port=8080)
