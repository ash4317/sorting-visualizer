document.addEventListener('DOMContentLoaded', () => {

    // Load canvas. Set height and width to screen height and width
    var c = document.querySelector('#mycanvas');
    c.height = screen.availHeight;
    c.width = screen.availWidth + 350;
    var ctx = c.getContext("2d");

    sort_btn = document.getElementById('perform');

    sort_btn.onclick = () => {
        var choose_algo = Boolean(document.getElementById("algo").value != "none"); // whether algo is chosen
        var choose_no = Boolean(document.getElementById("elements").value != "none"); // whether array size is chosen

        if(!(choose_algo && choose_no)) {
            // if any one is not chosen, alert
            alert("Select an algorithm and array size");
        }
        else {
            // if both are chosen
            var algo = document.getElementById("algo").value; // get algo chosen
            var n = Number(document.getElementById("elements").value); // get array size chosen
            

            // XHR object
            var api_call = new XMLHttpRequest();
            var url = `http://127.0.0.1:5000/${algo}/${n}`;

            var a = document.getElementById("algo");
            document.getElementById("function").innerHTML = a.options[a.selectedIndex].text + " on an array of " + n.toString() + " elements";


            function draw_settings(x, y, width, height, height_multiplier, color) {
                // bar settings
                ctx.beginPath();
                ctx.rect(40 + (width + 5) * x, y, width, height_multiplier * height);
                ctx.fillStyle = color;
                ctx.fill();
            }


            function get_ht_multiplier(n) {
                // height multiplier of the bars
                switch(n) {
                    case 25: return 30;
                    case 50: return 15;
                    case 75: return 10;
                    case 100: return 7.5;
                    case 200: return 3.5;
                }
            }


            function draw(arr) {
                // draw all bars representing the array

                let bar_width = Math.floor((c.width - 75 - 5*n)/n);
                var height_multiplier = get_ht_multiplier(n);
                
                // draw all the bars representing the array
                for(var i = 0; i < arr.length - 2; i++) {
                    draw_settings(i, 40, bar_width, arr[i], height_multiplier, "white");
                }
                // last two elements of array are the indices that are to be swapped. Color of swapping elements = yellow, red
                if(algo != "merge") {
                    draw_settings(arr[arr.length - 2], 40, bar_width, arr[arr[arr.length - 2]], height_multiplier, "yellow");
                }
                draw_settings(arr[arr.length - 1], 40, bar_width, arr[arr[arr.length - 1]], height_multiplier, "red");
            }


            function clear_canvas() {
                // clear the canvas every time an array is drawn
                ctx.clearRect(0, 0, c.width, c.height);
            }


            function start(data) {
                // function to be executed after getting response from server
                var speed = 0;

                // set speeds of sorting algos according to array size
                if(algo == "bubble") {
                   switch(n) {
                       case 25:
                           speed = 15;
                           break;
                        case 50:
                            speed = 7;
                            break;
                        case 75:
                            speed = 4;
                            break;
                        case 100:
                            speed = 2;
                            break;
                        case 200:
                            speed = 0.5;
                            break;
                   }
                }
                else if(algo == "selection") {
                    switch(n) {
                        case 25:
                           speed = 200;
                           break;
                        case 50:
                            speed = 100;
                            break;
                        case 75:
                            speed = 100;
                            break;
                        case 100:
                            speed = 70;
                            break;
                        case 200:
                            speed = 40;
                            break;
                    }
               }
               else if(algo == "insertion") {
                   switch(n) {
                       case 25:
                           speed = 40;
                           break;
                        case 50:
                            speed = 20;
                            break;
                        case 75:
                            speed = 10;
                            break;
                        case 100:
                            speed = 5;
                            break;
                        case 200:
                            speed = 2.5;
                            break;
                   }
               }
               else if(algo == "quick") {
                   switch(n) {
                       case 25:
                           speed = 200;
                           break;
                        case 50:
                            speed = 100;
                            break;
                        case 75:
                            speed = 50;
                            break;
                        case 100:
                            speed = 40;
                            break;
                        case 200:
                            speed = 30;
                            break;
                   }
               }
               else if(algo == "merge") {
                  switch(n) {
                      case 25:
                          speed = 80
                          break;
                    case 50:
                        speed = 60;
                        break;
                    case 75:
                        speed = 40;
                        break;
                    case 100:
                        speed = 30;
                        break;
                    case 200:
                        speed = 20;
                        break;
                  }
               }
               else { //heap sort
                    switch(n) {
                        case 25:
                            speed = 100;
                            break;
                        case 50:
                            speed = 70;
                            break;
                        case 75:
                            speed = 50;
                            break;
                        case 100:
                            speed = 35;
                            break;
                        case 200:
                            speed = 20;
                            break;
                    }
                }

               // iterate through the server JSON response where all array states are present.
               key_arr = Object.keys(data);
               for(var i = 0; i < key_arr.length; i++) {
                    setTimeout((arr) => {
                        clear_canvas();
                        draw(arr);
                    }, speed * i, data[key_arr[i]])
               }
            }

            // when server has responded
            api_call.onreadystatechange = () => {
                if(api_call.readyState == 4 && api_call.status == 200) {
                    var data = JSON.parse(api_call.responseText); // JSONify the data
                    start(data); // start drawing
                }
            };
            api_call.open("POST", url, true); // GET request
            api_call.send(); // send request
        }
    };
});