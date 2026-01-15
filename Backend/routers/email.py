# routes/email.py
from fastapi import APIRouter
from fastapi_mail import FastMail, MessageSchema
from pydantic import BaseModel
from email_config import conf

router = APIRouter()

class EmailSchema(BaseModel):
    email: str

@router.post("/send-email")
async def send_email(data: EmailSchema):
    message = MessageSchema(
        subject="Booking Confirmation",
        recipients=[data.email],
        body="""
        Congratulations! Your Booking has been confirmed. 
        Thank you for visiting skyverse. Have a save flight.

        Regards,
        Team SkyVerse.
            """ ,
       
        subtype="plain"
    )
    fm = FastMail(conf)
    await fm.send_message(message)
    return {"message": "Email sent!"}
