# LIVE COIN TRACKER
Live Coin Tracker is a price tracking app for top 100 crypto coins. The app shows price, market cap, volume, all-time-high, circulating supply and 24H change for each coin. Live Coin Tracker is built with Python Flask on the backend with a PostgreSQL database, and Javascript/React on the frontend along with HTML/CSS and Bootstrap.

## Features

1. A user can view basic stats of a coin 
2. A user can register an account and login
3. A user can search for a particular coin
![search](https://user-images.githubusercontent.com/88920819/139940772-aa7b219f-e2c4-411f-a44d-0f0896740979.gif)
5. A user can favorite a coin
![like feature](https://user-images.githubusercontent.com/88920819/139940992-78ef8e76-60eb-44b8-a8db-d20017e39c16.gif)
7. A user can sort a coin based on Price, Market Cap, and All Time High
![sort](https://user-images.githubusercontent.com/88920819/139940902-aa4919ce-7eba-475d-b1f9-be03508885a4.gif)
8. A user can assess top 24 most trusted exchange platforms if they want to trade coins
10. There is a a Glossary page - a user can study basic terminology for blockchain technology.


## Tech Stack
Languages:
* Python 3 
* Javascript (AJAX, JSON)
* React
* HTML
* CSS

Frameworks & Libraries:
* Flask
* Jinja
* Bootstrap

Database:
* PostgreSQL/ SQLAlchemy

APIs:
* Nomics API

## Setup
1. `git clone` this repository in your terminal
2. `cd crypto-project`
3. Create virtual environment with `virtualenv env`
4. Activate the virtual environment with `source env/bin/activate`
5. `pip3 install -r requirements.txt`
6. obtain an API key from [Nomics](https://nomics.com/docs/)
7. Create a new file in the crypto-project directory called secrets.sh and paste your Nomics key. It should read `export Nomics_API_KEY="yoursecretkeygoeshere"`
8. Back in your terminal, run `source secrets.sh`
9. Runun `python3 seed_database.py`
10. Launch the server with `python3 server.py`
11. You will then be able to access it at localhost:8000.

