// Create bubbles for background effect
function createBubbles() {
    const body = document.querySelector('body');
    const count = 15;

    for (let i = 0; i < count; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';

        const size = Math.random() * 60 + 20;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;

        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${Math.random() * 10 + 5}s`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;

        body.appendChild(bubble);
    }
}

// Calculate attendance percentage and update UI
function calculateAttendance() {
    const totalClasses = parseInt(document.getElementById('totalClasses').value);
    const attendedClasses = parseInt(document.getElementById('attendedClasses').value);

    // Validate inputs
    if (isNaN(totalClasses) || isNaN(attendedClasses) || totalClasses <= 0) {
        alert("Please enter valid numbers. Total classes must be greater than 0.");
        return;
    }

    if (attendedClasses > totalClasses) {
        alert("Attended classes cannot be greater than total classes.");
        return;
    }

    // Calculate attendance percentage
    const attendancePercentage = (attendedClasses / totalClasses) * 100;

    // Update the attendance display
    const attendanceDisplay = document.getElementById('attendanceDisplay');
    const attendancePercentageElement = document.getElementById('attendancePercentage');
    const statusMessage = document.getElementById('statusMessage');
    const attendanceTrophy = document.getElementById('attendanceTrophy');

    attendancePercentageElement.textContent = `${attendancePercentage.toFixed(2)}%`;

    // Reset classes
    attendanceDisplay.className = 'attendance-display';
    attendanceTrophy.classList.remove('show');

    // Set class and message based on attendance percentage
    let message = '';

    if (attendancePercentage === 100) {
        attendanceDisplay.classList.add('excellent');
        attendanceTrophy.classList.add('show');
        message = `<strong>🏆 Excellent!</strong> You're setting a high standard for academic excellence.`;
    } else if (attendancePercentage >= 90) {
        attendanceDisplay.classList.add('excellent');
        message = `<strong>Great job!</strong> Your attendance is excellent.`;
    } else if (attendancePercentage >= 80 && attendancePercentage < 90) {
        attendanceDisplay.classList.add('good');
        message = `<strong>Good!</strong> You're maintaining solid attendance.`;
    } else if (attendancePercentage >= 75 && attendancePercentage < 80) {
        attendanceDisplay.classList.add('average');
        message = `<strong>Caution!</strong> Your attendance is at the minimum acceptable level.`;

        // Calculate classes needed to reach different thresholds
        const classesFor80Percent = Math.ceil((0.8 * totalClasses - attendedClasses) / 0.2);

        if (classesFor80Percent > 0) {
            message += `<div>Attend <strong>${classesFor80Percent}</strong> more consecutive classes to reach 80%.</div>`;
        }
    } else if (attendancePercentage >= 70 && attendancePercentage < 75) {
        attendanceDisplay.classList.add('warning');
        message = `<strong>Warning!</strong> Your attendance is below the recommended threshold.`;

        // Calculate classes needed to reach different thresholds
        const classesFor75Percent = Math.ceil((0.8 * totalClasses - attendedClasses) / 0.2);

        message += `<div>Attend <strong>${classesFor75Percent}</strong> more consecutive classes to reach 80%.</div>`;
    } else {
        attendanceDisplay.classList.add('danger');
        message = `<strong>Critical!</strong> Your attendance is significantly below requirements.`;

        // Calculate classes needed to reach different thresholds
        const classesFor70Percent = Math.ceil((0.8 * totalClasses - attendedClasses) / 0.2);

        message += `<div>Attend <strong>${classesFor70Percent}</strong> more consecutive classes to reach 80%.</div>`;
    }

    statusMessage.innerHTML = message;

    // Add animation effect
    attendanceDisplay.style.animation = 'none';
    setTimeout(() => {
        attendanceDisplay.style.animation = '';
    }, 10);
}

// Initialize the bubble effect
window.onload = function () {
    createBubbles();
};
