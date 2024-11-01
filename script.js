document.addEventListener("DOMContentLoaded", () => {
  const systemStatus = document.getElementById("system-status");
  const activateBtn = document.getElementById("activate-btn");
  const advancedMonitorBtn = document.getElementById("advanced-monitor-btn");
  const alertsContainer = document.getElementById("alerts-container");
  const threatsContainer = document.getElementById("threats-container");
  const logsContainer = document.getElementById("logs-container");
  const usersContainer = document.getElementById("users-container");
  const timelineContainer = document.getElementById("timeline-container");
  const mapContainer = document.getElementById("map-container");
  const statusIndicator = document.getElementById("status-indicator");
  const addUserBtn = document.getElementById("add-user-btn");
  const simulateThreatBtn = document.getElementById("simulate-threat-btn");
  const analyticsContainer = document.getElementById("analytics-container");
  const themeSelect = document.getElementById("theme-select");
  const refreshRateInput = document.getElementById("refresh-rate");
  const analyticsChart = document.getElementById("analytics-chart");
  const exportDataBtn = document.getElementById("export-data-btn");
  const cpuUsage = document.getElementById("cpu-usage");
  const memoryUsage = document.getElementById("memory-usage");
  const networkTraffic = document.getElementById("network-traffic");
  const notificationsBtn = document.getElementById("notifications-btn");
  const modal = document.getElementById("modal");
  const closeModal = document.getElementsByClassName("close")[0];
  const modalNotificationsContainer = document.getElementById(
    "modal-notifications-container"
  );
  const runAiAnalysisBtn = document.getElementById("run-ai-analysis-btn");
  const aiAnalysisContainer = document.getElementById("ai-analysis-container");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mainNav = document.getElementById("main-nav");
  const fontSizeSelect = document.getElementById("font-size");
  const quickScanBtn = document.getElementById("quick-scan-btn");
  const systemUpdateBtn = document.getElementById("system-update-btn");
  const emergencyShutdownBtn = document.getElementById(
    "emergency-shutdown-btn"
  );
  const increaseContrastBtn = document.getElementById("increase-contrast-btn");
  const toggleAnimationsBtn = document.getElementById("toggle-animations-btn");
  const tooltip = document.getElementById("tooltip");
  const helpBtn = document.getElementById("help-btn");
  const helpModal = document.getElementById("help-modal");
  const helpContent = document.getElementById("help-content");
  const dataVisualizationContainer = document.getElementById(
    "data-visualization-container"
  );
  const newsContainer = document.getElementById("news-container");
  const newsChannels = ["Channel 12", "Channel 13", "Kan 11", "Channel 14"];
  const newsTitles = [
    "New cybersecurity threat discovered",
    "Major company suffers data breach",
    "Government increases cybersecurity budget",
    "AI-powered security systems on the rise",
    // ... (הוסף עוד כותרות חדשות)
  ];

  const clockElement = document.getElementById("real-time-clock");

  function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    clockElement.textContent = timeString;
  }

  setInterval(updateClock, 1000);
  updateClock();

  // עדכון ניהול המצב
  const appState = {
    isActivated: false,
    isAdvancedMonitoring: false,
    threatCount: 0,
    alertCount: 0,
    userCount: 0,
    analyticsData: {
      threats: [],
      alerts: [],
      users: [],
    },
    notifications: [],
    tasks: [],
  };

  function updateState(key, value) {
    appState[key] = value;
    // כאן ניתן להוסיף לוגיקה לעדכון ממשק המשתמש
    updateUI();
  }

  function updateUI() {
    // עדכון כל חלקי הממשק המשתמש בהתאם למצב הנוכחי
    systemStatus.textContent = appState.isActivated ? "Online" : "Offline";
    activateBtn.textContent = appState.isActivated
      ? "Deactivate Machine"
      : "Activate Machine";
    statusIndicator.classList.toggle("online", appState.isActivated);
    statusIndicator.classList.toggle("offline", !appState.isActivated);
    updateSystemToggle();
    // ... עדכונים נוספים לפי הצורך
  }

  let refreshInterval;

  const supportsCustomElements = "customElements" in window;

  const systemToggle = document.getElementById("system-toggle");

  // Update the activateBtn click event listener
  activateBtn.addEventListener("click", toggleSystem);

  // Add event listener for the switch
  systemToggle.addEventListener("change", toggleSystem);

  function toggleSystem() {
    updateState("isActivated", !appState.isActivated);
    if (appState.isActivated) {
      generateAlert("System activated. Monitoring started.", "success");
      logAction("System activated.");
      startThreatSimulation();
    } else {
      generateAlert("System deactivated.");
      logAction("System deactivated.");
      clearThreats();
    }
    updateSystemToggle();
  }

  function updateSystemToggle() {
    systemToggle.checked = appState.isActivated;
  }

  // Call updateUI initially to set the correct state
  updateUI();

  advancedMonitorBtn.addEventListener("click", () => {
    updateState("isAdvancedMonitoring", !appState.isAdvancedMonitoring);
    advancedMonitorBtn.textContent = appState.isAdvancedMonitoring
      ? "Stop Advanced Monitoring"
      : "Start Advanced Monitoring";

    if (appState.isAdvancedMonitoring) {
      generateAlert("Advanced monitoring activated.");
      logAction("Advanced monitoring activated.");
    } else {
      generateAlert("Advanced monitoring deactivated.");
      logAction("Advanced monitoring deactivated.");
    }
  });

  addUserBtn.addEventListener("click", () => {
    const userName = prompt("Enter new user name:");
    if (userName) {
      const userDiv = document.createElement("div");
      userDiv.classList.add("user");
      userDiv.textContent = `User: ${userName} added.`;
      usersContainer.prepend(userDiv);
      logAction(`User ${userName} added to the system.`);
    }
  });

  simulateThreatBtn.addEventListener("click", () => {
    if (appState.isActivated) {
      const simulatedThreat = `Simulated threat: Unauthorized access attempt in Zone ${Math.floor(
        Math.random() * 100
      )}`;
      generateThreat(simulatedThreat);
      updateMap(simulatedThreat);
    } else {
      generateAlert("Cannot simulate threat. System is offline.");
    }
  });

  themeSelect.addEventListener("change", (e) => {
    document.body.classList.remove(
      "light-theme",
      "dark-theme",
      "high-contrast-theme"
    );
    document.body.classList.add(`${e.target.value}-theme`);
  });

  refreshRateInput.addEventListener("change", (e) => {
    const rate = parseInt(e.target.value);
    clearInterval(refreshInterval);
    refreshInterval = setInterval(updateDashboard, rate * 1000);
  });

  exportDataBtn.addEventListener("click", exportData);

  function exportData() {
    try {
      const data = {
        alerts: Array.from(alertsContainer.children).map(
          (alert) => alert.textContent
        ),
        threats: Array.from(threatsContainer.children).map(
          (threat) => threat.textContent
        ),
        logs: Array.from(logsContainer.children).map((log) => log.textContent),
        analytics: appState.analyticsData,
      };

      const dataStr = JSON.stringify(data, null, 2);
      const dataUri =
        "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
      const exportFileDefaultName = "machine_monitoring_data.json";

      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();
    } catch (error) {
      console.error("Error exporting data:", error);
      generateAlert("Failed to export data. Please try again.", "error");
    }
  }

  function updatePerformanceMetrics() {
    const updateMetric = (element, value) => {
      element.style.setProperty("--value", `${value}%`);
      element.style.width = `${value}%`;
    };

    updateMetric(cpuUsage, Math.random() * 100);
    updateMetric(memoryUsage, Math.random() * 100);
    updateMetric(networkTraffic, Math.random() * 100);
  }

  function generateAlert(message, severity = "info") {
    const alertDiv = document.createElement("div");
    alertDiv.classList.add("alert", `alert-${severity}`);
    alertDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    addItemToContainer(alertsContainer, alertDiv);
    animateElement(alertDiv);
    updateState("alertCount", appState.alertCount + 1);
    updateAnalytics();
    addNotification(`Alert (${severity}): ${message}`);
  }

  function generateThreat(threat) {
    const threatDiv = document.createElement("div");
    threatDiv.classList.add("threat");
    threatDiv.innerHTML = `<i class="fas fa-radiation"></i> Threat Detected: ${threat}`;
    addItemToContainer(threatsContainer, threatDiv);
    logAction(`Threat logged: ${threat}`);
    animateElement(threatDiv);
    updateState("threatCount", appState.threatCount + 1);
    updateAnalytics();
    addNotification(`Threat: ${threat}`);
  }

  function logAction(action) {
    const logDiv = document.createElement("div");
    logDiv.classList.add("log");
    logDiv.innerHTML = `<i class="fas fa-info-circle"></i> LOG: ${action}`;
    addItemToContainer(logsContainer, logDiv);
    addTimelineEvent(action);
    animateElement(logDiv);
  }

  function addTimelineEvent(event) {
    const timelineDiv = document.createElement("div");
    timelineDiv.classList.add("timeline-event");
    timelineDiv.innerHTML = `<i class="fas fa-clock"></i> Timeline Event: ${event}`;
    addItemToContainer(timelineContainer, timelineDiv);
    animateElement(timelineDiv);
  }

  function updateMap(location) {
    const locationInfo = document.createElement("p");
    locationInfo.innerHTML = `<i class="fas fa-map-pin"></i> Current Activity: ${location}`;
    addItemToContainer(mapContainer, locationInfo);
    animateElement(locationInfo);
  }

  function animateElement(element) {
    element.style.opacity = "0";
    element.style.transform = "translateY(10px)";
    setTimeout(() => {
      element.style.transition = "opacity 0.5s, transform 0.5s";
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, 10);
  }

  function clearThreats() {
    threatsContainer.innerHTML = "";
  }

  function startThreatSimulation() {
    setInterval(() => {
      if (appState.isActivated) {
        const randomThreat = `Location: Zone ${Math.floor(
          Math.random() * 100
        )}, Suspicious activity.`;
        generateThreat(randomThreat);
        updateMap(randomThreat);
      }
    }, 15000);
  }

  // Simulated alerts
  setInterval(() => {
    if (appState.isActivated) {
      generateAlert("Suspicious activity detected at [Location].", "warning");
    }
  }, 10000);

  function updateDashboard() {
    if (appState.isActivated) {
      generateAlert(`Routine check at ${new Date().toLocaleTimeString()}`);
      if (Math.random() > 0.7) {
        generateThreat(
          `Potential intrusion detected in Zone ${Math.floor(
            Math.random() * 100
          )}`
        );
      }
      updatePerformanceMetrics();
      createDataVisualization();
    }
    updateAccessibilityInfo();
    updateNewsBars();
  }

  function updateAnalytics() {
    appState.analyticsData.threats.push(appState.threatCount);
    appState.analyticsData.alerts.push(appState.alertCount);
    appState.analyticsData.users.push(appState.userCount);

    if (appState.analyticsData.threats.length > 10) {
      appState.analyticsData.threats.shift();
      appState.analyticsData.alerts.shift();
      appState.analyticsData.users.shift();
    }

    updateAnalyticsChart();
  }

  function updateAnalyticsChart() {
    if (window.myChart) {
      window.myChart.destroy();
    }
    const ctx = analyticsChart.getContext("2d");
    window.myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: Array.from(
          { length: appState.analyticsData.threats.length },
          (_, i) => i + 1
        ),
        datasets: [
          {
            label: "Threats",
            data: appState.analyticsData.threats,
            borderColor: "rgb(255, 99, 132)",
            tension: 0.1,
            fill: false,
          },
          {
            label: "Alerts",
            data: appState.analyticsData.alerts,
            borderColor: "rgb(54, 162, 235)",
            tension: 0.1,
            fill: false,
          },
          {
            label: "Users",
            data: appState.analyticsData.users,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        animation: {
          duration: 1000,
          easing: "easeInOutQuart",
        },
      },
    });
  }

  // Initialize
  updateAnalytics();
  updatePerformanceMetrics();
  refreshInterval = setInterval(updateDashboard, 10000);

  // Add smooth scrolling to sections
  document.querySelectorAll("nav button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const targetId = e.target.id.replace("-btn", "-section");
      const targetSection = document.querySelector(`.${targetId}`);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Add hover effect to sections
  document.querySelectorAll(".dashboard-grid > section").forEach((section) => {
    section.addEventListener("mouseenter", () => {
      section.style.transform = "scale(1.02)";
    });
    section.addEventListener("mouseleave", () => {
      section.style.transform = "scale(1)";
    });
  });

  notificationsBtn.addEventListener("click", openNotificationsModal);
  closeModal.addEventListener("click", closeNotificationsModal);
  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      closeNotificationsModal();
    }
  });

  runAiAnalysisBtn.addEventListener("click", runAiAnalysis);

  function openNotificationsModal() {
    modal.style.display = "block";
    updateModalNotifications();
  }

  function closeNotificationsModal() {
    modal.style.display = "none";
  }

  function updateModalNotifications() {
    modalNotificationsContainer.innerHTML = "";
    appState.notifications.forEach((notification) => {
      const notificationElement = document.createElement("div");
      notificationElement.classList.add("notification");
      notificationElement.textContent = notification;
      modalNotificationsContainer.appendChild(notificationElement);
    });
  }

  function addNotification(message) {
    appState.notifications.push(message);
    if (appState.notifications.length > 10) {
      appState.notifications.shift();
    }
    updateModalNotifications();
  }

  function runAiAnalysis() {
    aiAnalysisContainer.innerHTML = "<p>Running AI analysis...</p>";
    setTimeout(() => {
      const analysis = generateAiAnalysis();
      aiAnalysisContainer.innerHTML = analysis;
    }, 2000);
  }

  function generateAiAnalysis() {
    const threats =
      appState.analyticsData.threats[appState.analyticsData.threats.length - 1];
    const alerts =
      appState.analyticsData.alerts[appState.analyticsData.alerts.length - 1];
    const users =
      appState.analyticsData.users[appState.analyticsData.users.length - 1];

    let analysis = "<h3>AI Analysis Report</h3>";
    analysis += `<p>Current Threat Level: ${calculateThreatLevel(
      threats,
      alerts
    )}</p>`;
    analysis += `<p>System Health: ${calculateSystemHealth(
      threats,
      alerts,
      users
    )}</p>`;
    analysis += "<h4>Recommendations:</h4><ul>";
    analysis += generateRecommendations(threats, alerts, users);
    analysis += "</ul>";

    return analysis;
  }

  function calculateThreatLevel(threats, alerts) {
    const level = (threats * 2 + alerts) / 3;
    if (level < 3) return "Low";
    if (level < 7) return "Medium";
    return "High";
  }

  function calculateSystemHealth(threats, alerts, users) {
    const health = 100 - (threats + alerts) + users / 2;
    if (health > 80) return "Excellent";
    if (health > 60) return "Good";
    if (health > 40) return "Fair";
    return "Poor";
  }

  function generateRecommendations(threats, alerts, users) {
    let recommendations = "";
    if (threats > 5) {
      recommendations +=
        "<li>Increase security measures and conduct a thorough system scan.</li>";
    }
    if (alerts > 10) {
      recommendations +=
        "<li>Review and update alert thresholds to reduce false positives.</li>";
    }
    if (users < 5) {
      recommendations +=
        "<li>Consider expanding user base to improve system utilization.</li>";
    }
    return (
      recommendations ||
      "<li>No specific recommendations at this time. Continue monitoring.</li>"
    );
  }

  mobileMenuBtn.addEventListener("click", () => {
    mainNav.classList.toggle("show");
  });

  fontSizeSelect.addEventListener("change", (e) => {
    document.body.classList.remove("font-small", "font-medium", "font-large");
    document.body.classList.add(`font-${e.target.value}`);
  });

  // הוספת טיפים קוגניים
  const addTooltip = (element, text) => {
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    tooltip.textContent = text;

    element.addEventListener("mouseenter", () => {
      document.body.appendChild(tooltip);
      const rect = element.getBoundingClientRect();
      tooltip.style.left = `${rect.left}px`;
      tooltip.style.top = `${rect.bottom + 5}px`;
      tooltip.style.opacity = "1";
    });

    element.addEventListener("mouseleave", () => {
      tooltip.style.opacity = "0";
      setTimeout(() => tooltip.remove(), 300);
    });
  };

  // הוסף טיפים לאלמנטים שונים
  addTooltip(document.getElementById("activate-btn"), "הפעל או כבה את המערכת");
  addTooltip(
    document.getElementById("advanced-monitor-btn"),
    "הפעל ניטור מתקדם לניתוח מעמיק"
  );
  // ... הוסף עוד טיפים לפי הצורך

  // שיפור נגישות
  document.querySelectorAll("button, select, input").forEach((element) => {
    if (!element.getAttribute("aria-label")) {
      element.setAttribute("aria-label", element.textContent.trim());
    }
  });

  function updateAccessibilityInfo() {
    const threatLevel = calculateThreatLevel(
      appState.threatCount,
      appState.alertCount
    );
    const systemHealth = calculateSystemHealth(
      appState.threatCount,
      appState.alertCount,
      appState.userCount
    );

    document
      .querySelector("header")
      .setAttribute(
        "aria-label",
        `מצב מערכת: ${systemStatus.textContent}, רמת איום: ${threatLevel}, בריאות מערכת: ${systemHealth}`
      );

    // הוספת תיאורים לתרשימים
    document.querySelectorAll("canvas, svg").forEach((element) => {
      element.setAttribute(
        "aria-label",
        `Interactive chart showing system metrics: ${appState.threatCount} threats, ${appState.alertCount} alerts, and ${appState.userCount} active users`
      );
    });
  }

  quickScanBtn.addEventListener("click", performQuickScan);
  systemUpdateBtn.addEventListener("click", performSystemUpdate);
  emergencyShutdownBtn.addEventListener("click", performEmergencyShutdown);
  increaseContrastBtn.addEventListener("click", toggleHighContrast);
  toggleAnimationsBtn.addEventListener("click", toggleAnimations);

  function performQuickScan() {
    generateAlert("Performing quick scan...");
    setTimeout(() => {
      generateAlert("Quick scan completed. No threats detected.");
    }, 3000);
  }

  function performSystemUpdate() {
    generateAlert("Checking for system updates...");
    setTimeout(() => {
      generateAlert("System is up to date.");
    }, 3000);
  }

  function performEmergencyShutdown() {
    if (confirm("Are you sure you want to perform an emergency shutdown?")) {
      generateAlert("Initiating emergency shutdown...");
      setTimeout(() => {
        updateState("isActivated", false);
        systemStatus.textContent = "Offline";
        activateBtn.textContent = "Activate Machine";
        statusIndicator.classList.remove("online");
        statusIndicator.classList.add("offline");
        generateAlert("Emergency shutdown completed.");
      }, 3000);
    }
  }

  function toggleHighContrast() {
    document.body.classList.toggle("high-contrast");
  }

  function toggleAnimations() {
    document.body.classList.toggle("no-animations");
  }

  // שיפור הטיפים הקוגניים
  document.querySelectorAll("[data-tooltip]").forEach((element) => {
    element.addEventListener("mouseenter", (e) => {
      showTooltip(e.target, e.target.getAttribute("data-tooltip"));
    });
    element.addEventListener("mouseleave", hideTooltip);
  });

  function showTooltip(element, text) {
    tooltip.textContent = text;
    tooltip.style.opacity = "1";
    const rect = element.getBoundingClientRect();
    tooltip.style.left = `${
      rect.left + rect.width / 2 - tooltip.offsetWidth / 2
    }px`;
    tooltip.style.top = `${rect.bottom + 5}px`;
  }

  function hideTooltip() {
    tooltip.style.opacity = "0";
  }

  // ... (קוד קיים) ...

  function updateAccessibilityInfo() {
    // ... (קוד קיים) ...
    document.querySelectorAll("button, select, input").forEach((element) => {
      element.setAttribute("tabindex", "0");
    });
  }

  // ... (קוד קיים) ...

  helpBtn.addEventListener("click", openHelpModal);

  function openHelpModal() {
    helpModal.style.display = "block";
    loadHelpContent();
  }

  function loadHelpContent() {
    const tutorialSteps = [
      {
        title: "Activating the System",
        content: "Click the 'Activate Machine' button to start monitoring.",
      },
      {
        title: "Monitoring Threats",
        content:
          "Keep an eye on the 'Potential Threats' section for any security risks.",
      },
      {
        title: "Analyzing Data",
        content:
          "Use the 'Analytics' section to view trends and patterns in system activity.",
      },
      // ... הוסף עו צעדים לפי הצורך
    ];

    helpContent.innerHTML = tutorialSteps
      .map(
        (step, index) => `
      <div class="tutorial-step">
        <h3>${index + 1}. ${step.title}</h3>
        <p>${step.content}</p>
      </div>
    `
      )
      .join("");
  }

  function createDataVisualization() {
    const data = [
      { label: "Threats", value: appState.threatCount },
      { label: "Alerts", value: appState.alertCount },
      { label: "Users", value: appState.userCount },
    ];

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select("#data-visualization-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.label))
      .range(["#ff6b6b", "#4ecdc4", "#45b7d1"]);

    const pie = d3.pie().value((d) => d.value);

    const arc = d3
      .arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.8);

    const arcs = svg
      .selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.label));

    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text((d) => `${d.data.label}: ${d.data.value}`);
  }

  // הוספת טיפים לעזרה בכל המערכת
  const addHelpTooltip = (element, text) => {
    const tooltip = document.createElement("span");
    tooltip.classList.add("help-tooltip");
    tooltip.innerHTML = '<i class="fas fa-question-circle"></i>';
    tooltip.setAttribute("title", text);
    element.appendChild(tooltip);
  };

  addHelpTooltip(
    document.querySelector(".alert-section h2"),
    "This section shows current system alerts."
  );
  addHelpTooltip(
    document.querySelector(".threat-section h2"),
    "This section displays potential security threats."
  );
  // ... הוסף עוד טיפים לפי הצורך

  // שיפור אינטראקטיות
  document.querySelectorAll(".dashboard-grid > section").forEach((section) => {
    section.addEventListener("click", () => {
      section.classList.add("pulse");
      setTimeout(() => section.classList.remove("pulse"), 2000);
    });
  });

  function addItemToContainer(container, item, limit = 5) {
    if (container.children.length >= limit) {
      container.removeChild(container.lastChild);
    }
    container.prepend(item);
  }

  if (supportsCustomElements) {
    // קוד שמשתמש ב-Custom Elements
  } else {
    // קוד חלופי או הודעה למשתמש
  }

  // Add this function to create and update the news bars
  function updateNewsBars() {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = "";

    for (let i = 0; i < 6; i++) {
      const newsBar = document.createElement("div");
      newsBar.classList.add("news-bar");
      const channel =
        newsChannels[Math.floor(Math.random() * newsChannels.length)];
      const title = newsTitles[Math.floor(Math.random() * newsTitles.length)];
      newsBar.innerHTML = `<span class="news-title">${channel}: ${title}</span>`;
      newsContainer.appendChild(newsBar);
    }
  }

  // Call this function to initialize the news bars
  updateNewsBars();

  // Optional: Add a function to simulate changing news titles
  function simulateNewsUpdates() {
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * newsTitles.length);
      newsTitles[randomIndex] = `כותרת חדשה ${Date.now()}`;
      updateNewsBars();
    }, 30000); // Update a random news title every 30 seconds
  }

  // Call this function to start simulating news updates
  simulateNewsUpdates();

  document
    .getElementById("increase-font-size-btn")
    .addEventListener("click", () => {
      document.body.style.fontSize = `${
        parseInt(getComputedStyle(document.body).fontSize) + 2
      }px`;
    });

  document
    .getElementById("decrease-font-size-btn")
    .addEventListener("click", () => {
      document.body.style.fontSize = `${
        parseInt(getComputedStyle(document.body).fontSize) - 2
      }px`;
    });

  document
    .getElementById("toggle-high-contrast-btn")
    .addEventListener("click", () => {
      document.body.classList.toggle("high-contrast");
    });

  document
    .getElementById("toggle-animations-btn")
    .addEventListener("click", () => {
      document.body.classList.toggle("no-animations");
    });
});
