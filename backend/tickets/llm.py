import os

from dotenv import load_dotenv

load_dotenv() 

from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def classify_ticket(text):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Classify IT support tickets."},
            {"role": "user", "content": text}
        ],
        temperature=0
    )

    return response.choices[0].message.content