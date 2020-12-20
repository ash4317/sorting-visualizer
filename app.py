import os
from flask import Flask, session, render_template, request
from flask_session import Session
from bubblesort import bubblesort
from selectionsort import selectionsort
from insertionsort import insertionsort
#from quicksort import main
import random

app = Flask(__name__)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.route("/")
def index():
    return render_template("index.htm")

@app.route("/api")
def api():
    arr = random.sample(range(1, 31), 30)
    data = selectionsort(arr)
    print(data)
    return data

if __name__ == "__main__":
    app.run(debug=True)