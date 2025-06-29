from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_socketio import SocketIO, emit
from datetime import datetime

# Initialize the Flask application
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
orders = {}

# Initialize SocketIO
socketio = SocketIO(app)

# Routes
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/menu')
def menu():
    return render_template('menu.html')
@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/bag', methods=['GET', 'POST'])
def bag():
    if request.method == 'POST':
        # Receive bag items and save as an order
        order_id = str(len(orders) + 1)
        orders[order_id] = {
            "items": request.json.get("items"),
            "status": "Order Received"
        }
        # Emit the new order to kitchen
        socketio.emit('new_order', {"order_id": order_id, "details": orders[order_id]})
        return jsonify({"message": "Order sent to kitchen", "order_id": order_id})
    return render_template('bag.html')

@app.route('/kitchen', methods=['GET', 'POST'])
def kitchen():
    if request.method == 'POST':
        # Update order status
        order_id = request.form.get('order_id')
        new_status = request.form.get('status')
        if order_id in orders:
            orders[order_id]["status"] = new_status
            # Emit the updated status to the tracking page
            socketio.emit('status_update', {"order_id": order_id, "status": new_status,"time": datetime.now().strftime("%I:%M %p")})
        return redirect(url_for('kitchen'))
    
    # Make sure to create a copy of the orders dictionary
    kitchen_orders = dict(orders)
    
    # Debug print to check the structure
    print("Orders being passed to template:", kitchen_orders)
    
    # Pass the dictionary to the template
    return render_template('kitchen.html', orders=kitchen_orders)

@app.route('/index', methods=['GET', 'POST'])
def index():

    return render_template('index.html')

# Socket.IO Events
@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

if __name__ == '__main__':
    socketio.run(app, debug=True)
