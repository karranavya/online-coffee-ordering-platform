from flask_socketio import join_room, leave_room
from app import socketio  # Import socketio from the initialized app

# Event handler when user connects to WebSocket
@socketio.on('connect')
def handle_connect():
    print("User connected!")

# Event handler when user joins a specific order room
@socketio.on('join_order')
def handle_join_order(order_id):
    join_room(order_id)
    print(f"User joined room for order {order_id}")

# Event handler when user disconnects
@socketio.on('disconnect')
def handle_disconnect():
    print("User disconnected!")
