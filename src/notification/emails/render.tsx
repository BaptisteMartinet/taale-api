import type { ReactElement } from 'react';

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ensureStylesType } from './utils';

export interface RenderEmailArgs {
  title?: string;
  element: ReactElement;
}

export default function renderEmail(args: RenderEmailArgs) {
  const { title, element } = args;
  const doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
  const html = renderToStaticMarkup(
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,900;1,400;1,900&display=swap" rel="stylesheet" />
        {title && <title>{title}</title>}
      </head>
      <body style={styles.body}>
        <main>
          <table style={styles.table}>
            {element}
          </table>
        </main>
      </body>
    </html>
  );
  return [doctype, html].join('\n');
}

const styles = ensureStylesType({
  body: {
    margin: 0,
    padding: 0,
    fontFamily: 'Roboto, Arial, sans-serif',
    fontWeight: 400,
  },
  table: {
    width: '100%',
    border: 0,
  },
});
