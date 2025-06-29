from flask import Blueprint, render_template, request, jsonify
from app.models import Order
from datetime import datetime
from app import socketio 

routes = Blueprint('routes', __name__)

# Route for home page
@routes.route('/')
def home():
    return render_template('home.html')

# Route for menu page
@routes.route('/menu')
def menu():
    return render_template('menu.html')

# Route for bag page
@routes.route('/bag')
def bag():
    return render_template('bag.html')

# Route for placing an order
@routes.route('/place_order', methods=['POST'])
def place_order():
    order_data = request.json
    order_id = str(datetime.now().timestamp())
    order_data['order_id'] = order_id
    order_data['status'] = "Order Received"
    order_data['created_at'] = datetime.now()
    order_data['updated_at'] = datetime.now()

    # Save order to database
    Order.place_order(order_data)

    return jsonify({"order_id": order_id, "status": "Order Received"})

# Route for updating the order status (Kitchen side)
@routes.route('/update_order_status', methods=['POST'])
def update_order_status():
    order_id = request.json.get('order_id')
    new_status = request.json.get('status')
    
    if Order.update_status(order_id, new_status):
        # Emit status update event to the client
        socketio.emit('status_update', {'order_id': order_id, 'status': new_status}, room=order_id)
        return jsonify({"status": "Order status updated"})
    return jsonify({"error": "Order not found"}), 404
