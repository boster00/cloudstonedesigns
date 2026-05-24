import { NextRequest, NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  _hp?: string;
  [key: string]: string | undefined;
};

export async function POST(req: NextRequest) {
  const body = (await req.json()) as ContactPayload;

  // Honeypot — reject bots silently
  if (body._hp) {
    return NextResponse.json({ success: true });
  }

  // Validate required fields
  if (!body.name || !body.email || !body.message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  // TODO: integrate Resend for transactional email
  // import { Resend } from "resend";
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({ from: "...", to: "studio@cloudstonedesigns.com", ... });

  console.log("[contact form submission]", {
    name: body.name,
    email: body.email,
    phone: body.phone,
    serviceType: body.serviceType,
    projectLocation: body.projectLocation,
    budget: body.budget,
    startDate: body.startDate,
    message: body.message,
  });

  return NextResponse.json({ success: true });
}
