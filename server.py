"""Server for coin watch app."""

from flask import Flask, render_template, request, flash, session, redirect, jsonify
from model import connect_to_db
import requests
import crud
import json
import os
import urllib.request



from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined

# This configuration option makes the Flask interactive debugger
# more useful (you should remove this line in production though)
app.config['PRESERVE_CONTEXT_ON_EXCEPTION'] = True


API_KEY = os.environ['Nomics_API_KEY']


@app.route("/")
def homepage():
    """View homepage."""

    return render_template("homepage.html")

@app.route("/exchanges")
def exchange():
    """View exchanges."""

    return render_template("exchange.html")

@app.route("/glossary")
def glossary():
    """View glossary."""

    return render_template("glossary.html")

@app.route("/login")
def login():
    """View loginpage."""

    return render_template("login.html")

@app.route("/register")
def register():
    """Register an account."""

    return render_template("register.html")

@app.route("/watchlist")
def watchlist():
    """View watchlist."""

    return render_template("watchlist.html")
    

@app.route("/coin/<coin_id>")
def show_coin(coin_id):
    """Show details on a particular coin."""

    coin = crud.get_coin_by_id(coin_id)

    return render_template("coin_details.html", coin=coin)


@app.route("/api")
def make_api_call():

    url = f"https://api.nomics.com/v1/currencies/ticker?key={API_KEY}&interval=1d,30d&convert=EUR&per-page=100&page=1"
    # return urllib.request.urlopen(url).read()
    # return urllib.request.urlopen(url).read()
    response = {
        "data":requests.get(url).json()
    }
    return response

@app.route("/glossarydata")
def glossary_data():

    with open("static/glossary.json") as f:
        glossary_data = json.loads(f.read())
    return glossary_data


@app.route("/users")
def all_users():
    """View all users."""

    users = crud.get_users()

    return render_template("all_users.html", users=users)

@app.route("/users/<user_id>")
def show_user(user_id):
    """Show details on a particular user."""

    user = crud.get_user_by_id(user_id)

    return render_template("user_details.html", user=user)

@app.route("/favorite_coin", methods=["POST"])
def favorite_a_coin():
    """favorite a coin"""

    fav_coin = request.form.get("name")
    # favorite = crud.create_favorite(session['user_id'], coin_id=coin_id, name=name)

    return flash(f" You've added {fav_coin} to your favorite!")


@app.route("/register", methods=["POST"])
def register_user():
    """Create a new user."""

    email = request.form.get("email")
    password = request.form.get("password")

    user = crud.get_user_by_email(email)
    if user:
        flash("Cannot create an account with that email. Try again.")
    else:
        crud.create_user(email, password)
        flash("Account created! Please log in.")

    return redirect("/")


@app.route("/login", methods=["POST"])
def process_login():
    """Process user login."""

    email = request.form.get("email")
    password = request.form.get("password")

    user = crud.get_user_by_email(email)
    if not user or user.password != password:
        flash("The email or password you entered was incorrect.")
    else:
        # Log in user by storing the user's email in session
        session["user_email"] = user.email
        flash(f"Welcome back, {user.email}!")

    return redirect("/")




if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", port=8000, debug=True)