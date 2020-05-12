// UI elements.
const deviceNameLabel = document.getElementById('device-name');
const connectButton = document.getElementById('connect');
const disconnectButton = document.getElementById('disconnect');
const terminalContainer = document.getElementById('terminal');
const sendForm = document.getElementById('send-form');
const inputField = document.getElementById('input');

// Helpers.
const defaultDeviceName = 'Terminal';
const terminalAutoScrollingLimit = terminalContainer.offsetHeight / 2;
let isTerminalAutoScrolling = true;

const scrollElement = (element) => {
  const scrollTop = element.scrollHeight - element.offsetHeight;

  if (scrollTop > 0) {
    element.scrollTop = scrollTop;
  }
};

const logToTerminal = (message, type = '') => {
  
//var chars = message.split(message);
//  terminalContainer.insertAdjacentHTML('beforeend',
//      `<div${type && ` class="${type}"`}>${message.split(',')[0]}</div>`);




switch (message.substring(1,6)) {
  case "GPRMC":
	logToTerminalGPRMC(message);
	break;
  case "GPGGA":
	logToTerminalGPGGA(message);
	break;
	case "GPGSA":
	logToTerminalGPGSA(message);
	break;
	case "PFLAA":
	logToTerminalPFLAA(message);
	break;
	case "PFLAU":
	logToTerminalPFLAU(message);
	break;
		default:
	terminalContainer.insertAdjacentHTML('beforeend',
      `<div${type && ` class="${type}"`}>${message}</div>`);
};
	  if (isTerminalAutoScrolling) {
    scrollElement(terminalContainer);
  }
};

