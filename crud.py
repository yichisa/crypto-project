"""CRUD operations."""

from model import db, User, Coin, Favorite, connect_to_db


def create_user(email, password):
    """Create and return a new user."""

    user = User(email=email, password=password)

    db.session.add(user)
    db.session.commit()

    return user


def get_users():
    """Return all users."""

    return User.query.all()


def get_user_by_id(user_id):
    """Return a user by primary key."""

    return User.query.get(user_id)


def get_user_by_email(email):
    """Return a user by email."""

    return User.query.filter(User.email == email).first()


def get_coins():
    """Return all coins."""

    return Coin.query.all()


def get_coin_id(coin_id):
    """Return a coin by primary key."""

    return Coin.query.get(coin_id)


# def create_favorite(user, coin, favorite):
#     """Create and return a new favorite."""

#     Wachlist = Favorite(user=user, coin=movie, favorite=favorite)

#     db.session.add()
#     db.session.commit()

#     return rating

# def create_rating(user, movie, score):
#     """Create and return a new rating."""

#     rating = Rating(user=user, movie=movie, score=score)

#     db.session.add(rating)
#     db.session.commit()

#     return rating


if __name__ == "__main__":
    from server import app

    connect_to_db(app)