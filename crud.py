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

def create_coin(name):
    """Create and return a new coin."""

    coin = Coin(name=name)

    db.session.add(coin)
    db.session.commit()

    return coin
    
def get_coins():
    """Return all coins."""

    return Coin.query.all()


def get_coin_by_id(coin_id):
    """Return a coin by primary key."""

    return Coin.query.get(coin_id)



def create_favorite(user, coin, favorite):
    """Create and return a new favorite."""

    favorite = Favorite(user=user, coin=coin, favorite=favorite)

    db.session.add(favorite)
    db.session.commit()

    return favorite



if __name__ == "__main__":
    from server import app

    connect_to_db(app)