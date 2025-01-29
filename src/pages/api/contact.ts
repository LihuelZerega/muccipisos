import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, lastname, email, phoneNumber,  message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIBER,
      subject: 'Nuevo Contacto de Potencial Cliente - Digincrease',
      html: `
        <h1>Nuevo Contacto de Potencial Cliente</h1>
        <p>Estimado equipo</p>
        <p>Hemos recibido los datos de un potencial cliente:</p>
        <p></p>
        <h4>Datos del Contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Apellido:</strong> ${lastname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phoneNumber}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Mensaje enviado correctamente' });
    } catch {
      res.status(500).json({ error: 'Error al enviar el mensaje' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
