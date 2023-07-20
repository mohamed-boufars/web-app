from flask import Flask, request, jsonify,json
from flask_cors import CORS
import mysql.connector
import joblib

c=joblib.load("model.pkl")
v=joblib.load("Vecto.pkl")

app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="pfe"
)

@app.route('/insert', methods=['POST'])
def insert_data():
    cursor = db.cursor()
    data = request.json  # Assuming you are sending JSON data from React

    # Extract the form data from the JSON object
    name = data['name']
    avis = data['avis']
    produit = data['produit']
    p=c.predict(v.transform([str(avis)]))
    if(p[0]==2):
        sentiment='posetive'
    elif(p[0]==1):
        sentiment='neutre'
    else:
        sentiment='negative'
    # ... extract other form fields

    # Insert the data into the MySQL table
    sql = "INSERT INTO pfe (name, avis,sentiment,produit) VALUES (%s,%s, %s,%s)"
    val = (name, avis,sentiment,produit)
    cursor.execute(sql, val)
    db.commit()
    return jsonify(message="Data inserted successfully")

@app.route('/pfe', methods=['GET'])
def get_data():
    cursor = db.cursor()
    # Execute a SELECT query to retrieve the data from the 'noha' table
    cursor.execute("SELECT * FROM pfe")

    # Fetch all the rows from the query result
    rows = cursor.fetchall()

    # Convert the rows to a list of dictionaries
    results = []
    for row in rows:
        result = {'id': row[0], 'name': row[1], 'avis': row[2], 'sentiment': row[3], 'produit': row[4]}
        results.append(result)
    # Convert the results to JSON format
    json_results = json.dumps(results)

    # Return the JSON response
    return json_results
@app.route('/pfe/<product_name>', methods=['GET'])
def get_data_by_product(product_name):
    cursor = db.cursor()
    # Execute a SELECT query to retrieve the data for the specified product name
    query = "SELECT * FROM pfe WHERE produit = %s"
    val = (product_name,)
    cursor.execute(query, val)

    # Fetch all the rows from the query result
    rows = cursor.fetchall()

    # Convert the rows to a list of dictionaries
    results = []
    for row in rows:
        result = {'id': row[0], 'name': row[1], 'avis': row[2], 'sentiment': row[3], 'produit': row[4]}
        results.append(result)
    # Convert the results to JSON format
    json_results = json.dumps(results)
    # Return the JSON response
    return json_results


if __name__ == '__main__':
    app.run()
