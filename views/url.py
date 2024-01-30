from flask import Blueprint, render_template, redirect, url_for, request
from forms import UrlForm

url_blueprint = Blueprint('url', __name__)


@url_blueprint.route('/', methods=['GET', 'POST'])
def enter_url():
    form=UrlForm()
    if form.validate_on_submit():
        return 'success'

    return render_template('url.html', form=form)