"""Server for coin watch app."""

from flask import Flask, render_template, request, flash, session, redirect, jsonify
from model import connect_to_db
import requests
import crud
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
    

@app.route("/coin/<coin_id>")
def show_coin(coin_id):
    """Show details on a particular coin."""

    coin = crud.get_coin_id(coin_id)

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
    # resp = requests.get(url=url)
    # data = resp.json()
    # return data 



@app.route("/users")
def all_users():
    """View all users."""

    users = crud.get_users()

    return render_template("all_users.html", users=users)


@app.route("/users", methods=["POST"])
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


@app.route("/users/<user_id>")
def show_user(user_id):
    """Show details on a particular user."""

    user = crud.get_user_by_id(user_id)

    return render_template("user_details.html", user=user)


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


# @app.route("/movies/<movie_id>/ratings", methods=["POST"])
# def create_rating(movie_id):
#     """Create a new rating for the movie."""

#     logged_in_email = session.get("user_email")
#     rating_score = request.form.get("rating")

#     if logged_in_email is None:
#         flash("You must log in to like a coin.")
#     elif not rating_score:
#         flash("Error: you didn't select a score for your rating.")
#     else:
#         user = crud.get_user_by_email(logged_in_email)
#         coin = crud.get_coin_by_id(coin_id)

#         crud.create_rating(user, movie, int(rating_score))

#         flash(f"You added this coin {} to your Watchlist.")

#     return redirect(f"/movies/{movie_id}")


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)