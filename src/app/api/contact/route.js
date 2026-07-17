import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Create transporter using Gmail
    // For production, use environment variables from .env.local
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "support@boomslangnutrition.com",
        pass: process.env.EMAIL_PASS || "gzst ejsv ekds zryx", // App-specific password
      },
    });

    // Email content to send to support
    const supportEmail = process.env.EMAIL_USER || "support@boomslangnutrition.com";
    
    const mailOptions = {
      from: supportEmail,
      to: supportEmail,
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="background: #7cb729; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333; border-bottom: 2px solid #7cb729; padding-bottom: 10px;">Contact Details</h2>
            
            <div style="margin: 20px 0;">
              <p style="margin: 10px 0;"><strong style="color: #555; display: inline-block; width: 120px;">Name:</strong> <span style="color: #333;">${name}</span></p>
              <p style="margin: 10px 0;"><strong style="color: #555; display: inline-block; width: 120px;">Email:</strong> <span style="color: #333;">${email}</span></p>
              ${phone ? `<p style="margin: 10px 0;"><strong style="color: #555; display: inline-block; width: 120px;">Phone:</strong> <span style="color: #333;">${phone}</span></p>` : ''}
              <p style="margin: 10px 0;"><strong style="color: #555; display: inline-block; width: 120px;">Subject:</strong> <span style="color: #333;">${subject}</span></p>
            </div>
            
            <div style="margin-top: 30px;">
              <h3 style="color: #333; border-bottom: 2px solid #7cb729; padding-bottom: 10px;">Message</h3>
              <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #7cb729;">
                <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
          </div>
          
          <div style="background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px;">
            <p style="margin: 0;">This email was sent from the Boomslang Nutrition contact form</p>
            <p style="margin: 5px 0 0 0; color: #999;">Received on ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      replyTo: email,
    };

    // Auto-reply email to the user
    const autoReplyOptions = {
      from: supportEmail,
      to: email,
      subject: "Thank You for Contacting Boomslang Nutrition",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="background: #7cb729; padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Thank You, ${name}!</h1>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Thank you for reaching out to <strong>Boomslang Nutrition</strong>. We've received your message and our team will get back to you within 24-48 hours.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #7cb729;">
              <h3 style="color: #333; margin-top: 0;">Your Message Summary:</h3>
              <p style="margin: 10px 0;"><strong style="color: #555;">Subject:</strong> ${subject}</p>
              <p style="margin: 10px 0;"><strong style="color: #555;">Message:</strong></p>
              <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              In the meantime, feel free to explore our range of premium ayurvedic supplements designed to support your fitness journey.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://boomslangnutrition.com/shop" style="display: inline-block; background: #7cb729; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">Browse Our Products</a>
            </div>
          </div>
          
          <div style="background: #333; color: white; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; font-weight: bold;">Boomslang Nutrition</p>
            <p style="margin: 5px 0; font-size: 12px; color: #999;">Premium Ayurvedic Supplements for Your Fitness Journey</p>
            <p style="margin: 10px 0 5px 0; font-size: 12px;">
              <a href="mailto:support@boomslangnutrition.com" style="color: #7cb729; text-decoration: none;">support@boomslangnutrition.com</a>
            </p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(autoReplyOptions);

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
