# LIVE COIN TRACKER
Live Coin Tracker is a price tracking app for top 100 crypto coins. The app shows price, market cap, volume, all-time-high, circulating supply and 24H change for each coin.

<br /> 
Live Coin Tracker is built with Python Flask on the backend with a PostgreSQL database, and Javascript/React on the frontend along with HTML/CSS and Bootstrap.

## Features

1. A user can view basic stats of a coin 
2. A user can register an account and login
3. A user can search for a particular coin
4. A user can favorite a coin
5. A user can sort a coin based on Price, Market Cap, and All Time High
<div style="width:360px;max-width:100%;"><div style="height:0;padding-bottom:53.33%;position:relative;"><iframe width="360" height="192" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameBorder="0" src="https://imgflip.com/embed/5sq9xr"></iframe></div><p><a href="https://imgflip.com/gif/5sq9xr">via Imgflip</a></p></div>
6. A user can assess top 24 most trusted exchange platforms if they want to trade coins

7. There is a a Glossary page - a user can study basic terminology for blockchain technology.

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

