import os

from flask import flash, redirect, request, session, url_for, render_template
from werkzeug.utils import secure_filename

from flaskblog import cursor, UPLOAD_FOLDER, app, database_session

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def validate_username_register(username):
    cursor.execute('SELECT username FROM employee WHERE username = %s', (username,))
    user = cursor.fetchone()
    if user:
        # raise ValidationError('That username is taken. Please choose a different one.')
        return False
    return True


def validate_email_register(email):
    cursor.execute('SELECT email FROM users_table WHERE email = %s', (email,))
    user = cursor.fetchone()
    if user:
        # raise ValidationError('That email is taken. Please choose a different one.')
        return False
    return True


def upload_image():
    #i got request but no attribute of files
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)

    file = request.files['file']  #store the file (image)

    if file.filename == '':
        flash('No image selected for uploading')
        return redirect(request.url)

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))  #add the file to the upload folder
        #get the user id to store the image name in it
        userr_id = session.get('data')['uid']
        cursor.execute("UPDATE users_table SET profile_pic = %s WHERE uid = %s ", (filename, userr_id))

        database_session.commit()
        #get the data for this id
        cursor.execute('SELECT * FROM users_table WHERE uid = %s', (userr_id,))
        user_data = cursor.fetchone()

        # Update the session data with the new user data
        session['data'] = dict(user_data)
        return redirect(url_for('PProfile'))
    else:
        flash('Allowed image types are - png, jpg, jpeg, gif')
        return redirect(request.url)


def registerr():
    if request.method == 'POST':
        #get the data if this is editing so there is a session
        data = session.get('data')
        #get the variables
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')
        facebook = request.form.get('facebook')
        instagram = request.form.get('instagram')
        gender = request.form.get('gender')
        age = request.form.get('age')

        profile_pic = request.files['profile_pic']
        if profile_pic and allowed_file(profile_pic.filename):
            filename = secure_filename(profile_pic.filename)
            profile_pic.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        else:  #if the user didn't edit the image so use the previous image (if no user then it's none)
            filename = data.get('profile_pic')

        if gender == 'M':
            gender = 'Male'
        else:
            gender = 'Female'

        if data:  #the user is editing its data
            user_id = data['uid']
            cursor.execute(
                """UPDATE users_table
                SET name = %s, email= %s, password = %s, facebook = %s, instagram = %s, gender = %s, age = %s, profile_pic = %s
                WHERE uid = %s""",
                (name, email, password, facebook, instagram, gender, age, filename, user_id))
            database_session.commit()
            flash('Your account has been modified! You are now able to log in', 'success')
            return redirect(url_for('login'))
        elif validate_email_register(email) and validate_username_register(name):
            cursor.execute(
                "INSERT INTO users_table (name, email, password, facebook, instagram, gender, age, profile_pic) "
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
                (name, email, password, facebook, instagram, gender, age, filename))
            database_session.commit()
            flash('Your account has been created! You are now able to log in', 'success')
            return redirect(url_for('login'))
        else:
            flash('this account is already registered', 'danger')
            return render_template('register.html')
    return render_template('register.html')


def loginn():
    email = request.form.get('email')
    password = request.form.get('password')
    # print(email, password)
    cursor.execute('SELECT email, password FROM users_table WHERE email = %s', (email,))
    user = cursor.fetchone()
    if user and user['password'] == password:
        cursor.execute('SELECT * FROM users_table WHERE email = %s', (email,))
        user = cursor.fetchone()
        session['data'] = dict(user)
        return True
    # else:
    #     flash('Login Unsuccessful. Please check email and password', 'danger')
    #     return render_template('login.html')


def create_post():
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        user_id = session.get('data')
        user_id = user_id['uid']
        cursor.execute('INSERT INTO posts_table (title, content, user_id) VALUES (%s, %s, %s)',
                       (title, content, int(user_id)))
        return redirect(url_for('PProfile'))


def Profile():
    data = session.get('data')
    if data is None:
        return False
    user_id = data['uid']

    cursor.execute('SELECT * FROM posts_table WHERE user_id = %s', (user_id,))
    posts = cursor.fetchall()
    return render_template('PProfile.html', data=data, posts=posts)
