from flask import Flask
from flask_socketio import SocketIO
from flask_pymongo import PyMongo
import config

# Initialize the Flask app
app = Flask(__name__)

# Set app configurations
app.config.from_object(config.Config)

# Initialize SocketIO for real-time communication
socketio = SocketIO(app)

# Initialize MongoDB client
mongo = PyMongo(app)

# Import the routes blueprint after app is initialized to avoid circular imports
from app.routes import routes
app.register_blueprint(routes)

# Import socketio events after app and socketio are initialized
from app.socketio_events import *  # Import socketio events

# This is the entry point for the app (can be run from app.py)
def create_app():
    return app
