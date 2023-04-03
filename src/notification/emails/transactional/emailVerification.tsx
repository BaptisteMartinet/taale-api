import React from 'react';
import { renderEmailHTMLPage } from 'notification/emails/utils';

export interface EmailValidationProps {
  code: string,
}

function EmailVerification(props: EmailValidationProps) {
  const { code } = props;
  return (
    <tbody>
      <tr>
        <td align="center" style={{ textAlign: 'center' }}>Here is your verification code:</td>
      </tr>
      <tr>
        <td align="center" style={{ textAlign: 'center' }}>{code}</td>
      </tr>
    </tbody>
  );
}

export default function render(args: EmailValidationProps) {
  const { code } = args;
  return renderEmailHTMLPage({
    element: EmailVerification({ code }),
  });
}
