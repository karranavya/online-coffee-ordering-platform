from pymongo import MongoClient
from datetime import datetime

# MongoDB client and database
client = MongoClient("mongodb://localhost:27017/")
db = client['cafe_db']
orders_collection = db['orders']

class Order:
    @staticmethod
    def place_order(order_data):
        # Insert order data into MongoDB
        orders_collection.insert_one(order_data)

    @staticmethod
    def update_status(order_id, new_status):
        # Update order status in MongoDB
        order = orders_collection.find_one({"order_id": order_id})
        if order:
            orders_collection.update_one(
                {"order_id": order_id},
                {"$set": {"status": new_status, "updated_at": datetime.now()}}
            )
            return True
        return False
