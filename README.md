# LIVE COIN TRACKER
Live Coin Tracker is a price tracking app for top 100 crypto coins. The app shows price, market cap, volume, all-time-high, circulating supply and 24H change for each coin. Live Coin Tracker is built with Python Flask on the backend with a PostgreSQL database, and Javascript/React on the frontend along with HTML/CSS and Bootstrap.

## Features

1. A user can view basic stats of a coin 
2. A user can register an account and login

![5sql85](https://user-images.githubusercontent.com/88920819/139948854-8edd3de2-dd2a-4188-ad5b-12423e6980db.gif)

4. A user can search for a particular coin

![5sqlqe](https://user-images.githubusercontent.com/88920819/139948750-fda57606-0ac1-4641-b708-3baa2dbb3a88.gif)

5. A user can favorite a coin

![5sqle6](https://user-images.githubusercontent.com/88920819/139948810-870b5805-d016-4323-a739-e7d2f9a734f3.gif)

7. A user can sort a coin based on Price, Market Cap, and All Time High

![5sqlt8](https://user-images.githubusercontent.com/88920819/139948675-eb8e80e0-238c-42c3-a760-d69fbfd8ac20.gif)

8. A user can assess top 24 most trusted exchange platforms if they want to trade coins

![5sqn8l](https://user-images.githubusercontent.com/88920819/139949372-ac18642f-d65f-4856-b6a0-ea6612dc443e.gif)

10. There is a a Glossary page - a user can study basic terminology for blockchain technology.

![5sqm84](https://user-images.githubusercontent.com/88920819/139948613-59f3e71b-9f63-4b0d-b303-e7cfdfe4d5df.gif)


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

