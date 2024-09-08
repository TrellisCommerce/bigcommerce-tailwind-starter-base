Brought to you and maintained by [Trellis Commerce](https://trellis.co/) - A full-service eCommerce agency based in Boston, MA

Latest merged code from [Cornerstone v6.14.0](https://github.com/bigcommerce/cornerstone/releases/tag/6.14.0)

# Cornerstone + Tailwind CSS + Prettier BigCommerce Starter Theme

BigCommerce Cornerstone theme with Tailwind CSS &amp; Prettier integrations

The starter theme includes an integration of:

## [Tailwind CSS](https://tailwindcss.com/)

- [Configured](https://markustripp.medium.com/extend-shopify-dawn-theme-with-a-custom-tailwind-css-carousel-section-e3efe3ecf18e) to use `prefix: tw-` in order to not clash with Cornerstone's existing styles

## [Trellis' Prettier config](https://www.npmjs.com/package/@trelliscommerce/prettier-config) with Husky pre-commit hooks

- Formats JS, SCSS, & CSS whenever a git commit is made
- Setup your own VSCode to apply Prettier formatting when a file is saved (optional)

## Steps to Start Using this Starter Theme

1. Fork this repository, navigate to the directory, run `npm install`

2. After `npm install` has completed, run `npm run tailwind` to start the Tailwind `--watch` [command](https://tailwindcss.com/docs/installation).

## Stencil Push Your Theme

1. Create an [API token](https://support.bigcommerce.com/s/article/Store-API-Accounts?language=en_US#creating) with theme publishing permissions

2. To connect to your store, run `stencil init --url https://XXX.mybigcommerce.com --token XXX`

3. To pull down the configuration from the active theme on your live store and updates your local configuration, run `stencil pull`

4. To bundle your theme into a zip file and then push the theme to your BigCommerce store, run `stencil push`

## Common local development commands

1. Before beginning any work, it is good practice to pull down the latest changes from the BigCommerce Cornerstone theme:

```
git fetch upstream
git pull upstream main
```

2. Add upstream link if you get the error `fatal: 'upstream' does not appear to be a git repository` run: `git remote add upstream https://github.com/bigcommerce/cornerstone.git` or `git remote add upstream https://github.com/TrellisCommerce/bigcommerce-tailwind-starter-base.git` depending on which repository you want to pull updates from

3. Anytime you add a Tailwind CSS class (remember to prefix it with tw-), run the CLI tool to scan your template files for classes and build your CSS to assets/app.css:
   `npx tailwindcss -i ./assets/scss/tailwind-src.css -o ./assets/scss/tailwind.scss --watch`

- Run this command in a separate terminal so it will continue to run while you are developing.

# Cornerstone

![tests](https://github.com/bigcommerce/cornerstone/workflows/Theme%20Bundling%20Test/badge.svg?branch=master)

Stencil's Cornerstone theme is the building block for BigCommerce theme developers to get started quickly developing premium quality themes on the BigCommerce platform.

### Stencil Utils

[Stencil-utils](https://github.com/bigcommerce/stencil-utils) is our supporting library for our events and remote interactions.

## JS API

When writing theme JavaScript (JS) there is an API in place for running JS on a per page basis. To properly write JS for your theme, the following page types are available to you:

- "pages/account/addresses"
- "pages/account/add-address"
- "pages/account/add-return"
- "pages/account/add-wishlist"
- "pages/account/recent-items"
- "pages/account/download-item"
- "pages/account/edit"
- "pages/account/return-saved"
- "pages/account/returns"
- "pages/account/payment-methods"
- "pages/auth/login"
- "pages/auth/account-created"
- "pages/auth/create-account"
- "pages/auth/new-password"
- "pages/blog"
- "pages/blog-post"
- "pages/brand"
- "pages/brands"
- "pages/cart"
- "pages/category"
- "pages/compare"
- "pages/errors"
- "pages/gift-certificate/purchase"
- "pages/gift-certificate/balance"
- "pages/gift-certificate/redeem"
- "global"
- "pages/home"
- "pages/order-complete"
- "pages/page"
- "pages/product"
- "pages/search"
- "pages/sitemap"
- "pages/subscribed"
- "pages/account/wishlist-details"
- "pages/account/wishlists"

These page types will correspond to the pages within your theme. Each one of these page types map to an ES6 module that extends the base `PageManager` abstract class.

```javascript
export default class Auth extends PageManager {
  constructor() {
    // Set up code goes here; attach to internals and use internals as you would 'this'
  }
}
```

### JS Template Context Injection

Occasionally you may need to use dynamic data from the template context within your client-side theme application code.

Two helpers are provided to help achieve this.

The inject helper allows you to compose a JSON object with a subset of the template context to be sent to the browser.

```
{{inject "stringBasedKey" contextValue}}
```

To retrieve the parsable JSON object, just call `{{jsContext}}` after all of the `{{@inject}}` calls.

For example, to setup the product name in your client-side app, you can do the following if you're in the context of a product:

```html
{{inject "myProductName" product.title}}

<script>
  // Note the lack of quotes around the jsContext handlebars helper, it becomes a string automatically.
  var jsContext = JSON.parse({{jsContext}}); // jsContext would output "{\"myProductName\": \"Sample Product\"}" which can feed directly into your JavaScript

  console.log(jsContext.myProductName); // Will output: Sample Product
</script>
```

You can compose your JSON object across multiple pages to create a different set of client-side data depending on the currently loaded template context.

The stencil theme makes the jsContext available on both the active page scoped and global PageManager objects as `this.context`.

## Polyfilling via Feature Detection

Cornerstone implements [this strategy](https://philipwalton.com/articles/loading-polyfills-only-when-needed/) for polyfilling.

In `templates/components/common/polyfill-script.html` there is a simple feature detection script which can be extended to detect any recent JS features you intend to use in your theme code.

If any one of the conditions is not met, an additional blocking JS bundle configured in `assets/js/polyfills.js` will be loaded to polyfill modern JS features before the main bundle executes.

This intentionally prioritizes the experience of the 90%+ of shoppers who are on modern browsers in terms of performance, while maintaining compatibility (at the expense of additional JS download+parse for the polyfills) for users on legacy browsers.

## Static assets

Some static assets in the Stencil theme are handled with Grunt if required. This
means you have some dependencies on grunt and npm. To get started:

First make sure you have Grunt installed globally on your machine:

```
npm install -g grunt-cli
```

and run:

```
npm install
```

Note: package-lock.json file was generated by Node version 18 and npm version 9. The app supports Node 18 as well as multiple versions of npm, but we should always use those versions when updating package-lock.json, unless it is decided to upgrade those, and in this case the readme should be updated as well. If using a different version for node OR npm, please delete the package-lock.json file prior to installing node packages and also prior to pushing to github.

If updating or adding a dependency, please double check that you are working on Node version 18 and npm version 9 and run `npm update <package_name>` or `npm install <package_name>` (avoid running npm install for updating a package). After updating the package, please make sure that the changes in the package-lock.json reflect only the updated/new package prior to pushing the changes to github.

### Icons

Icons are delivered via a single SVG sprite, which is embedded on the page in
`templates/layout/base.html`. It is generated via a grunt task `grunt svgstore`.

The task takes individual SVG files for each icon in `assets/icons` and bundles
them together, to be inlined on the top of the theme, via an ajax call managed
by svg-injector. Each icon can then be called in a similar way to an inline image via:

```
<svg><use xlink:href="#icon-svgFileName" /></svg>
```

The ID of the SVG icon you are calling is based on the filename of the icon you want,
with `icon-` prepended. e.g. `xlink:href="#icon-facebook"`.

Simply add your new icon SVG file to the icons folder, and run `grunt svgstore`,
or just `grunt`.

#### License

(The MIT License)
Copyright (C) 2015-present BigCommerce Inc.
All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
