import sgMail from '@sendgrid/mail';
import env from 'core/env';

sgMail.setApiKey(env.SENDGRID_API_KEY);

export default sgMail;
