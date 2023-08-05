// Function to get the user's IP address
function getUserIP() {
    const genericIpAddress = "223.189.24.150";
    const ipAddressElement = document.getElementById('ipAddress');
    ipAddressElement.textContent = genericIpAddress;

    const mapButton = document.getElementById('mapButton');
    mapButton.addEventListener('click', () => getGeoInfo());
}

// Function to get the geographical information using the IP address
function getGeoInfo(ip) {
  fetch(`https://ipinfo.io/${ip}/geo`)
    .then((response) => response.json())
    .then((data) => {
      // Display geographical information
      const latElement = document.querySelector('.span1');
      const longElement = document.querySelector('.last1');
      const timeZoneElement = document.querySelector('.parag:last-child');
      latElement.textContent = `Lat: ${data.lat}`;
      longElement.textContent = `Long: ${data.lng}`;
      timeZoneElement.textContent = `Time Zone: ${data.timezone}`;

      // Show user's location on Google Map
      const mapFrame = document.getElementById('mapFrame');
      const mapSrc = `https://www.google.com/maps/embed/v1/view?key=YOUR_GOOGLE_MAPS_API_KEY&center=${data.loc}&zoom=15`;
      mapFrame.src = mapSrc;

      // Get postal code information
      const postalCode = data.postal;
      getPostalInfo(postalCode);
    })
    .catch((error) => console.error('Error fetching geographical information:', error));
}

// Function to get postal code information
function getPostalInfo(postalCode) {
  fetch(`https://api.postalpincode.in/pincode/${postalCode}`)
    .then((response) => response.json())
    .then((data) => {
      const postOffices = data[0]?.PostOffice;
      if (postOffices && postOffices.length > 0) {
        // Display post office information
        const gridCont = document.querySelector('.grid-cont');
        gridCont.innerHTML = ''; // Clear previous content
        postOffices.forEach((office) => {
          const div = document.createElement('div');
          div.classList.add('post');
          div.innerHTML = `
            <p>${office.Name}</p>
            <p>${office.BranchType}</p>
            <p>${office.DeliveryStatus}</p>
            <p>${office.District}</p>
            <p>${office.Division}</p>
          `;
          gridCont.appendChild(div);
        });
      } else {
        const nspElement = document.querySelector('.nsp');
        nspElement.textContent = 'No post offices found for this pincode.';
      }
    })
    .catch((error) => console.error('Error fetching postal information:', error));
}

// Call the function to get the user's IP address on page load
getUserIP();
