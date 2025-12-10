"use client";
import { FloatingWhatsApp } from "react-floating-whatsapp";

export default function WhatsAppButton() {
    return (
        <FloatingWhatsApp
            phoneNumber="+56999999999" // tu número con código de país
            accountName="Cocofit"
            avatar="" // opcional: logo o imagen en public/
            statusMessage=""
            chatMessage="¡Hola! 👋 ¿Que estas buscando?"
            placeholder="Escribe tu mensaje..."
            notification
            notificationSound
        />
    );
}