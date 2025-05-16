import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const body = await req.json();
    const { playerName, contactNumber, role, dateOfJoining, gameName, clubName } = body;

    if (!playerName || !contactNumber || !role) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), {
        status: 400,
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Player Registration - ${playerName}`,
      html: `
        <h2>New Volleyball Player Registration</h2>
        <p><strong>Player Name:</strong> ${playerName}</p>
        <p><strong>Contact Number:</strong> ${contactNumber}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Date of Joining:</strong> ${dateOfJoining || 'N/A'}</p>
        <p><strong>Game:</strong> ${gameName || 'Volleyball'}</p>
        <p><strong>Club:</strong> ${clubName || 'MYM'}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'Form submitted successfully! Email sent.' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Email sending error:', error);
    return new Response(JSON.stringify({ message: 'Something went wrong. Please try again.' }), {
      status: 500,
    });
  }
}
