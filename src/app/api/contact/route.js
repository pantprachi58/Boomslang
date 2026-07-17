import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeField(value) {
  return typeof value === "string" ? value.trim() : "";
}

function parseBoolean(value, fallback = false) {
  if (typeof value !== "string") {
    return fallback;
  }

  return value.toLowerCase() === "true";
}

function createTransporter() {
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error("Missing SMTP/EMAIL user or password environment variable.");
  }

  if (process.env.SMTP_HOST) {
    const secure = parseBoolean(process.env.SMTP_SECURE, true);

    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || (secure ? 465 : 587)),
      secure,
      auth: {
        user,
        pass,
      },
    });
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user,
      pass: pass.replace(/\s/g, ""),
    },
  });
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Please provide valid contact form data." },
        { status: 400 }
      );
    }

    const name = normalizeField(body.name);
    const email = normalizeField(body.email);
    const phone = normalizeField(body.phone);
    const subject = normalizeField(body.subject);
    const message = normalizeField(body.message);

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const transporter = createTransporter();
    const supportEmail = process.env.EMAIL_TO || process.env.EMAIL_USER;
    const fromEmail = process.env.SMTP_USER || process.env.EMAIL_USER;
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);
    const emailSubject = subject.replace(/[\r\n]+/g, " ").slice(0, 120);
    
    const mailOptions = {
      from: `"Boomslang Nutrition" <${fromEmail}>`,
      to: supportEmail,
      subject: `Contact Form: ${emailSubject}`,
      text: [
        "New Contact Form Submission",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        `Subject: ${subject}`,
        "",
        message,
      ].filter(Boolean).join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="background: #7cb729; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333; border-bottom: 2px solid #7cb729; padding-bottom: 10px;">Contact Details</h2>
            
            <div style="margin: 20px 0;">
              <p style="margin: 10px 0;"><strong style="color: #555; display: inline-block; width: 120px;">Name:</strong> <span style="color: #333;">${safeName}</span></p>
              <p style="margin: 10px 0;"><strong style="color: #555; display: inline-block; width: 120px;">Email:</strong> <span style="color: #333;">${safeEmail}</span></p>
              ${phone ? `<p style="margin: 10px 0;"><strong style="color: #555; display: inline-block; width: 120px;">Phone:</strong> <span style="color: #333;">${safePhone}</span></p>` : ""}
              <p style="margin: 10px 0;"><strong style="color: #555; display: inline-block; width: 120px;">Subject:</strong> <span style="color: #333;">${safeSubject}</span></p>
            </div>
            
            <div style="margin-top: 30px;">
              <h3 style="color: #333; border-bottom: 2px solid #7cb729; padding-bottom: 10px;">Message</h3>
              <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #7cb729;">
                <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
              </div>
            </div>
          </div>
          
          <div style="background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px;">
            <p style="margin: 0;">This email was sent from the Boomslang Nutrition contact form</p>
            <p style="margin: 5px 0 0 0; color: #999;">Received on ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      replyTo: { name, address: email },
    };

    const autoReplyOptions = {
      from: `"Boomslang Nutrition" <${fromEmail}>`,
      to: email,
      subject: "Thank You for Contacting Boomslang Nutrition",
      text: [
        `Thank you, ${name}!`,
        "",
        "Thank you for reaching out to Boomslang Nutrition. We've received your message and our team will get back to you within 24-48 hours.",
        "",
        `Subject: ${subject}`,
        "",
        message,
        "",
        "Boomslang Nutrition",
        "support@boomslangnutrition.com",
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="background: #7cb729; padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Thank You, ${safeName}!</h1>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Thank you for reaching out to <strong>Boomslang Nutrition</strong>. We've received your message and our team will get back to you within 24-48 hours.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #7cb729;">
              <h3 style="color: #333; margin-top: 0;">Your Message Summary:</h3>
              <p style="margin: 10px 0;"><strong style="color: #555;">Subject:</strong> ${safeSubject}</p>
              <p style="margin: 10px 0;"><strong style="color: #555;">Message:</strong></p>
              <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
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

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(autoReplyOptions);

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    if (error?.code === "EAUTH") {
      return NextResponse.json(
        { error: "Email login failed. Please check the server mail credentials." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
