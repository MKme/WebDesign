document.addEventListener("DOMContentLoaded", function() {
    const searchBtn = document.querySelector('.query-box button');
    const searchInput = document.querySelector('.query-box input');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');

    searchBtn.addEventListener('click', function() {
        // Remove punctuation, extra spaces, and convert to lowercase
        const cleanedInput = searchInput.value.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').toLowerCase();

        if (cleanedInput === "open the pod bay doors hal" || cleanedInput === "open the pod bay doors val") {
            modal.style.display = "block";
        }
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});





document.getElementById('startCameraButton').addEventListener('click', function() {
    startCamera();
});

document.getElementById('captureButton').addEventListener('click', function() {
    captureSnapshot();
});

let videoStream;

function startCamera() {
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                let video = document.getElementById('cameraPreview');
                videoStream = stream;
                video.srcObject = stream;
                video.style.display = 'block';
                document.getElementById('captureButton').style.display = 'block';
                document.getElementById('startCameraButton').style.display = 'none';
            })
            .catch(function (error) {
                console.log("Something went wrong!", error);
            });
    }
}

function captureSnapshot() {
    let video = document.getElementById('cameraPreview');
    let canvas = document.getElementById('snapshotCanvas');
    let context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, 320, 240);
    // Stop the camera after capturing
    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
    }
    video.style.display = 'none';
    document.getElementById('captureButton').style.display = 'none';
    document.getElementById('startCameraButton').style.display = 'block';
    // Here, you can get the image data or save the image, etc.
    // For example: let imageDataURL = canvas.toDataURL();
}
