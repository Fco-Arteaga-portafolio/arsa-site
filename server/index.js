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
    user: process.env.SMTP_USER || 'contacto@ar-sa.com.mx',
    pass: process.env.SMTP_PASS,
  },
});

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

    const mailOptions = {
      from: 'contacto@ar-sa.com.mx',
      to: 'contacto@ar-sa.com.mx',
      subject: `Nuevo diagnóstico técnico de ${name}`,
      html: `
        <h2>Nuevo diagnóstico técnico</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Empresa:</strong> ${company || 'No especificada'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Servicio:</strong> ${serviceText}</p>
        <p><strong>Problema:</strong></p>
        <p>${problem}</p>
        <hr />
        <p style="color: #666;">Enviado desde arsa-landing</p>
      `,
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
