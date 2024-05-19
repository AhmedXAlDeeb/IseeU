from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2.extras

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Database connection
conn = psycopg2.connect(
    database="IseeUDB",
    user="IseeUDB_owner",
    password="o70CUtSaXsJK",
    host="ep-still-truth-a21z0m3n.eu-central-1.aws.neon.tech",
    port="5432"
)
cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    try:
        cursor.execute(
            "INSERT INTO employee (username, emailaddress, password, firstname, role, gender) "
            "VALUES (%s, %s, %s, %s, %s, %s)",
            (username, email, password, "John", "Doctor", "Male")
        )
        conn.commit()
        return jsonify({"message": "User registered successfully"}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
