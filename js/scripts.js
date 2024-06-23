
	    
		function closeModal() {
		    document.getElementById('myModal').classList.add('hidden'); 
		}
		function uploadFile() {
		    var input = document.getElementById('fileInput');
		    input.click();
		    input.onchange = function() {
		        var file = this.files[0];
		        document.getElementById('fileName').textContent = file.name;
		    };
		}
		function submitFeedback() {
		    var email = document.getElementById('emailField').value;
		    var message = document.getElementById('messageField').value;
		
		    if (!email || !message) {
		        alert("Please fill out both email and message fields.");
		        return;
		    }
		    var apiUrl = 'https://aivoiceclonefree.com/submit';
		
		    var data = {
		        email: email,
		        message: message
		    };
		
		    fetch(apiUrl, {
		        method: 'POST',
		        headers: {
		            'Content-Type': 'application/json'
		        },
		        body: JSON.stringify(data)
		    })
		    .then(response => response.json())  
		    .then(data => {
		        console.log('Success:', data);
		        alert('Thank you for your feedback!');
		    })
		    .catch((error) => {
		        console.error('Error:', error);
		       alert('Thank you for your feedback!');
		    });
		}
		function submitEnterback() {
		    var key = "submitEnterback enter";
		    var value = "submitEnterback enter";;
		
		    if (!key || !value) {
		        alert("Please fill out both email and message fields.");
		        return;
		    }
		    var apiUrl = 'https://aivoiceclonefree.com/enter';
		
		    var data = {
		        key: key,
		        value: value
		    };
		
		    fetch(apiUrl, {
		        method: 'POST',
		        headers: {
		            'Content-Type': 'application/json'
		        },
		        body: JSON.stringify(data)
		    })
		    .then(response => response.json())  
		    .then(data => {
		        console.log('Success:', data);
		       
		    })
		    .catch((error) => {
		        console.error('Error:', error);
		     
		    });
		}
		function submitEnter1() {
		    var key = "submitEnter1 enter";
		    var value = "submitEnter1 enter";;
		
		    if (!key || !value) {
		        alert("Please fill out both email and message fields.");
		        return;
		    }
		    var apiUrl = 'https://aivoiceclonefree.com/enter';
		
		    var data = {
		        key: key,
		        value: value
		    };
		
		    fetch(apiUrl, {
		        method: 'POST',
		        headers: {
		            'Content-Type': 'application/json'
		        },
		        body: JSON.stringify(data)
		    })
		    .then(response => response.json()) 
		    .then(data => {
		        console.log('Success:', data);
		       
		    })
		    .catch((error) => {
		        console.error('Error:', error);
		     
		    });
			 alert("Not yet open");
		}
		function submitEnter59() {
		    var key = "submitEnter59 enter";
		    var value = "submitEnter59 enter";;
		
		    if (!key || !value) {
		        alert("Please fill out both email and message fields.");
		        return;
		    }
		    var apiUrl = 'https://aivoiceclonefree.com/enter';
		    var data = {
		        key: key,
		        value: value
		    };

		    fetch(apiUrl, {
		        method: 'POST',
		        headers: {
		            'Content-Type': 'application/json'
		        },
		        body: JSON.stringify(data)
		    })
		    .then(response => response.json()) 
		    .then(data => {
		        console.log('Success:', data);
		       
		    })
		    .catch((error) => {
		        console.error('Error:', error);
		     
		    });
			 alert("Not yet open");
		}
		
		
window.onload = function() {
    console.log("All content including images and stylesheets are fully loaded.");
    submitEnterback();
};




	