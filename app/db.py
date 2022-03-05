import json
import mysql.connector

db_info = open("mysqldb_info.json")
data = json.load(db_info)

db = mysql.connector.connect(
    host=data["host"],
    user=data["user"],
    passwd=data["passwd"],
    db=data["db"],
    port=data["port"]
)
cursor = db.cursor(dictionary=True)
