// Constants for tracking states
const TRACKING_STATES = {
  INITIAL: "initial",
  CONFIRMED: "Order Confirmed",
  PREPARING: "Preparing",
  DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
};

class OrderTracker {
  constructor() {
    this.steps = document.querySelectorAll(".tracking-step");
    this.currentState = TRACKING_STATES.INITIAL;
  }

  initializeTracking() {
    // Reset all steps to their initial state
    this.steps.forEach((step, index) => {
      step.classList.remove("active", "current", "completed");
      const statusTag = step.querySelector(".status-tag");
      const progressBar = step.querySelector(".progress-bar");

      if (statusTag) {
        statusTag.textContent = "Pending";
        statusTag.classList.add("pending");
      }
      if (progressBar) {
        progressBar.style.display = "none";
      }
    });
    this.steps[0].classList.add("active", "current");
    this.steps[0].querySelector(".status-tag").textContent = "Pending";
    this.steps[0].querySelector(".status-tag").style.background = "#f39c12";
    this.steps[0].querySelector(".progress-bar").style.display = "block";
    this.steps[0].querySelector(
      ".step-icon"
    ).innerHTML = `<i class="fas fa-sync-alt fa-spin"></i>`;
    // Don't show any active states initially
    // The first active state will be shown when the first status update is received
  }

  updateTracking(status, time) {
    console.log("Updating tracking status:", status);
    let stepIndex;
    switch (status) {
      case TRACKING_STATES.CONFIRMED:
        this._updateConfirmedState(time);
        stepIndex = 0;
        break;

      case TRACKING_STATES.PREPARING:
        this._updatePreparingState(time);
        stepIndex = 1;
        break;

      case TRACKING_STATES.DELIVERY:
        this._updateDeliveryState(time);
        stepIndex = 2;
        break;
      case TRACKING_STATES.DELIVERED:
        this._updateDeliveredState(time);
        stepIndex = 3;
        console.log("Clearing bag items...");
        localStorage.removeItem("bagItems");
        this.bagItems = [];

        console.log("Bag has been cleared.");
        break;
      default:
        console.log("Invalid status received:", status);
    }
  }

  _updateConfirmedState(time) {
    // Update first step
    this.steps[0].classList.add("completed");
    this.steps[0].classList.remove("current", "active");
    this.steps[0].querySelector(".status-tag").textContent = "Completed";
    this.steps[0].querySelector(".status-tag").style.background = "#2ecc71";

    this.steps[0].querySelector(
      ".time"
    ).innerHTML = `<i class="far fa-clock"></i> ${time}`;
    this.steps[0].querySelector(".progress-bar").style.display = "none";
    this.steps[0].querySelector(
      ".step-icon"
    ).innerHTML = `<i class="fas fa-check"></i>`;
  }

  _updatePreparingState(time) {
    // First step should be completed
    this.steps[0].classList.add("completed");
    this.steps[0].classList.remove("current", "active");

    // Update second step
    this.steps[1].classList.add("active", "current");
    this.steps[1].querySelector(".status-tag").textContent = "Pending";
    this.steps[1].querySelector(".status-tag").style.background = "#f39c12";
    this.steps[1].querySelector(
      ".time"
    ).innerHTML = `<i class="far fa-clock"></i> ${time}`;
    this.steps[1].querySelector(".progress-bar").style.display = "block";
  }

  _updateDeliveryState(time) {
    // First two steps should be completed
    this.steps[0].classList.add("completed");
    this.steps[0].classList.remove("current");
    this.steps[1].classList.add("completed");
    this.steps[1].classList.remove("current", "active");
    this.steps[1].querySelector(".status-tag").textContent = "Completed";
    this.steps[1].querySelector(".status-tag").style.background = "#2ecc71";
    this.steps[1].querySelector(
      ".status-title"
    ).innerHTML = `<h3>Order Prepared</h3>`;
    // Update final step
    this.steps[2].classList.add("active", "current");
    this.steps[2].querySelector(".status-tag").textContent = "In Progress";
    this.steps[2].querySelector(".status-tag").style.background = "#f39c12";
    this.steps[2].querySelector(
      ".time"
    ).innerHTML = `<i class="far fa-clock"></i> ${time}`;
    this.steps[1].querySelector(".progress-bar").style.display = "none";
    this.steps[2].querySelector(".progress-bar").style.display = "block";
  }
  _updateDeliveredState(time) {
    this.steps[2].classList.add("completed");
    this.steps[2].classList.remove("current", "active");
    this.steps[2].querySelector(".progress-bar").style.display = "none";
    this.steps[2].querySelector(".status-tag").textContent = "Completed";
    this.steps[2].querySelector(".status-tag").style.background = "#2ecc71";
    // Mark the "Delivered" step as completed
    this.steps[3].classList.add("completed");
    this.steps[3].classList.remove("current", "active");
    this.steps[3].querySelector(".status-tag").textContent = "Completed";
    this.steps[3].querySelector(".status-tag").style.background = "#2ecc71";
    this.steps[3].querySelector(
      ".time"
    ).innerHTML = `<i class="far fa-clock"></i> ${time}`;
    this.steps[3].querySelector(".progress-bar").style.display = "none";
    this.steps[3].querySelector(
      ".step-icon"
    ).innerHTML = `<i class="fas fa-check-circle"></i>`;
  }
}
