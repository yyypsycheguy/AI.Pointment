from flask import Flask, render_template, request
import google.generativeai as genai
from supabase import Client, create_client
import datetime
import json
import os
from dotenv import load_dotenv

PATIENT_INFOS = {
    "first_name": "null",
    "last_name": "null",
    "security_number": "null",
    "email": "null"
}

CONVERSATION_SUMMARY = {}
    

# Load environment variables from the .env file
load_dotenv()

# Flask application setup
app = Flask(__name__)

# Environment variables
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Configure Generative AI
genai.configure(api_key=GOOGLE_API_KEY)

# Configure Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)



# Global prompt for the AI assistant
today_date = datetime.date.today()
BASE_PROMPT = f"""
You are a useful assistant for appointment scheduling. Today's date is {today_date} (YEAR-MONTH-DAY).
Provided patient information: {{
    "first_name": "null",
    "last_name": "null",
    "social_security_number": "null",
    "email": "null"
}}.

Output format is JSON:
{{
    "action": "null"
}}

Valid actions:
- "register_patient"
- "get_doctor_id"
- "None" (if no action is required).

EXAMPLES:
- USER: "Can I have information on the availability of Dr. House?"
- AI: {{
        "action": "get_doctor_id"
        }}

- USER: "I think I have an appointment with Dr. Clark from the radiology department."
- AI: {{
        "action": "get_doctor_id"
        }}
        
- USER "I am a new patient, my name is John Doe, I was born on 1990-01-01, my phone number is 123-456-7890, and my email is js@gmail.com"
- AI: {{
        "action": "register_patient"
        }}
        
- USER "Hello, how are you today?"
- AI: {{
        "action": "None"
        }}
        
- USER "I want a blue car."
- AI: {{
        "action": "None"
        }}

Ensure all JSON fields are present and the JSON format is repspected.
"""

register_patient_prompt = f"""
You are a useful assistant for appointment scheduling. Today's date is {today_date} (YEAR-MONTH-DAY).
Provided the following informations about the patient : {PATIENT_INFOS}
and the sum up of the conversation with him : {CONVERSATION_SUMMARY}

Output format is JSON:
{{
    "first_name": "null",
    "last_name": "null",
    "date_of_birth": "null",
    "phone_number": "null",
    "email": "null",
    "address": "null"
}}

EXAMPLES:
- USER "I am a new patient, my name is John Doe, I was born on 1990-01-01, my phone number is 123-456-7890, and my email is jd@gmail.com"
- AI: {{
        "first_name": "John",
        "last_name": "Doe",
        "date_of_birth": "1990-01-01",
        "phone_number": "123-456-7890",
        "email": "jd@gmail.com",
        "address": "null"
        }}
        
- USER "I've never been to your clinic before, my name is Jane Smith, I was born on 1985-05-05, my phone number is 987-654-3210, i live in Paris, and my email is triki@yopmail.com"
- AI: {{
        "first_name": "Jane",
        "last_name": "Smith",   
        "date_of_birth": "1985-05-05",
        "phone_number": "987-654-3210",
        "email": "triki@yopmail.com"
        "address": "Paris"
}}

Give the information in the json in the same order as the example, if you do not have the information, put null in the json.
YOU MUST RESPECT THE FORMAT OF THE JSON AND OUTPUT A JSON OBJECT.
"""

get_doctor_id_prompt = f"""
You are a useful assistant for appointment scheduling. Today's date is {today_date} (YEAR-MONTH-DAY).
Provided the following informations about the patient : {PATIENT_INFOS}
and the sum up of the conversation with him : {CONVERSATION_SUMMARY}

Output format is JSON:
{{
    "doctor_first_name": "null",
    "doctor_last_name": "null",
    "specialty": "null"
}}

EXAMPLES:
- USER "Can I have information on the availability of Dr. House?"
- AI: {{
        "doctor_first_name": "null",
        "doctor_last_name": "House",
        "specialty": "null"
        }}

- USER "I think I have an appointment with Dr. Clark from the radiology department."
- AI: {{
        "doctor_first_name": "null",
        "doctor_last_name": "Clark",
        "specialty": "radiology"
        }}

Give the information in the json in the same order as the example, if you do not have the information, put null in the json.
YOU MUST RESPECT THE FORMAT OF THE JSON AND OUTPUT A JSON OBJECT.
"""

