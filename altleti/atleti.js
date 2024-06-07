window.onload = function() {
    // Fetch the list of athletes from atleti.json
    fetch('atleti.json')
        .then(response => response.json())
        .then(data => {
            const gallery = document.getElementById('gallery');
            const info = document.getElementById('info');
 
            // Function to display athlete details
            const showAthleteDetails = (index) => {
                fetch(`info/${index}.json`)
                    .then(response => response.json())
                    .then(details => {
                        info.innerHTML = `
                            <h2>${details.name}</h2>
                            <p><strong>Sport:</strong> ${details.sport}</p>
                            <img src="${details.image}" alt="${details.name}">
                            <p><strong>Date of Birth:</strong> ${details['date-of-birth']}</p>
                            <p><strong>Label:</strong> ${details.label}</p>
                            <p><strong>Format:</strong> ${details.format}</p>
                            <p><strong>Winnings:</strong> ${details.winings.join(', ')}</p>
                        `;
                    })
                    .catch(error => {
                        console.error('Error fetching athlete details:', error);
                    });
            };
 
            // Add each athlete to the gallery
            data.forEach((athlete, index) => {
                const athleteImg = document.createElement('img');
                athleteImg.src = athlete.image;
                athleteImg.alt = athlete.name;
                athleteImg.classList.add('athlete-cover');
 
                // Add click event to show athlete details
                athleteImg.addEventListener('click', () => {
                    showAthleteDetails(index);
                });
 
                gallery.appendChild(athleteImg);
            });
 
            // Show details of the first athlete by default
            if (data.length > 0) {
                showAthleteDetails(0);
            }
        })
        .catch(error => {
            console.error('Error fetching athletes:', error);
        });
 };
 