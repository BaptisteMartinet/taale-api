import type { Context } from 'core/context';

import React from 'react';
import { ensureStylesType, renderEmailHTMLPage } from 'notification/emails/utils';
import { Header, Footer } from 'notification/emails/fragments';
import texts from './texts';

export interface PasswordResetSuccessProps {
  ctx: Context,
}

function PasswordResetSuccess(props: PasswordResetSuccessProps) {
  const { ctx } = props;
  const T = texts(ctx.locale);
  return (
    <tbody>
      <Header />
      <tr>
        <td align="center" style={styles.body}>{T.body}</td>
      </tr>
      <Footer />
    </tbody>
  );
}

export default function render(args: PasswordResetSuccessProps) {
  return renderEmailHTMLPage({
    element: PasswordResetSuccess(args),
  });
}

const styles = ensureStylesType({
  body: {
    fontSize: '24px',
  },
});
