/* this function joins the room for patient by them clicking the call button */
import React, { useState } from 'react';
import DailyIframe from '@daily-co/daily-js';
import '../style.css'; // Ensure you import your CSS file

function CallInterface() {
  const [callFrame, setCallFrame] = useState(null); // Store the call frame object
  const roomURL = 'https://yiwen.daily.co/pipecat-test'; // Replace with your Daily room URL

    // Function to join the room
    const joinRoom = () => {
        if (!callFrame) {
        const newCallFrame = DailyIframe.createFrame({
            showLeaveButton: true,
            iframeStyle: {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            },
        });

        // Set up event listeners
        newCallFrame.on('joined-meeting', () => {
            console.log('User has joined the room.');
        });

        newCallFrame.on('left-meeting', () => {
            console.log('User has left the room.');
            newCallFrame.destroy();
            setCallFrame(null);
        });

        setCallFrame(newCallFrame);
        newCallFrame.join({ url: roomURL });
        }
    };

    // Function to leave the room (for the cancel button)
    const leaveRoom = () => {
        if (callFrame) {
        callFrame.leave(); // Leave the meeting
        console.log('User left the room');
        }
    };

   /* try {
        const response = await fetch('http://localhost:5000/get-room-url');
        const data = await response.json();
        const roomURL = data.room_url;

        const newCallFrame = DailyIframe.createFrame({
            showLeaveButton: true,
            iframeStyle: {
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
            },
        });

        setCallFrame(newCallFrame);
        newCallFrame.join({ url: roomURL });
    } catch (error) {
        console.error('Error fetching room URL:', error);
    }*/

  return (
    <div>
      <div className="call-container">
        {/* Call button */}
        <button className="call-button" onClick={joinRoom}>
          <img className="phone" src="/phone.svg" alt="phone" />
        </button>

        {/* Cancel button */}
        <button className="cancel-button" onClick={leaveRoom}>
          <img className="phone" src="/phone.svg" alt="phone" />
        </button>
      </div>
      
    </div>
  );
}

export default CallInterface;