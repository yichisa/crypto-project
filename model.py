"""Models for coin watch app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    """A user."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    username = db.Column(db.String, unique=True)
    password = db.Column(db.String, nullable = False)
    fname = db.Column(db.String)
    lname = db.Column(db.String)
    email = db.Column(db.String, unique=True)

    def __repr__(self):
        return f"<User user_id={self.user_id} email={self.email}>"


class Coin(db.Model):
    """A coin."""

    __tablename__ = "coins"

    coin_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String, nullable = False)
    # price = db.Column(db.String)
    # market_cap = db.Column(db.String)
    # volume = db.Column(db.String)
    # all_time_high = db.Column(db.String)
    # circulating_supply = db.Column(db.String)
    # change = db.Column(db.String)


    def __repr__(self):
        return f"<Coin coin_id={self.coin_id} coin_name={self.name}>"


class Favorite(db.Model):
    """A favorite."""

    __tablename__ = "favorites"

    favorite_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    coin_id = db.Column(db.Integer, db.ForeignKey("coins.coin_id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))

    coin = db.relationship("Coin", backref="favorites")
    user = db.relationship("User", backref="favorites")

    def __repr__(self):
        return f"<Favorite favorite_id={self.rating_id} coin_id={self.coin_id} user_id={self.user_id}>"


def connect_to_db(flask_app, db_uri="postgresql:///favorites", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")


if __name__ == "__main__":
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    connect_to_db(app)
