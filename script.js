async function loadPatientData() {

    try {

        const response = await fetch("https://your-railway-app.up.railway.app/patient")

        if (!response.ok) {
            throw new Error("Unable to fetch patient data");
        }

        const data = await response.json();

        // Update Status
        document.getElementById("status").textContent = data.status;

        // Update Heart Rate
        document.getElementById("heart").textContent =
            data.heart_rate ?? 0;

        // Update Blood Pressure
        document.getElementById("bp").innerHTML =
            `${data.systolic_bp}`;

        // Update SpO2
        document.getElementById("spo2").textContent =
            data.spo2 ?? 0;

        // Change status color
        const status = document.getElementById("status");

        if (data.status === "Connected") {

            status.style.color = "green";

        }
        else if (data.status === "Searching Provider...") {

            status.style.color = "orange";

        }
        else if (data.status === "Provider Not Found") {

            status.style.color = "red";

        }
        else {

            status.style.color = "#1565c0";

        }

    }
    catch (error) {

        console.log(error);

        document.getElementById("status").textContent = "Connection Error";
        document.getElementById("status").style.color = "red";

    }

}


// Load immediately
loadPatientData();

// Refresh every second
setInterval(loadPatientData, 1000);
