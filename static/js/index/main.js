document.addEventListener("DOMContentLoaded", () => {
  const socket = io();
  const currentOrderId = localStorage.getItem("currentOrderId");

  // Initialize order tracking and summary
  const orderTracker = new OrderTracker();
  const orderSummary = new OrderSummary();

  // Update order summary
  orderSummary.updateSummary();

  // Initialize tracking with no active states
  orderTracker.initializeTracking();

  if (currentOrderId) {
    // Update order ID in the header
    const orderIdElement = document.querySelector(".order-id");
    if (orderIdElement) {
      orderIdElement.textContent = `Order #${currentOrderId}`;
    }

    // Listen for status updates specific to this order
    socket.on("status_update", (data) => {
      console.log("Received status update:", data);

      if (data.order_id === currentOrderId) {
        orderTracker.updateTracking(data.status, data.time);
      }
    });
  }
});
