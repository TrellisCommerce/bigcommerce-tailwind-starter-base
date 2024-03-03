const fs = require('fs');
const BigCommerceStore = require('./client');

async function main() {
  if (
    !fs.existsSync('secrets.stencil.json') ||
    !fs.existsSync('config.stencil.json')
  )
    throw new Error('Configuration is missing, run `stencil init` first.');

  const token = JSON.parse(
    fs.readFileSync('secrets.stencil.json', 'utf8'),
  ).accessToken;

  const storeUrl = new URL(
    JSON.parse(fs.readFileSync('config.stencil.json', 'utf8')).normalStoreUrl,
  );
  const hash = storeUrl.hostname.split('.')[0].split('-')[1];

  const store = new BigCommerceStore(hash, token);

  try {
    await store.get('v2/store');
  } catch (e) {
    throw new Error(
      'Hash or token are invalid. Ensure "normalStoreUrl" within config.stencil.json uses "store-XXX.mybigcommerce" formatted URL. API token must have widget, theme & information access.',
    );
  }

  const widgetContent = (await store.getAll('v3/content/widgets')).map(
    ({ widget_configuration }) => widget_configuration,
  );

  fs.writeFileSync(
    'widgets/content.json',
    JSON.stringify(widgetContent, null, 2),
  );
}

main();
