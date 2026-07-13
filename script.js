async function loadPatientData() {

    try {

        const response = await fetch(
            "https://web-production-ca02a.up.railway.app/patient"
        )

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
        document.getElementById("bp").textContent =
            data.systolic_bp ?? 0;


        // Update SpO2
        document.getElementById("spo2").textContent =
            data.spo2 ?? 0;



        // Update Time

        if (data.status === "Connected") {

    const now = new Date();

    document.getElementById("date").textContent =
        now.toLocaleDateString();

    document.getElementById("time").textContent =
        now.toLocaleTimeString();

}
else {

    if (data.last_update) {

        const last = new Date(data.last_update);

        document.getElementById("date").textContent =
            last.toLocaleDateString();

        document.getElementById("time").textContent =
            last.toLocaleTimeString();

    }
    else {

        document.getElementById("date").textContent = "--";
        document.getElementById("time").textContent = "--";

    }

}


        // Change status color

        const status = document.getElementById("status");


        if (data.status === "Connected") {

            status.style.color = "green";

        }
        else if (data.status === "Searching Provider...") {

            status.style.color = "orange";

        }
        else if (data.status === "Provider Not Found" ||
                 data.status === "Disconnected") {

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

    }

}


// Load immediately
loadPatientData();


// Refresh every second
setInterval(loadPatientData, 1000);
