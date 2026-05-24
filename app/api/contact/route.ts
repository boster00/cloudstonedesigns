import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  serviceType?: string;
  projectLocation?: string;
  budget?: string;
  startDate?: string;
  message?: string;
  _hp?: string;
  [key: string]: string | undefined;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = (await req.json()) as ContactPayload;

  if (body._hp) {
    return NextResponse.json({ success: true });
  }

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  const lines = [
    `Name: ${body.name}`,
    `Email: ${body.email}`,
    body.phone ? `Phone: ${body.phone}` : null,
    body.serviceType ? `Service: ${body.serviceType}` : null,
    body.projectLocation ? `Location: ${body.projectLocation}` : null,
    body.budget ? `Budget: ${body.budget}` : null,
    body.startDate ? `Start: ${body.startDate}` : null,
    ``,
    body.message,
  ]
    .filter((l) => l !== null)
    .join("\n");

  try {
    await resend.emails.send({
      from: "Cloudstone Contact <onboarding@resend.dev>",
      to: "studio@cloudstonedesigns.com",
      replyTo: body.email,
      subject: `New inquiry from ${body.name}`,
      text: lines,
    });
  } catch (err) {
    console.error("[contact] resend error", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
