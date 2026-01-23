const nodemailer = require('nodemailer');

// --- ROBUST EMAIL REGEX (Same as frontend for consistency) ---
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
// Receiver email jo message receive karega (Aapko isko .env se lena chahiye)
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL || "default_receiver@example.com";

// @desc    Send contact form email
// @route   POST /api/contact
const sendContactEmail = async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'Please fill all fields.' });
    }

    // --- BACKEND EMAIL VALIDATION ---
    if (!EMAIL_REGEX.test(email)) {
        // Agar validation fail ho to 400 status bhejenge
        return res.status(400).json({ message: 'Invalid email format provided. Email must be legitimate.' });
    }
    // ------------------------------------

    try {
        // 1. Nodemailer Transporter setup (using environment variables)
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS, 
            },
        });

        // 2. Email content
        const mailOptions = {
            from: `"${name}" <${email}>`, 
            to: RECEIVER_EMAIL, // Woh email jahan message aana chahiye (tumhara mail)
            subject: `New Contact Form: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                    <h2 style="color: #06b6d4;">New Message Received</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <hr style="border-top: 1px solid #eee;">
                    <h3 style="color: #333;">Message:</h3>
                    <p style="white-space: pre-wrap; background-color: #f8f8f8; padding: 15px; border-radius: 4px;">${message}</p>
                </div>
            `,
        };

        // 3. Send email
        const info = await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Message sent successfully!', messageId: info.messageId });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: 'Failed to send message. Check server logs (Nodemailer config/Auth).' });
    }
};

module.exports = { sendContactEmail };