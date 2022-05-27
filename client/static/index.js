document.addEventListener('DOMContentLoaded', () => {

    // Load canvas. Set height and width to screen height and width
    const canvas = document.querySelector('#mycanvas');
    canvas.height = screen.availHeight;
    canvas.width = screen.availWidth + 350;
    const canvasContext = canvas.getContext("2d");

    const sortButton = document.getElementById('perform');    // button to start the sorting

    const canvasDrawSettings = (coordinateX, coordinateY, width, height, heightMultiplier, color) => {
        // bar settings
        canvasContext.beginPath();
        canvasContext.rect(40 + (width + 5) * coordinateX, coordinateY, width, heightMultiplier * height);
        canvasContext.fillStyle = color;
        canvasContext.fill();
    }
    
    const getHeightMultiplier = (arraySize) => {
        // height multiplier of the bars
        const heightMultipliers = {
            25: 30,
            50: 15,
            75: 10,
            100: 7.5,
            200: 3.5
        }
        return heightMultipliers[arraySize]
    }
    
    const drawCanvas = (arr, arraySize) => {
        // draw all bars representing the array
    
        let barWidth = Math.floor((canvas.width - 75 - 5 * arraySize) / arraySize);
        let heightMultiplier = getHeightMultiplier(arraySize);
        
        // draw all the bars representing the array
        for(let i = 0; i < arr.length - 2; i++) {
            canvasDrawSettings(
                i,
                40,
                barWidth,
                arr[i],
                heightMultiplier,
                "white"
            );
        }
    
        // last two elements of array are the indices that are to be swapped. Color of swapping elements = yellow, red
        if(algo != "merge") {
            canvasDrawSettings(
                arr[arr.length - 2],
                40,
                barWidth,
                arr[arr[arr.length - 2]],
                heightMultiplier,
                "yellow"
            );
        }
    
        canvasDrawSettings(
            arr[arr.length - 1],
            40,
            barWidth,
            arr[arr[arr.length - 1]],
            heightMultiplier,
            "red"
        );
    }
    
    
    const clearCanvas = () => {
        // clear the canvas every time an array is drawn
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    
    const startDrawingCanvas = (data, algo, arraySize) => {
        // function to be executed after getting response from server
    
        // set speeds of sorting algos according to array size
        sortingAlgoSpeeds = {
            "bubble": {
                25: 15,
                50: 7,
                75: 4,
                100: 2,
                200: 0.5
            },
            "selection": {
                25: 200,
                50: 100,
                75: 100,
                100: 75,
                200: 40
            },
            "insertion": {
                25: 40,
                50: 20,
                75: 10,
                100: 5,
                200: 2.5
            },
            "quick": {
                25: 200,
                50: 100,
                75: 50,
                100: 40,
                200: 30
            },
            "merge": {
                25: 80,
                50: 60,
                75: 40,
                100: 30,
                200: 20
            },
            "heap": {
                25: 100,
                50: 70,
                75: 50,
                100: 35,
                200: 20
            }
        }
    
        const speed = sortingAlgoSpeeds[algo][arraySize];
    
        // iterate through the server JSON response where all array states are present.
        let iterationNumber = Object.keys(data);
        for(let i = 0; i < iterationNumber.length; i++) {
            setTimeout((arr) => {
                clearCanvas();
                drawCanvas(arr, arraySize);
            }, speed * i, data[iterationNumber[i]])
        }
    }

    sortButton.onclick = () => {
        console.log("Button clicked!");
        const chooseAlgoSelected = Boolean(document.getElementById("algo").value != "none"); // whether algo is chosen
        const chooseNumberSelected = Boolean(document.getElementById("elements").value != "none"); // whether array size is chosen

        if(!(chooseAlgoSelected && chooseNumberSelected)) {
            // if any one is not chosen, alert
            alert("Select an algorithm and array size");
        }
        else {
            // if both are chosen
            const algo = document.getElementById("algo").value; // get algo chosen
            const arraySize = Number(document.getElementById("elements").value); // get array size chosen
            

            // XHR object
            const apiRequest = new XMLHttpRequest();
            const url = `http://127.0.0.1:5000/${algo}/${arraySize}`;

            const sortingAlgoDropdown = document.getElementById("algo");
            document.getElementById("function").innerHTML = sortingAlgoDropdown.options[sortingAlgoDropdown.selectedIndex].text + " on an array of " + arraySize.toString() + " elements";


            // when server has responded
            apiRequest.onreadystatechange = () => {
                console.log("API state changed to " + apiRequest.readyState);
                if(apiRequest.readyState == 4 && apiRequest.status == 200) {
                    console.log("Got data. Starting to draw canvas");
                    const data = JSON.parse(apiRequest.responseText); // JSONify the data
                    startDrawingCanvas(data, algo, arraySize); // start drawing
                }
            };
            console.log("Creating API call");
            apiRequest.open("POST", url, true); // POST request
            console.log("Making API call");
            apiRequest.send(); // send request
        }
    };
});