const logToTerminalPFLAU = (message) => {
var chars = message.split(',');
  terminalContainer.insertAdjacentHTML('beforeend',
      `<details>
<summary> <div in class="in">${message}</div>  </summary>
<table> 
<tr> <td>${chars[0]}  </td> <td> Operating status and priority intruder and obstacle data  </td></tr>
<tr> <td>${chars[1]}  </td> <td><details> <summary> RX	      </summary> Number of devices with unique ID’s currently physically received regardless of the horizontal or vertical separation, an integer from 0 to 99. Because the processing might be based on extrapolated historical data, Rx might be lower than the number of aircraft in range, i.e. there might be other trafficaround (even if the number is zero). Do not expect to receive <Rx> PFLAA sentences, because the number of aircraft being processed might be higher or lower.</details> </td></tr>
<tr> <td>${chars[2]}  </td> <td><details> <summary> TX        </summary> Transmission status, 1 (hex31) for OK and 0 (hex30) for no transmission </details></td></tr>
<tr> <td>${chars[3]}  </td> <td><details> <summary> GPS       </summary> GPS status: 0 (hex30) for no GPS reception, 2 (hex32) for 3d-fix when moving and 1 (hex31) for 3d-fix on ground, i.e. not airborne. If <GPS> goes to 0, FLARM does not operate as warning device, nevertheless wait for some seconds to issue any warning to 3rd party application’s users.</details></td></tr>
<tr> <td>${chars[4]}  </td> <td><details> <summary> Power     </summary> Power status, 1 (hex31) for OK and 0 (hex30) for under- or over-voltage </details></td></tr>
<tr> <td>${chars[5]}  </td> <td><details> <summary> AlarmLevel</summary>  Alarm level as assessed by FLARM<br>  0 = no alarm (used for no-alarm traffic information) <br>  1 = low-level alarm<br>  2 = important alarm<br> 3 = urgent alarm</details></td></tr>
<tr> <td>${chars[6]}  </td> <td><details> <summary> RelativeBearing          </summary> Relative bearing in degrees from the own position and true ground track to the intruder’s / obstacle’s position, an integer from -180 to 180. Positive values are clockwise. 0° indicates that the object is exactly ahead. </details></td></tr>
<tr> <td>${chars[7]}  </td> <td><details> <summary> AlarmType </summary> Type of alarm as assessed by FLARM <br>  0 = aircraft traffic (used for no-alarm traffic information)<br>  1 = silent aircraft alarm (displayed but no alarm tone)<br>  2 = aircraft alarm<br> 3 = obstacle alarm </details></td></tr>
<tr> <td>${chars[8]}  </td> <td><details> <summary> RelativeVertical         </summary> Relative vertical separation in Meter above own position, negative values indicate the other aircraft is lower, signed integer. Some distance-dependent random noise is applied to altitude data if the privacy for the target is active. </details></td></tr>
<tr> <td>${chars[9]}  </td> <td><details> <summary> RelativeDistance          </summary>  Relative horizontal distance in m, unsigned integer. </details></td></tr>
</table>
<details>`);


const logToTerminalPFLAA = (message) => {
var chars = message.split(',');
  terminalContainer.insertAdjacentHTML('beforeend',
      `<details>
<summary> <div in class="in">${message}</div>  </summary>
<table> 
<tr> <td>${chars[0]}  </td> <td> Data on other moving objects around </td></tr>
<tr> <td>${chars[1]}  </td> <td><details> <summary> Alarm level	      </summary> 0 = no alarm (pure traffic, limited to 2km range and 500m altitude difference)<br> 1 = low-level alarm<br> 2 = important alarm<br> 3 = urgent alarm </details> </td></tr>
<tr> <td>${chars[2]}  </td> <td><details> <summary> RelativeNorth     </summary> Relative position in Meter true north from own position </details></td></tr>
<tr> <td>${chars[3]}  </td> <td><details> <summary> RelativeEast      </summary> Relative position in Meter true east from own position</details></td></tr>
<tr> <td>${chars[4]}  </td> <td><details> <summary> RelativeVertical  </summary> Relative vertical separation in Meter above own position, negative values indicate the other aircraft is lower, signed integer. Some distance-dependent random noise is applied to altitude data if the privacy for the target is active </details></td></tr>
<tr> <td>${chars[5]}  </td> <td><details> <summary> ID-Type           </summary> Defines the interpretation of the following field  0 = stateless random-hopping pseudo-ID  1 = official ICAO aircraft address  2 = stable FLARM pseudo-ID (chosen by FLARM) </details></td></tr>
<tr> <td>${chars[6]}  </td> <td><details> <summary> ID                </summary> 6-digit hex value (e.g. “5A77B1”) as configured in the target’s PFLAC,ID sentence. The interpretation is delivered in ID-Type </details> </td></tr>
<tr> <td>${chars[7]}  </td> <td><details> <summary> Track             </summary> The target’s true ground track in degrees. Integer between 0 and 359. The value 0 indicates a true north track. This field is empty if the privacy for the target is active. </details></td></tr>
<tr> <td>${chars[8]}  </td> <td><details> <summary> TurnRate  		  </summary> The target’s turn rate. Positive values indicate a clockwise turn. Signed decimal value in °/s. Currently omitted. Field is empty if the privacy for the target is active.</details></td></tr>
<tr> <td>${chars[9]}  </td> <td><details> <summary> GroundSpeed		  </summary> The target’s ground speed. Decimal value in m/s. The field is set to 0 to indicate the aircraft is not moving, i.e. on ground. This field is empty if the privacy for the target is active while the target is airborne.</details></td></tr>
<tr> <td>${chars[10]} </td> <td><details> <summary> ClimbRate 		  </summary> The target’s climb rate. Positive values indicate a climbing aircraft. Signed decimal value in m/s. This field is empty if the privacy for the target is active.</details></td></tr>
<tr> <td>${chars[11]} </td> <td><details> <summary> Type     		  </summary> Up to two hex characters showing the object type  
 0 = unknown
 1 = glider
 2 = tow plane
 3 = helicopter
 4 = parachute
 5 = drop plane
 6 = fixed hang-glider
 7 = soft para-glider
 8 = powered aircraft
 9 = jet aircraft
 A = UFO
 B = balloon
 C = blimp, zeppelin
 D = UAV
 F = static </details></td></tr>
</table>
<details>`);
};

const logToTerminalGPGSA = (message) => {
var chars = message.split(',');
  terminalContainer.insertAdjacentHTML('beforeend',
      `<details>
<summary> <div in class="in">${message}</div>  </summary>
<table> 
<tr> <td>${chars[0]}  </td> <td>GPS DOP and active satellites</td></tr>
<tr> <td>${chars[1]}  </td> <td>Mode: M=Manual, forced to operate in 2D or 3D A=Automatic, 3D/2D</td></tr>
<tr> <td>${chars[2]}  </td> <td>Mode: 1=Fix not available 2=2D 3=3D</td></tr>
<tr> <td>${chars[3]}  </td> <td>ID1 of SVs used in position fix (null for unused fields)</td></tr>
<tr> <td>${chars[4]}  </td> <td>ID2 </td></tr>
<tr> <td>${chars[5]}  </td> <td>ID3</td></tr>
<tr> <td>${chars[6]}  </td> <td>ID4</td></tr>
<tr> <td>${chars[7]}  </td> <td>ID5</td></tr>
<tr> <td>${chars[8]}  </td> <td>ID6</td></tr>
<tr> <td>${chars[9]}  </td> <td>ID7</td></tr>
<tr> <td>${chars[10]} </td> <td>ID8</td></tr>
<tr> <td>${chars[11]} </td> <td>ID9</td></tr>
<tr> <td>${chars[12]} </td> <td>ID10</td></tr>
<tr> <td>${chars[13]} </td> <td>ID11</td></tr>        
<tr> <td>${chars[14]} </td> <td>ID12</td></tr>    
<tr> <td>${chars[15]} </td> <td>PDOP</td></tr>
<tr> <td>${chars[16]} </td> <td>HDOP</td></tr>        
<tr> <td>${chars[17]} </td> <td>VDOP</td></tr>   
</table>
<details>`);
};

const logToTerminalGPGGA = (message) => {
var chars = message.split(',');
  terminalContainer.insertAdjacentHTML('beforeend',
      `<details>
<summary> <div in class="in">${message}</div>  </summary>
<table> 
<tr> <td>${chars[0]}  </td> <td>Global Positioning System Fix Data</td></tr>
<tr> <td>${chars[1]}  </td> <td>timestamp</td></tr>
<tr> <td>${chars[2]}  </td> <td>Latitude of next waypoint</td></tr>
<tr> <td>${chars[3]}  </td> <td>North/South</td></tr>
<tr> <td>${chars[4]}  </td> <td>Longitude of next waypoint</td></tr>
<tr> <td>${chars[5]}  </td> <td>East/West</td></tr>
<tr> <td>${chars[6]}  </td> <td>True track to waypoint</td></tr>
<tr> <td>${chars[7]}  </td> <td>True Track</td></tr>
<tr> <td>${chars[8]}  </td> <td>Magnetic track to waypoint</td></tr>
<tr> <td>${chars[9]}  </td> <td>Magnetic</td></tr>
<tr> <td>${chars[10]} </td> <td>range to waypoint</td></tr>
<tr> <td>${chars[11]} </td> <td>unit of range to waypoint, N = Nautical miles</td></tr>
<tr> <td>${chars[12]} </td> <td>Waypoint name   </td></tr>
<tr> <td>${chars[13]} </td> <td>checksum          </td></tr>                                                            
</table><details>`);
};

const logToTerminalGPRMC = (message) => {
var chars = message.split(',');
  terminalContainer.insertAdjacentHTML('beforeend',
      `<details>
<summary> <div in class="in">${message}</div>  </summary>
<table> 
<tr> <td>${chars[0]}  </td> <td> Recommended minimum specific GPS/Transit data</td></tr>
<tr> <td>${chars[1]}  </td> <td> Time Stamp</td></tr>
<tr> <td>${chars[2]}  </td> <td> Navigation receiver warning A = OK, V = warning</td></tr>
<tr> <td>${chars[3]}  </td> <td> current Latitude</td></tr>
<tr> <td>${chars[4]}  </td> <td> North/South</td></tr>
<tr> <td>${chars[5]}  </td> <td> current Longitude</td></tr>
<tr> <td>${chars[6]}  </td> <td> East/West</td></tr>
<tr> <td>${chars[7]}  </td> <td> Speed in knots</td></tr>
<tr> <td>${chars[8]}  </td> <td> True course</td></tr>
<tr> <td>${chars[9]}  </td> <td> Date Stamp</td></tr>
<tr> <td>${chars[10]}  </td> <td> Variation</td></tr>
<tr> <td>${chars[11]}  </td> <td> East/West</td></tr>
<tr> <td>${chars[12]}  </td> <td> checksum</td></tr>

</table><details>`);

};

// Obtain configured instance.
const terminal = new BluetoothTerminal();

// Override `receive` method to log incoming data to the terminal.
terminal.receive = function(data) {
  logToTerminal(data, 'in');
};

// Override default log method to output messages to the terminal and console.
terminal._log = function(...messages) {
  // We can't use `super._log()` here.
  messages.forEach((message) => {
    logToTerminal(message);
    console.log(message); // eslint-disable-line no-console
  });
};

// Implement own send function to log outcoming data to the terminal.
const send = (data) => {
  terminal.send(data).
      then(() => logToTerminal(data, 'out')).
      catch((error) => logToTerminal(error));
};

// Bind event listeners to the UI elements.
connectButton.addEventListener('click', () => {
  terminal.connect().
      then(() => {
        deviceNameLabel.textContent = terminal.getDeviceName() ?
            terminal.getDeviceName() : defaultDeviceName;
      });
});

disconnectButton.addEventListener('click', () => {
  terminal.disconnect();
  deviceNameLabel.textContent = defaultDeviceName;
});

sendForm.addEventListener('submit', (event) => {
  event.preventDefault();

  send(inputField.value);

  inputField.value = '';
  inputField.focus();
});

// Switch terminal auto scrolling if it scrolls out of bottom.
terminalContainer.addEventListener('scroll', () => {
  const scrollTopOffset = terminalContainer.scrollHeight -
      terminalContainer.offsetHeight - terminalAutoScrollingLimit;

  isTerminalAutoScrolling = (scrollTopOffset < terminalContainer.scrollTop);
});
