from flask import Flask, render_template, request, redirect, url_for, jsonify
import psycopg2.extras

database_session = psycopg2.connect(
    database="IseeUDB",
    port="5432",
    host="ep-still-truth-a21z0m3n.eu-central-1.aws.neon.tech",
    user="IseeUDB_owner",
    password="o70CUtSaXsJK"
)
cursor = database_session.cursor(cursor_factory=psycopg2.extras.DictCursor)
database_session.set_session(autocommit=True)

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'


@app.route('/patients')
def get_patients():
    cursor.execute("SELECT * FROM patients")
    patients_list = cursor.fetchall()
    return {'patients': patients_list}

@app.route('/add_patient', methods=['POST'])
def add_patient():
    data = request.get_json()
    # Your code to add patient to the database
    if request.method == 'POST':
        name = data['Name']
        nid = data['Bed_No']
        # user_id = user_id['uid']
        cursor.execute('INSERT INTO patients (fname, nid) VALUES (%s, %s)',
                       (name, nid))
        database_session.commit()
        print(data)
        return jsonify({"message": "Patient added successfully!"})

if __name__ == '__main__':
    app.run(debug=True)
