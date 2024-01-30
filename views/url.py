from flask import Blueprint, render_template
from forms import UrlForm

url_blueprint = Blueprint('url', __name__)


@url_blueprint.route('/')
def enter_url():
    form=UrlForm()
    return render_template('url.html', form=form)