"""Script to seed database."""

import os
import json
from random import choice, randint
from datetime import datetime

import crud
import model
import server
import requests

API_KEY = os.environ['Nomics_API_KEY']

os.system("dropdb favorites")
os.system("createdb favorites")

model.connect_to_db(server.app)
model.db.create_all()


# Create 10 users; 
for n in range(10):
    email = f"user{n}@test.com"  # Voila! A unique email!
    password = "test"

    user = crud.create_user(email, password)

# seed my coin table;
# coin_data = requests.get("http://localhost:5000/api").json()
url = f"https://api.nomics.com/v1/currencies/ticker?key={API_KEY}&interval=1d,30d&convert=EUR&per-page=100&page=1"
coin_data = requests.get(url).json()

coins_in_db = []

for coin in coin_data:
    name = coin["name"]
    # coin_id=coin["coin_id"]
    # price=["price"],
    # market_cap=["market_cap"],
    # volume=["volume"],
    # all_time_high=["all_time_high"],
    # circulating_supply=["circulating_supply"],
    # change=change

    db_coin = crud.create_coin(name)
    coins_in_db.append(db_coin)

print(coins_in_db)

  



    
