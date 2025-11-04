
document.addEventListener('DOMContentLoaded', async () => {

    const API_BASE = 'http://localhost:3000';
    let DRONE_ID;

  
    try {
        console.log('TLF: Fetching app config...');
        const configRes = await fetch(`${API_BASE}/api/config`);
        if (!configRes.ok) {
            throw new Error('Failed to load app config');
        }
        const appConfig = await configRes.json();
        
        DRONE_ID = appConfig.droneId; 
        console.log('TLF: Config loaded. DRONE_ID =', DRONE_ID);

    } catch (e) {
        console.error(e);
    
        document.body.innerHTML = '<h1>Error: Failed to load app configuration. Please check the server.</h1>';
        return;
    }

 
    const submitButton = document.getElementById('submitBtn');
    if (!submitButton) return;

    const temperatureInputElement = document.getElementById('temperatureInput');
    const statusDiv = document.getElementById('submitStatus');

    submitButton.addEventListener('click', async (e) => {
        e.preventDefault();

        const temperatureInput = temperatureInputElement.value;
        if (statusDiv) {
            statusDiv.textContent = 'กำลังส่ง...';
            statusDiv.style.color = '#333';
        }

     
        let config;
        try {
          
            const cfgRes = await fetch(`${API_BASE}/configs/${encodeURIComponent(DRONE_ID)}`);
            if (!cfgRes.ok) {
                const err = await cfgRes.json().catch(() => ({ error: cfgRes.statusText }));
                throw new Error(err.error || err.message || 'Failed to load drone config');
            }
            config = await cfgRes.json();
        } catch (error) {
            console.error('Error fetching configuration:', error);
            if (statusDiv) {
                statusDiv.textContent = 'Error (Config)';
                statusDiv.style.color = '#c00';
            }
            return;
        }

        const data = {
            drone_id: config.drone_id,
            drone_name: config.drone_name,
            country: config.country,
            celsius: parseFloat(temperatureInput)
        };
        try {
            const apiUrl = `${API_BASE}/logs`;
            const apiResponse = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!apiResponse.ok) {
                if (statusDiv) {
                    statusDiv.textContent = 'Error (Submit)';
                    statusDiv.style.color = '#c00';
                }
                throw new Error('Network response was not ok');
            }
            const result = await apiResponse.json();
            console.log('Success:', result);
            if (statusDiv) {
                statusDiv.textContent = 'Submit completed';
                statusDiv.style.color = '#080';
            }
            temperatureInputElement.value = '';
        } catch (error) {
            console.error('Error sending data:', error);
            if (statusDiv) {
                statusDiv.textContent = 'Error (Sending)';
                statusDiv.style.color = '#c00';
            }
        }
    });
});