from flask import Flask, render_template, redirect, url_for, request

app = Flask(__name__,static_url_path='/static')

@app.route("/",methods=['GET', 'POST'])
def index():
    return render_template("index.html")

@app.route("/login", methods=['GET', 'POST'])
def login():
    return render_template("login.html")
@app.route("/home", methods=['GET', 'POST'])
def home():
    return render_template("home.html")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)