from fastapi_mail import FastMail, MessageSchema, ConnectionConfig

conf = ConnectionConfig(
    MAIL_USERNAME="saachikatti06@gmail.com",
    MAIL_PASSWORD="nbvz nafq thry ubnw",
    MAIL_FROM="saachikatti06@gmail.com",
    MAIL_SERVER="smtp.gmail.com",
    MAIL_PORT=587,
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True
)