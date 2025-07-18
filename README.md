#  Online Coffee Ordering Platform

An interactive and real-time web-based café ordering system that allows customers to browse menus, place orders from their table, and track order statuses seamlessly. Designed to enhance the dine-in experience with a responsive user interface and real-time kitchen updates.

##  Project Link
[GitHub Repository](https://github.com/karranavya/online-coffee-ordering-platform)

---

##  Features

-  **Interactive Menu Interface** – Browse through categorized coffee and non-coffee items with images, descriptions, and prices.
-  **Add to Bag Functionality** – Users can select multiple items, adjust quantities, and manage their bag.
-  **Order Placement** – Customers can place orders directly from their table without needing a waiter.
-  **Real-Time Order Tracking** – Orders move through stages like *Order Confirmed*, *Preparing*, and *Out for Delivery*.
-  **Kitchen Dashboard** – Staff can view incoming orders and update order statuses dynamically.
-  **Responsive Design** – Works seamlessly on desktops, tablets, and smartphones.
-  **Socket.IO Integration** – Enables real-time updates between customer screens and the kitchen.

---

##  Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Python (Flask)
- **Real-Time Communication:** Socket.IO (Flask-SocketIO)
- **Data Handling:** LocalStorage (for items) and in-memory Python dictionaries (for orders)

---

##  Installation & Setup

1. **Clone the repository**
   ```bash
    git clone https://github.com/karranavya/online-coffee-ordering-      platform.git
    cd online-coffee-ordering-platform
2. **Create a virtual environment**
   ```bash
    python -m venv venv
    # On Linux/Mac
    source venv/bin/activate
    # On Windows
    venv\Scripts\activate
3. **Install dependencies**
   ```bash
   pip install -r requirements.txt

4. **Run the application**
   ```bash
   python app.py

5. **Open the app in browser**
   ```bash
   http://localhost:5000





