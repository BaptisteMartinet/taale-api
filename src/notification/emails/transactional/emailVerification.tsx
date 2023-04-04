import React from 'react';
import { ensureStylesType, renderEmailHTMLPage } from 'notification/emails/utils';
import { Header, Footer } from 'notification/emails/fragments';

export interface EmailValidationProps {
  code: string,
}

function EmailVerification(props: EmailValidationProps) {
  const { code } = props;
  return (
    <tbody>
      <Header />
      <tr>
        <td align="center" style={styles.codeInfo}>Use the following code to verify your email</td>
      </tr>
      <tr>
        <td align="center" style={styles.code}>{code}</td>
      </tr>
      <Footer />
    </tbody>
  );
}

export default function render(args: EmailValidationProps) {
  const { code } = args;
  return renderEmailHTMLPage({
    element: EmailVerification({ code }),
  });
}

const styles = ensureStylesType({
  codeInfo: {
    fontSize: '24px',
  },
  code: {
    fontSize: '48px',
    fontWeight: 'bold',
  },
});
