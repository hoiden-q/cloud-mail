import emailUtils from '../utils/email-utils';

function emailMsgTemplate(email4, tgMsgTo, tgMsgFrom, tgMsgText) {
  let template = `<b>${email4.subject}</b>`;
  if (tgMsgFrom === "only-name") {
    template += `

From\u200B\uFF1A${email4.name}`;
  }
  if (tgMsgFrom === "show") {
    template += `

From\u200B\uFF1A${email4.name}  &lt;${email4.sendEmail}&gt;`;
  }
  if (tgMsgTo === "show" && tgMsgFrom === "hide") {
    template += `

To\uFF1A\u200B${email4.toEmail}`;
  } else if (tgMsgTo === "show") {
    template += `
To\uFF1A\u200B${email4.toEmail}`;
  }
  const rawText = (email_utils_default.formatText(email4.text) || email_utils_default.htmlToText(email4.content)) || "";
if (tgMsgText === "show") {
    let text2 = rawText.substring(0, 3800);
    text2 = text2.replace(/\[image:.*?\]/g, "");
    text2 = text2.replace(/https?:\/\/[^\s]+/g, "");
    text2 = text2.replace(/[<>]/g, "");
    text2 = text2.trim();
    template += `\n\n<blockquote expandable>${text2}</blockquote>`;
  }
      return template;
}
