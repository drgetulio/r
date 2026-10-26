const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const src = __dirname;
  const out = process.argv[2] || __dirname;
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('file://' + path.join(src, 'cover.html'));
  await p.pdf({ path: out + '/cover.pdf', format: 'A4', printBackground: true, preferCSSPageSize: true });
  await p.goto('file://' + path.join(src, 'body.html'));
  await p.evaluate(() => document.fonts.ready);
  const foot = `<div style="width:100%;font-family:Inter,sans-serif;font-size:7.5pt;color:#8a8178;padding:0 16mm;display:flex;justify-content:space-between;">
    <span>Elite Knight do nível 230 ao 300 · Dez estratégias de progressão</span><span><span class="pageNumber"></span></span></div>`;
  await p.pdf({ path: out + '/body.pdf', format: 'A4', printBackground: true, preferCSSPageSize: true,
    displayHeaderFooter: true, headerTemplate: '<div></div>', footerTemplate: foot });
  await b.close();
})();
