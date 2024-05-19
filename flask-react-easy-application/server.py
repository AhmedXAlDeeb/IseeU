from flask import Flask, render_template, request, redirect, url_for
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'

@app.route('/members')
def members():
    return {'members': ['member1', 'member2', 'member3']}

if __name__ == '__main__':
    app.run(debug=True)