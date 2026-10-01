import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';
const smtpUser = process.env.SMTP_USER || 'contacto@ar-sa.com.mx';
const contactEmail = process.env.CONTACT_TO_EMAIL || 'ing.juanlopezsa@gmail.com';

app.use(cors());
app.use(express.json());

// En producción, servir los archivos estáticos de Angular
if (isProduction) {
  const distPath = path.resolve(__dirname, '..', 'dist', 'arsa-landing');
  app.use(express.static(distPath));
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.zoho.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE !== 'false',
  auth: {
    user: smtpUser,
    pass: process.env.SMTP_PASS,
  },
});

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

app.post('/api/send-diagnostic', async (req, res) => {
  try {
    const { name, company, email, service, problem } = req.body;

    if (!name || !email || !problem) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const serviceLabels = {
      legacy: 'Modernización de sistema legacy',
      automation: 'Automatización de procesos',
      web: 'Plataforma web empresarial',
      desktop: 'Sistema de escritorio',
      mobile: 'Aplicación móvil',
      integration: 'Integración de sistemas / APIs',
      consulting: 'Consultoría técnica',
      other: 'Otro',
    };

    const serviceText = serviceLabels[service] || service || 'No especificado';
    const safeName = escapeHtml(name);
    const safeCompany = escapeHtml(company || 'No especificada');
    const safeEmail = escapeHtml(email);
    const safeService = escapeHtml(serviceText);
    const safeProblem = escapeHtml(problem).replaceAll('\n', '<br>');

    const mailOptions = {
      from: smtpUser,
      to: contactEmail,
      replyTo: email,
      subject: `Nuevo diagnóstico técnico de ${name}`,
      html: `
        <h2>Nuevo diagnóstico técnico</h2>
        <p><strong>Nombre:</strong> ${safeName}</p>
        <p><strong>Empresa:</strong> ${safeCompany}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Servicio:</strong> ${safeService}</p>
        <p><strong>Problema:</strong></p>
        <p>${safeProblem}</p>
        <hr />
        <p style="color: #666;">Enviado desde arsa-landing</p>
      `,
      text: [
        'Nuevo diagnóstico técnico',
        `Nombre: ${name}`,
        `Empresa: ${company || 'No especificada'}`,
        `Email: ${email}`,
        `Servicio: ${serviceText}`,
        `Problema: ${problem}`,
      ].join('\n'),
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Diagnóstico enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).json({ error: 'Error al enviar el correo' });
  }
});

// En producción, todas las rutas no-API van al index.html (SPA)
if (isProduction) {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'dist', 'arsa-landing', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Servidor ARSA corriendo en puerto ${PORT} [${isProduction ? 'PROD' : 'DEV'}]`);
});
