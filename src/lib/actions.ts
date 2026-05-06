"use client"

const DEFAULT_WA_NUMBER = "6281292749915"; 

export const toWhatsApp = `https://api.whatsapp.com/send?phone=${DEFAULT_WA_NUMBER}`

export const scrollToContent = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
};