import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function test() {
  try {
    const data = await resend.emails.send({
      from: 'Hurain Technologies <onboarding@resend.dev>',
      to: 'shahnavazsyed11@gmail.com',
      subject: 'Test email',
      html: '<p>Testing resend sandbox</p>'
    });
    console.log("Success:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

test();
