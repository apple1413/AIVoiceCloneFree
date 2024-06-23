document.addEventListener('DOMContentLoaded', function() {
	let audioChunks = [];
	  let audioContext;
	  let analyser;
	  let dataArray;
	  let bufferLength;
	  let canvasCtx;
	  let total
	  let animationId;
	  let audioBlob = null; 
	  let stream = null; 
	  let mediaRecorder = null; 
	  let downUrl = null; 
	  const openPopupButton = document.getElementById('openPopupButton');
	  const closePopupButton = document.getElementById('closePopupButton');
	  const recordButton = document.getElementById('recordButton');
	  const popup = document.getElementById('popup');
	  const overlay = document.getElementById('overlay');
	  const canvas = document.getElementById('visualizer');
	  canvasCtx = canvas.getContext('2d');
	  openPopupButton.addEventListener('click', function(event) {
	      event.preventDefault();
		
	      if (!stream) {
	          navigator.mediaDevices.getUserMedia({ audio: true })
	              .then(s => {
					    popup.style.display = 'block';
						  overlay.style.display = 'block';
	                  stream = s;
	                  setupAudioContext();
	              })
	              .catch(error => {
					
	                  console.error('Access denied for audio capture:', error);
	                  alert("Audio capture permission denied.");
	              });
	      }
	  });
	 
	  function setupAudioContext() {
	       if (!audioContext) {
	             audioContext = new AudioContext();
	         }
	         const source = audioContext.createMediaStreamSource(stream);
	         analyser = audioContext.createAnalyser();
	         source.connect(analyser);
	         analyser.fftSize = 2048;
	         bufferLength = analyser.frequencyBinCount;
	         dataArray = new Uint8Array(bufferLength);
	  }
	  recordButton.addEventListener('click', function(event) {
	      event.preventDefault(); 
	      if (mediaRecorder && mediaRecorder.state === 'recording') {
	          mediaRecorder.stop();
	          this.textContent = 'Start recording';
	          cancelAnimationFrame(animationId);
	      } else {
	          this.textContent = 'Stop recording';
	          mediaRecorder = createMediaRecorder(stream);
	          mediaRecorder.start();
	          visualize();
	      }
	  });
	  
	  function createMediaRecorder(stream) {
	      let newRecorder = new MediaRecorder(stream);
	      newRecorder.ondataavailable = event => {
	          audioChunks.push(event.data);
	          if (newRecorder.state === 'inactive') {
	              audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
	              const audioUrl = URL.createObjectURL(audioBlob);
	              const audioPlayer = document.getElementById('audioPlayer');
	              audioPlayer.src = audioUrl;
	              audioChunks = [];
	          }
	      };
		  newRecorder.onstop = () => {
		      stream.getTracks().forEach(track => track.stop());
		      stream = null;
		      closePopupButton.click();
		  };
	      return newRecorder;
	  }
	  function visualize() {
	      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
	      function draw() {
	          animationId = requestAnimationFrame(draw);
	          analyser.getByteTimeDomainData(dataArray);
	          canvasCtx.fillStyle = 'rgb(243, 243, 243)';
	          canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
	          canvasCtx.lineWidth = 2;
	          canvasCtx.strokeStyle = '#007bff';
	          canvasCtx.beginPath();
	          const sliceWidth = canvas.width * 1.0 / bufferLength;
	          let x = 0;
	          for (let i = 0; i < bufferLength; i++) {
	              const v = dataArray[i] / 128.0;
	              const y = v * canvas.height / 2;
	              if (i === 0) {
	                  canvasCtx.moveTo(x, y);
	              } else {
	                  canvasCtx.lineTo(x, y);
	              }
	              x += sliceWidth;
	          }
	          canvasCtx.lineTo(canvas.width, canvas.height / 2);
	          canvasCtx.stroke();
	      }
	      draw();
	  }
	    function startCountdown(duration, display) {
	             var timer = duration, seconds;
	             var countdownInterval = setInterval(function () {
	                 seconds = parseInt(timer, 10);
	                 display.textContent = seconds + ' seconds';
	 
	                 if (--timer < 0) {
	                     clearInterval(countdownInterval);
	                     document.getElementById('loadingAnimation').classList.add('hidden');
	                 }
	             }, 1000);
	         }
	 
	function showLoadingAnimation() {
	 var display = document.querySelector('#countdown');
	 startCountdown(30, display);
	 document.getElementById('loadingAnimation').classList.remove('hidden');
	}
			 
	function submitForm() {
		var fileInput = document.getElementById('fileInput');
		if (audioBlob&&fileInput.files.length != 0) {
		    document.getElementById('myModal').classList.remove('hidden'); 
		     return;
		}
	    if (!audioBlob&&fileInput.files.length === 0) {
	       document.getElementById('myModal').classList.remove('hidden');
	         return;
	
	    }
		var textArea = document.getElementById('textContentId');   
		if (textArea.value.trim() === "") {
			 alert('You can enter the text of the recording you want to clone.');
			 return;
		}
		showLoadingAnimation()
	    document.getElementById('loadingAnimation').classList.remove('hidden');
	    var form = document.getElementById('audioGenerationForm');
	    var formData = new FormData(form);
		if (audioBlob) {
		   formData.append('myfile', audioBlob, 'recording.wav');  
		}
		console.log("start....")
	    sub(formData)
	}	
	var a=0
	function sub(formData){
		a=a+1;
		showLoadingAnimation()
		fetch('https://aivoiceclonefree.com/upload', {
		    method: 'POST',
		    body: formData
		})
		.then(response => response.json())
		.then(data => {
		    document.getElementById('loadingAnimation').classList.add('hidden');
		    if (data && data.result) {
		        const downloadUrl = data.result;
				if (downloadUrl) {
						const audioPlayer = document.getElementById('audioPagePlayer');
						audioPlayer.src = downloadUrl;
						audioPlayer.style.display = 'block';
						downUrl=downloadUrl;
						const downLoadButton = document.getElementById('downLoadButton');
						downLoadButton.style.display = 'block'; 		
				} else {
					if(a<=3){
						 sub(formData)
					}
				
				}
		    } else {
		       if(a<=3){
		       	 sub(formData)
		       };
		    }
		})
		.catch(error => {
		   if(a<=3){
		   	 sub(formData)
		   };
		});
	}
	closePopupButton.addEventListener('click', function() {
	    if (mediaRecorder) {
	        if (mediaRecorder.state === 'recording') { 
	            mediaRecorder.stop();
	            mediaRecorder.onstop = () => {
	                console.log('Recording stopped and resources released');
	            };
	        }
	        mediaRecorder = null; 
	    }
	    if (stream) {
	        stream.getTracks().forEach(track => track.stop()); 
	        stream = null; 
	    }	
	    if (audioBlob) {
	        document.getElementById('recordName').textContent = "recording.wav"; 
	    }
	    popup.style.display = 'none';
	    overlay.style.display = 'none';
	    recordButton.textContent = 'Start recording';
	    cancelAnimationFrame(animationId); 
	});
	   function downLoad() {
		   const a = document.createElement('a');
		   a.href = downUrl;
		   a.download = 'clone.wav';
		   document.body.appendChild(a);
		   a.click();
		   document.body.removeChild(a);
		   
	   }
	   document.addEventListener('DOMContentLoaded', function() {
	       var textArea = document.getElementById('textContentId');
	       var messageDiv = document.getElementById('messageDiv');
	       textArea.addEventListener('input', function() {
				  var content = this.value;
				  var chineseCount = (content.match(/[\u4e00-\u9fff]/g) || []).length; 
				  var nonChineseWords = content.replace(/[\u4e00-\u9fff]/g, ' '); 
				  var englishWordCount = (nonChineseWords.match(/\b\w+\b/g) || []).length;
				   total = chineseCount + englishWordCount;
				  if (total > 50) {
					  messageDiv.textContent = 'The free version cannot exceed 50 words。';
					  messageDiv.style.color = 'red';
				  } else {
					  messageDiv.textContent = '';
				  }
	       });
	   });
	   document.getElementById('languageSelect').addEventListener('change', function() {
	            var textArea = document.getElementById('textContentId');
	            if (this.value === 'zh_default') {
	                textArea.placeholder = '您可以输入您想克隆的语音文本。';
	            } 
				 if (this.value === 'en_default') {
					textArea.placeholder = 'You can enter the text of the recording you want to clone.';
				}
				if (this.value === 'jp_default') {
					textArea.placeholder = 'クローンしたい録音のテキストを入力できます。';
				}
				if (this.value === 'kr_default') {
					textArea.placeholder = '복제하고 싶은 녹음의 텍스트를 입력할 수 있습니다.';
				}
				if (this.value === 'es_default') {
					textArea.placeholder = 'Puedes introducir el texto de la grabación que quieres clonar.';
				}
				if (this.value === 'fr_default') {
					textArea.placeholder = "Vous pouvez saisir le texte de l'enregistrement que vous souhaitez cloner.";
				}		
	        });
	function closeModal() {
	    document.getElementById('myModal').classList.add('hidden'); 
	}
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




	