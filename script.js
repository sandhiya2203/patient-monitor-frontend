async function loadPatientData() {

    try {

        const response = await fetch(
            "https://web-production-ca02a.up.railway.app/patient"
        );

        if (!response.ok) {
            throw new Error("Unable to fetch patient data");
        }

        const data = await response.json();

        // Update Status
        document.getElementById("status").textContent =
            data.status || "Disconnected";

        // Update Heart Rate
        document.getElementById("heart").textContent =
            data.heart_rate ?? 0;

        // Update Blood Pressure
        document.getElementById("bp").textContent =
            data.systolic_bp ?? 0;

        // Update SpO2
        document.getElementById("spo2").textContent =
            data.spo2 ?? 0;

        // Show date and time received from API
        document.getElementById("date").textContent =
            data.date || "-";

        document.getElementById("time").textContent =
            data.time || "-";

        // Status Color
        const status = document.getElementById("status");

        if (data.status === "Connected") {

            status.style.color = "green";

        }
        else if (data.status === "Searching Provider...") {

            status.style.color = "orange";

        }
        else if (
            data.status === "Provider Not Found" ||
            data.status === "Disconnected"
        ) {

            status.style.color = "red";

        }
        else {

            status.style.color = "#1565c0";

        }

    }
    catch (error) {

        console.log(error);

        document.getElementById("status").textContent =
            "Connection Error";

        document.getElementById("status").style.color =
            "red";

        // Keep previous date and time.
        // Do NOT clear them here.

    }

}


// Load immediately
loadPatientData();


// Refresh every second
setInterval(loadPatientData, 1000);
