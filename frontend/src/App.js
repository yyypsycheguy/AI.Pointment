import React from 'react';
import './style.css';
import './index.css';
import CallInterface from './component/join_room.js';

const App = () => {
return(
    <div className='home'>
    
        <div className='flex-container'>
            <div className='left-item'>
                <div className='white-box'>
                    <div className='white-box-text-container'>
                        <div className='BookUaPointem'>AI.Pointment</div>
                        <div className='explanation'>Your AI intelligent appointment assistant :  for institutions & hospitals. Help users change appointments easily in no more than 5 minutes.</div>
                    </div>
                </div>

                <div className='info-box'>
                    <div className='info-container'>
                        <img className='svg' src='/info.svg' alt='svg'></img>
                        <div className='info'>Information:</div>
                    </div>

                    <img className='line1' src='/Line1.png' alt='line1'></img>

                    <div className='first-name1'>First Name:</div>
                    
                    <input type='text' placeholder='Enter first name' className='first-name-input'></input>

                    <div className='first-name'>Last Name:</div>
                    
                    <input type='text' placeholder='Enter last name' className='first-name-input'></input>

                    <div className='first-name'>Phone Number:</div>
                    
                    <input type='text' placeholder='Enter number' className='first-name-input'></input>

                    <div className='first-name'>Email Address:</div>
                    
                    <input type='text' placeholder='Enter email' className='address-input'></input>

                    <div className='first-name'>Address:</div>
                    
                    <input type='text' placeholder='Enter address' className='address-input'></input>

                    <img className='line1' src='/Line1.png' alt='line1'></img>

                    
                    <button className='registration-button'>Patient Registration</button>

                    <img className='line1' src='/Line1.png' alt='line1'></img>

                    <CallInterface />

                    {/*<div className='call-container'>
                        <button className='call-button' onClick={{joinRoom}}>
                            <img className='phone' src='/phone.svg' alt='phone'></img>
                        </button>
                        <button className='cancel-button'>
                            <img className='phone' src='/phone.svg' alt='phone'></img>
                        </button>
                    </div>*/}
                    
                </div>

                <div className='side-bar-text-container'>
                    <div className='side-bar-text-title'>The Power Behind Our AI Driven Appointment Assistant:</div>
                        <div className='side-bar-text'>
                        The Power Behind Our AI-Driven Appointment Assistant

                        <br /><br />Our AI-powered appointment assistant uses Google Cloud infrastructure to handle data storage, enabling our app respond instantly to user needs. Google Gemini powers the AI itself delivering responses that are enhanced by the LLM's responses.
                        <br /><br />To build and refine our app’s core functionality, we leverage several cutting-edge open-source frameworks. Pipecat orchestrates our AI pipelines, facilitating smooth interactions between various components, while Daily provides a powerful interface for real-time audio and video communication, ensuring the assistant responds naturally and accurately. For voice processing, we integrated Whisper(open source) for efficient transcription, ensuring all voice inputs are seamlessly translated into text for further analysis by the LLM.

                        <br /><br />Together, these frameworks and tools create an agile, high-performance app that pushes the boundaries of what’s possible in AI-driven appointment management. </div>
                    </div>
            </div>

            <div className='right-item'>

                <div className='bar'>
                    <div className='bar-text1'>Who are we: About the technology</div>
                    <div className='bar-text2'>User Guide</div>
                </div>

                <div className='slogan'>
                    SHE TAKES CARE 
                    OF YOUR APPOINTMENTS.
                </div>

                <div className='paragraph1'>
                    <div className='p1-title'>
                    Model & APP architecture: Introducing Our AI-Powered Appointment Assistant
                    </div>
                    <div className='p1-text'>
                        Welcome to your seamless appointment management solution! <br /><br />
                        Powered by advanced AI technology, our application connects 
                        <span className='bold'> Gemini configured with medical appointment prompts</span> with the interface. This allows the AI to deliver responses that are not only detailed but also highly accurate, drawing on relevant information to help you modify your appointments efficiently.
                        <br /><br />Here’s how it works: When you call, the system instantly captures and processes your voice input through 
                        <span className='bold'> Google Speech-to-Text</span>, transforming it into text for our AI assistant to analyze. Based on tailored prompts, the AI then generates a response in text and 
                         response needed is retreived from the database, while 
                        <span className='bold'> Whisper</span> converts it back into audio, giving you a natural and conversational experience.
                        From rescheduling to clarifying details, our AI assistant handles your requests swiftly, adapting to any appointment-related inquiries with ease.
                    </div>
                </div>

                <img className='diagram' src='/diagram.png' alt='diagram'></img>
                <div className='paragraph1'>
                    <div className='p1-title'>
                        User Guide: Quick & Easy Appointment Management
                    </div>
                    <div className='p1-text'>
                        Getting started is simple! <br /><br />

                        To make your first appointment, click <span className='bold'> “Register Appointment”</span> to fill out the required information for initial registration. Once registered, modifying an appointment is just as easy. Whenever you need a change, scroll to the bottom of our homepage and <span className='bold'> click the “Call” button to speak directly with our AI Appointment Assistant.</span>

                        <br /><br />During the call, the assistant will confirm a few details to ensure a smooth and efficient update to your appointment. With our AI-powered solution, managing your schedule is now faster, easier, and more flexible than ever! No need to listen to the monotonic questions to press number keys, no need to wait hours for the human client service to pick up!
                    </div>
                </div>

                <div className='copy-right-container'>
                    <img className='line2' src='/Line1.png' alt='line1'></img>
                    <div className='copyright'>
                        2024 GCPU hackathon
                        ©Copyright designed by team ESSEC
                    </div>
                </div>
                
            </div>

        

        </div>
    </div>

);
}
export default App;
