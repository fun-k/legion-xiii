/*
 * Legion XIII — site configuration
 *
 * rosterEmbedUrl  The URL that gets embedded on roster.html.
 *   • Google Form:   open the form → Send → "<>" Embed → copy the src, e.g.
 *                    https://docs.google.com/forms/d/e/XXXX/viewform?embedded=true
 *   • Google Sheet:  File → Share → Publish to web → Embed → copy the src, e.g.
 *                    https://docs.google.com/spreadsheets/d/e/XXXX/pubhtml?widget=true&headers=false
 *
 * rosterOpenUrl   Optional. A normal link to the same form/sheet, shown as an
 *                 "Open in a new tab" fallback under the embed.
 */
window.LEGION_CONFIG = {
  rosterEmbedUrl: "",
  rosterOpenUrl: ""
};
