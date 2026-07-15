async function loadPatientData()
{
    try
    {

        const response = await fetch(
            "https://cpppatient-monitorbackend-production.up.railway.app/patient?time="
            + new Date().getTime()
        );


        const data = await response.json();


        console.log("API DATA:", data);



        document.getElementById("status").textContent =
            data.status;


        document.getElementById("heart").textContent =
            data.heartRate;


        document.getElementById("bp").textContent =
            data.bloodPressure;


        document.getElementById("spo2").textContent =
            data.spo2;



        // ONLY backend timestamp

        document.getElementById("date").textContent =
            data.date;


        document.getElementById("time").textContent =
            data.time;


    }

    catch(error)
    {
        console.log(error);
    }

}



setInterval(
    loadPatientData,
    1000
);


loadPatientData();
