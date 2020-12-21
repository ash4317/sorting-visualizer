import os
from flask import Flask, session, render_template, request
from flask_session import Session
from algos.bubblesort import bubblesort
from algos.selectionsort import selectionsort
from algos.insertionsort import insertionsort
#from quicksort import main
import random

app = Flask(__name__, template_folder="../client/templates")

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.route("/")
def index():
    return render_template("index.htm")

@app.route("/<algo>/<n>", methods=["POST"])
def api(algo, n):
    n = int(n)
    arr = random.sample(range(1, n + 1), n)
    if algo == "bubble":
        data = bubblesort(arr)
    elif algo == "insertion":
        data = insertionsort(arr)
    elif algo == "selection":
        data = selectionsort(arr)
    print(data)
    return data

if __name__ == "__main__":
    app.run(debug=True)