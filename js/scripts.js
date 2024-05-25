 function submitForm() {
			 var fileInput = document.getElementById('fileInput');
			        if (fileInput.files.length === 0) {
			            document.getElementById('myModal').classList.remove('hidden'); // 显示模态框
			            return;
			        }
			 document.getElementById('loadingAnimation').classList.remove('hidden'); // 显示加载动画
	        var form = document.getElementById('audioGenerationForm');
	        var formData = new FormData(form);
	        fetch('https://www.freetoolsplus.cn/upload', {
	            method: 'POST',
	            body: formData
	        })
	        .then(response => response.json()) 
	        .then(data => {
				  document.getElementById('loadingAnimation').classList.add('hidden'); // 隐藏加载动画
	                if (data && data.result) {
	                    const downloadUrl = data.result; 
	                    const a = document.createElement('a');
	                    a.href = downloadUrl;
	                    a.download = 'filename-from-url.wav'; 
	                    document.body.appendChild(a);
	                    a.click();  
	                    document.body.removeChild(a); 
	                } else {
	                    console.error('Failed to download file: No result URL.');
	                    alert('Failed to download the file.');
	                }
	            })
	            .catch(error => {
	                console.error('Error:', error);
	                alert('Error downloading the file.');
	            });  
	    }
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
		
		    // 模拟的API URL，您需要替换成您的实际接口地址
		    var apiUrl = 'https://www.freetoolsplus.cn/submit';
		
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
		    .then(response => response.json())  // 解析返回的JSON数据
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
		
		    // 模拟的API URL，您需要替换成您的实际接口地址
		    var apiUrl = 'https://www.freetoolsplus.cn/enter';
		
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
		    .then(response => response.json())  // 解析返回的JSON数据
		    .then(data => {
		        console.log('Success:', data);
		       
		    })
		    .catch((error) => {
		        console.error('Error:', error);
		     
		    });
		}
window.onload = function() {
    console.log("All content including images and stylesheets are fully loaded.");
    // 这里可以调用需要在所有资源加载后才能执行的函数
    submitEnterback();
};
		

	