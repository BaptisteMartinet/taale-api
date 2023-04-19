import type { Context } from 'core/context';

import React from 'react';
import { ensureStylesType, renderEmailHTMLPage } from 'notification/emails/utils';
import { Header, Footer } from 'notification/emails/fragments';
import texts from './texts';

export interface ForgotPasswordProps {
  code: string,
  ctx: Context,
}

function ForgotPassword(props: ForgotPasswordProps) {
  const { code, ctx } = props;
  const T = texts(ctx.locale);
  return (
    <tbody>
      <Header />
      <tr>
        <td align="center" style={styles.codeInfo}>{T.codeInfo}</td>
      </tr>
      <tr>
        <td align="center" style={styles.code}>{code}</td>
      </tr>
      <Footer />
    </tbody>
  );
}

export default function render(args: ForgotPasswordProps) {
  return renderEmailHTMLPage({
    element: ForgotPassword(args),
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
