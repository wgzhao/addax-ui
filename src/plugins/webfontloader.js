/**
 * plugins/webfontloader.js
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */
export async function loadFonts() {
  const webFontLoader = await import(/* webpackChunkName: "webfontloader" */ 'webfontloader')

  webFontLoader.load(
  {
    custom: {
      families: ['MiSans Regular', 'MiSans Light', 'MiSans Thin']
    }
  })
}
