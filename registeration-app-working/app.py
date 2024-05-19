# app.py
from flask import Flask, request, jsonify, flash
import psycopg2.extras
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
database_session = psycopg2.connect(
    database="IseeUDB",
    port="5432",
    host="ep-still-truth-a21z0m3n.eu-central-1.aws.neon.tech",
    user="IseeUDB_owner",
    password="o70CUtSaXsJK"
)
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
cursor = database_session.cursor(cursor_factory=psycopg2.extras.DictCursor)
database_session.set_session(autocommit=True)


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Here you would normally fetch or insert data into your database.
    # cursor.execute('SELECT username FROM employee WHERE username = %s', (username,))
    # user = cursor.fetchone()
    # if user:
    #     # raise ValidationError('That username is taken. Please choose a different one.')
    #     return False
    # For demonstration, we'll just return the received data.
    cursor.execute(
        "INSERT INTO employee (username, emailaddress, password, firstname, role, gender) "
        "VALUES (%s, %s, %s, %s, %s, %s)",
        (username, email, password, "John", "Doctor", "Male"))
    database_session.commit()
    flash('Your account has been created! You are now able to log in', 'success')

    response = {
        "message": "User registered successfully",
        "user": {
            "username": username,
            "email": email
        }
    }
    return jsonify({
        "message": "User registered successfully",
        "user": {
            "username": username,
            "email": email
        }
    })


if __name__ == '__main__':
    app.run(debug=True)
