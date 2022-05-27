import os
from flask import Flask, render_template
from flask_session import Session
from algos.BubbleSort import bubble_sort
from algos.SelectionSort import selection_sort
from algos.InsertionSort import insertion_sort
import algos.QuickSort as quick_sort
import algos.MergeSort as merge_sort
import algos.HeapSort as heap_sort
import random

app = Flask(__name__, template_folder="../client/templates", static_folder="../client/static")

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

sorting_functions = {
    "bubble": bubble_sort,
    "insertion": insertion_sort,
    "selection": selection_sort,
    "quick": quick_sort.main,
    "merge": merge_sort.main,
    "heap": heap_sort.main
}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/<algo>/<n>", methods=["POST"])
def api(algo, n):
    n = int(n)
    arr = random.sample(range(1, n + 1), n)
    return sorting_functions[algo](arr)

if __name__ == "__main__":
    app.run(debug=True)