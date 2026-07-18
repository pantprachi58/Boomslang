import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const transactionRegex = /^[0-9]{12,}$/;
const COD_PREPAID_AMOUNT = 99;

function escapeHtml(value) {
  return String(value ?? "")
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

function formatPrice(amount) {
  return `₹ ${Number(amount || 0).toLocaleString("en-IN")}`;
}

function formatPaymentMethod(method) {
  return method === "cod" ? "Cash on Delivery" : "Full QR Payment";
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

function normalizeItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => ({
      name: normalizeField(item.name),
      variant: normalizeField(item.variant || item.description),
      quantity: Number(item.quantity),
      price: Number(item.price),
    }))
    .filter(
      (item) =>
        item.name &&
        Number.isFinite(item.quantity) &&
        item.quantity > 0 &&
        Number.isFinite(item.price) &&
        item.price >= 0
    );
}

function normalizeTotals(totals) {
  return {
    subtotal: Number(totals?.subtotal || 0),
    cgst: Number(totals?.cgst || 0),
    sgst: Number(totals?.sgst || 0),
    total: Number(totals?.total || 0),
  };
}

function buildAddress(delivery) {
  return [
    delivery.addressLine1,
    delivery.addressLine2,
    delivery.landmark ? `Landmark: ${delivery.landmark}` : null,
    `${delivery.city}, ${delivery.state} - ${delivery.pincode}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function renderItemsText(items) {
  return items
    .map(
      (item) =>
        `- ${item.name}${item.variant ? ` (${item.variant})` : ""}: ${item.quantity} x ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}`
    )
    .join("\n");
}

function renderItemsHtml(items) {
  return items
    .map(
      (item) => `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e5e5;">
            <strong style="color: #222;">${escapeHtml(item.name)}</strong>
            ${item.variant ? `<br><span style="color: #666; font-size: 13px;">${escapeHtml(item.variant)}</span>` : ""}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; text-align: center;">${item.quantity}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; text-align: right;">${formatPrice(item.price)}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; text-align: right;"><strong>${formatPrice(item.price * item.quantity)}</strong></td>
        </tr>
      `
    )
    .join("");
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Please provide valid checkout data." },
        { status: 400 }
      );
    }

    const delivery = {
      fullName: normalizeField(body.delivery?.fullName),
      email: normalizeField(body.delivery?.email),
      mobile: normalizeField(body.delivery?.mobile),
      pincode: normalizeField(body.delivery?.pincode),
      addressLine1: normalizeField(body.delivery?.addressLine1),
      addressLine2: normalizeField(body.delivery?.addressLine2),
      landmark: normalizeField(body.delivery?.landmark),
      city: normalizeField(body.delivery?.city),
      state: normalizeField(body.delivery?.state),
    };
    const items = normalizeItems(body.items);
    const totals = normalizeTotals(body.totals);
    const rawPaymentMethod = normalizeField(body.payment?.method);
    const payment = {
      method: rawPaymentMethod === "cod" ? "cod" : "prepaid",
      paidAmount: rawPaymentMethod === "cod" ? COD_PREPAID_AMOUNT : totals.total,
      upiTransactionId: normalizeField(body.payment?.upiTransactionId),
    };
    const amountDue = Math.max(totals.total - payment.paidAmount, 0);

    if (
      !delivery.fullName ||
      !delivery.email ||
      !delivery.mobile ||
      !delivery.pincode ||
      !delivery.addressLine1 ||
      !delivery.addressLine2 ||
      !delivery.city ||
      !delivery.state ||
      !payment.upiTransactionId ||
      items.length === 0
    ) {
      return NextResponse.json(
        { error: "Please fill in all required checkout fields." },
        { status: 400 }
      );
    }

    if (!emailRegex.test(delivery.email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!/^[0-9]{10}$/.test(delivery.mobile)) {
      return NextResponse.json(
        { error: "Please provide a valid 10 digit mobile number." },
        { status: 400 }
      );
    }

    if (!/^[0-9]{6}$/.test(delivery.pincode)) {
      return NextResponse.json(
        { error: "Please provide a valid 6 digit pincode." },
        { status: 400 }
      );
    }

    if (!transactionRegex.test(payment.upiTransactionId)) {
      return NextResponse.json(
        { error: "Please provide a minimum 12 digit UPI transaction ID." },
        { status: 400 }
      );
    }

    const transporter = createTransporter();
    const supportEmail = process.env.EMAIL_TO || process.env.EMAIL_USER || process.env.SMTP_USER;
    const fromEmail = process.env.SMTP_USER || process.env.EMAIL_USER;
    const orderId = `BN-${Date.now().toString(36).toUpperCase()}`;
    const address = buildAddress(delivery);
    const paymentMethodLabel = formatPaymentMethod(payment.method);
    const placedAt = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const supportMail = {
      from: `"Boomslang Nutrition" <${fromEmail}>`,
      to: supportEmail,
      subject: `New Checkout Order: ${orderId}`,
      text: [
        "New Checkout Order",
        "",
        `Order ID: ${orderId}`,
        `Placed At: ${placedAt}`,
        "",
        "Customer",
        `Name: ${delivery.fullName}`,
        `Email: ${delivery.email}`,
        `Mobile: ${delivery.mobile}`,
        "",
        "Delivery Address",
        address,
        "",
        "Payment",
        `Payment Method: ${paymentMethodLabel}`,
        `Paid Amount: ${formatPrice(payment.paidAmount)}`,
        `Amount Due on Delivery: ${formatPrice(amountDue)}`,
        `UPI Transaction ID: ${payment.upiTransactionId}`,
        "",
        "Items",
        renderItemsText(items),
        "",
        "Totals",
        `Subtotal: ${formatPrice(totals.subtotal)}`,
        `CGST (2.5%): ${formatPrice(totals.cgst)}`,
        `SGST (2.5%): ${formatPrice(totals.sgst)}`,
        `Total: ${formatPrice(totals.total)}`,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 720px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #7cb729; padding: 22px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Checkout Order</h1>
            <p style="color: white; margin: 8px 0 0;">${escapeHtml(orderId)} • ${escapeHtml(placedAt)}</p>
          </div>
          <div style="padding: 28px; background: #f9f9f9;">
            <h2 style="color: #222; border-bottom: 2px solid #7cb729; padding-bottom: 10px;">Customer Details</h2>
            <p><strong>Name:</strong> ${escapeHtml(delivery.fullName)}</p>
            <p><strong>Email:</strong> ${escapeHtml(delivery.email)}</p>
            <p><strong>Mobile:</strong> ${escapeHtml(delivery.mobile)}</p>

            <h2 style="color: #222; border-bottom: 2px solid #7cb729; padding-bottom: 10px; margin-top: 28px;">Delivery Address</h2>
            <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(address)}</p>

            <h2 style="color: #222; border-bottom: 2px solid #7cb729; padding-bottom: 10px; margin-top: 28px;">Payment</h2>
            <p><strong>Payment Method:</strong> ${escapeHtml(paymentMethodLabel)}</p>
            <p><strong>Paid Amount:</strong> ${formatPrice(payment.paidAmount)}</p>
            <p><strong>Amount Due on Delivery:</strong> ${formatPrice(amountDue)}</p>
            <p><strong>UPI Transaction ID:</strong> ${escapeHtml(payment.upiTransactionId)}</p>

            <h2 style="color: #222; border-bottom: 2px solid #7cb729; padding-bottom: 10px; margin-top: 28px;">Order Items</h2>
            <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
              <thead>
                <tr style="background: #eef7e2;">
                  <th style="padding: 12px; text-align: left;">Product</th>
                  <th style="padding: 12px; text-align: center;">Qty</th>
                  <th style="padding: 12px; text-align: right;">Price</th>
                  <th style="padding: 12px; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>${renderItemsHtml(items)}</tbody>
            </table>

            <div style="background: white; padding: 18px; border-radius: 8px; margin-top: 20px;">
              <p style="margin: 8px 0;"><strong>Subtotal:</strong> ${formatPrice(totals.subtotal)}</p>
              <p style="margin: 8px 0;"><strong>CGST (2.5%):</strong> ${formatPrice(totals.cgst)}</p>
              <p style="margin: 8px 0;"><strong>SGST (2.5%):</strong> ${formatPrice(totals.sgst)}</p>
              <p style="margin: 12px 0 0; font-size: 18px;"><strong>Total Amount:</strong> ${formatPrice(totals.total)}</p>
            </div>
          </div>
        </div>
      `,
      replyTo: { name: delivery.fullName, address: delivery.email },
    };

    const customerMail = {
      from: `"Boomslang Nutrition" <${fromEmail}>`,
      to: delivery.email,
      bcc: supportEmail,
      subject: `Your Boomslang Nutrition Order ${orderId}`,
      text: [
        `Thank you, ${delivery.fullName}!`,
        "",
        payment.method === "cod"
          ? "We have received your Cash on Delivery order details and ₹99 payment confirmation."
          : "We have received your checkout details and full payment confirmation.",
        "",
        `Order ID: ${orderId}`,
        `Placed At: ${placedAt}`,
        `Payment Method: ${paymentMethodLabel}`,
        `Paid Amount: ${formatPrice(payment.paidAmount)}`,
        `Amount Due on Delivery: ${formatPrice(amountDue)}`,
        `UPI Transaction ID: ${payment.upiTransactionId}`,
        "",
        "Items",
        renderItemsText(items),
        "",
        "Delivery Address",
        address,
        "",
        "Totals",
        `Subtotal: ${formatPrice(totals.subtotal)}`,
        `CGST (2.5%): ${formatPrice(totals.cgst)}`,
        `SGST (2.5%): ${formatPrice(totals.sgst)}`,
        `Total: ${formatPrice(totals.total)}`,
        "",
        "Boomslang Nutrition",
        "support@boomslangnutrition.com",
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 720px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #7cb729; padding: 28px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 26px;">Thank You, ${escapeHtml(delivery.fullName)}!</h1>
            <p style="color: white; margin: 10px 0 0;">We have received your order details.</p>
          </div>
          <div style="padding: 28px; background: #f9f9f9;">
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Your order has been captured for review. Our team will verify your ${payment.method === "cod" ? "₹99 Cash on Delivery booking" : "full UPI"} payment and contact you if anything else is needed.
            </p>
            <div style="background: white; padding: 18px; border-radius: 8px; border-left: 4px solid #7cb729; margin: 20px 0;">
              <p style="margin: 8px 0;"><strong>Order ID:</strong> ${escapeHtml(orderId)}</p>
              <p style="margin: 8px 0;"><strong>Placed At:</strong> ${escapeHtml(placedAt)}</p>
              <p style="margin: 8px 0;"><strong>Payment Method:</strong> ${escapeHtml(paymentMethodLabel)}</p>
              <p style="margin: 8px 0;"><strong>Paid Amount:</strong> ${formatPrice(payment.paidAmount)}</p>
              <p style="margin: 8px 0;"><strong>Amount Due on Delivery:</strong> ${formatPrice(amountDue)}</p>
              <p style="margin: 8px 0;"><strong>UPI Transaction ID:</strong> ${escapeHtml(payment.upiTransactionId)}</p>
            </div>

            <h2 style="color: #222; border-bottom: 2px solid #7cb729; padding-bottom: 10px;">Order Summary</h2>
            <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
              <thead>
                <tr style="background: #eef7e2;">
                  <th style="padding: 12px; text-align: left;">Product</th>
                  <th style="padding: 12px; text-align: center;">Qty</th>
                  <th style="padding: 12px; text-align: right;">Price</th>
                  <th style="padding: 12px; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>${renderItemsHtml(items)}</tbody>
            </table>

            <div style="background: white; padding: 18px; border-radius: 8px; margin-top: 20px;">
              <p style="margin: 8px 0;"><strong>Subtotal:</strong> ${formatPrice(totals.subtotal)}</p>
              <p style="margin: 8px 0;"><strong>CGST (2.5%):</strong> ${formatPrice(totals.cgst)}</p>
              <p style="margin: 8px 0;"><strong>SGST (2.5%):</strong> ${formatPrice(totals.sgst)}</p>
              <p style="margin: 12px 0 0; font-size: 18px;"><strong>Total Amount:</strong> ${formatPrice(totals.total)}</p>
            </div>

            <h2 style="color: #222; border-bottom: 2px solid #7cb729; padding-bottom: 10px; margin-top: 28px;">Delivery Details</h2>
            <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(address)}</p>
          </div>
          <div style="background: #333; color: white; padding: 20px; text-align: center;">
            <p style="margin: 0 0 8px; font-weight: bold;">Boomslang Nutrition</p>
            <a href="mailto:support@boomslangnutrition.com" style="color: #7cb729; text-decoration: none;">support@boomslangnutrition.com</a>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(supportMail);
    await transporter.sendMail(customerMail);

    return NextResponse.json(
      { message: "Order email sent successfully.", orderId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending checkout email:", error);

    if (error?.code === "EAUTH") {
      return NextResponse.json(
        { error: "Email login failed. Please check the server mail credentials." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send order email. Please try again later." },
      { status: 500 }
    );
  }
}