get_availabilities_prompt = f"""
You are a useful assistant for appointment scheduling. Today's date is {today_date} (YEAR-MONTH-DAY).
Provided the following informations about the patient : {PATIENT_INFOS}
and the sum up of the conversation with him : {CONVERSATION_SUMMARY}

Your goal is to provide the availabilities of the doctor based on the patient's request.

Output format is JSON:
{{
    "doctor_first_name": "null",
    "doctor_last_name": "null",
    "specialty": "null",
    "start_date": "null",
    "end_date": "null"
}}

EXAMPLES:
- USER "Can I have information on the availability of Dr. House?"
- AI: {{
        "doctor_first_name": "null",
        "doctor_last_name": "House",
        "specialty": "null",
        "start_date": "null",
        "end_date": "null"
        }}

- USER "I am available on Monday and Wednesday, can I have an appointment with Dr. Clark from the radiology department?"
- AI: {{
        "doctor_first_name": "null",
        "doctor_last_name": "Clark",
        "specialty": "radiology",
        "start_date": "Monday",
        "end_date": "Wednesday"
        }}

- USER "I would like to meet a doctor who is available on Friday."
- AI: {{
        "doctor_first_name": "null",
        "doctor_last_name": "null",
        "specialty": "null",
        "start_date": "Friday",
        "end_date": "Friday"
        }}

Give the information in the json in the same order as the example, if you do not have the information, put null in the json.
YOU MUST RESPECT THE FORMAT OF THE JSON AND OUTPUT A JSON OBJECT.
"""

# Utility functions
def generate_response(question: str, prompt: str = BASE_PROMPT, model_name = "gemini-pro"):
    model = genai.GenerativeModel(model_name)
    response = model.generate_content([prompt, question])
    for _ in range(3): # Try 3 times to get a valid JSON response
        try:
            # Parse JSON to ensure the structure is valid
            return json.loads(response.text)
        except json.JSONDecodeError:
            pass
    print("Invalid JSON response from AI.")
    print(response.text)
    return {"action": "None"}

def create_patient_json(first_name, last_name, dob, phone, email, address):
    """
    Create a structured JSON for patient data.
    """
    return {
        "first_name": first_name,
        "last_name": last_name,
        "date_of_birth": dob,
        "phone_number": phone,
        "email": email,
        "address": address
    }

def insert_patient(data: dict):
    """
    Insert a new patient record into the database.
    """
    try:
        supabase.table("patients").insert(data).execute()
        return "Patient successfully added."
    except Exception as e:
        return f"Error adding patient: {str(e)}"

def fetch_doctor_id(filters: dict):
    """
    Fetch a doctor's ID based on provided filters.
    """
    query = supabase.table("doctors").select("doctor_id")
    if "first_name" in filters:
        query = query.eq("first_name", filters["first_name"])
    if "last_name" in filters:
        query = query.eq("last_name", filters["last_name"])
    if "specialty" in filters:
        query = query.eq("specialty", filters["specialty"])
    
    response = query.execute()
    return response.data[0]["doctor_id"] if response.data else "Doctor not found."

# Routes
@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        user_input = request.form.get("user_input")
        ai_response = generate_response(user_input)
        with open("ai_response.json", "w") as f:
            f.write(json.dumps(ai_response, indent=4))
        try:
            response_json = ai_response
            action = response_json.get("action", "None")

            if action == "register_patient":
                # Register patient
                ai_response = generate_response(user_input, register_patient_prompt)
                response_json = ai_response
                
                patient_data = create_patient_json(
                    response_json.get("first_name", "null"),
                    response_json.get("last_name", "null"),
                    response_json.get("date_of_birth", "null"),
                    response_json.get("phone_number", "null"),
                    response_json.get("email", "null"),
                    response_json.get("address", "null")
                )
                result = insert_patient(patient_data)
            
            elif action == "get_doctor_id":
                ai_response = generate_response(user_input, get_doctor_id_prompt)
                response_json = ai_response
                # Get doctor ID
                filters = {
                    "first_name": response_json.get("doctor_first_name", "null"),
                    "last_name": response_json.get("doctor_last_name", "null"),
                    "specialty_id": response_json.get("specialty", "null")
                }
                result = fetch_doctor_id(filters)
            
            else:
                result = "No valid action detected."

            return render_template("index.html", user_input=user_input, ai_response=ai_response, result=result)

        except json.JSONDecodeError:
            return render_template("index.html", user_input=user_input, ai_response=ai_response, error="Invalid JSON from AI.")

    return render_template("index.html")

# Entry point
if __name__ == "__main__":
    app.run(debug=True)
