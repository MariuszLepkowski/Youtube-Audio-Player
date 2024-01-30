from flask import Flask
from views.url import url_blueprint
from views.audio_player import audio_player_blueprint
from flask_bootstrap import Bootstrap5
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
bootstrap = Bootstrap5(app)

app.register_blueprint(url_blueprint)
app.register_blueprint(audio_player_blueprint)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
