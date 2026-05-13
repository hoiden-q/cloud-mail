import emailUtils from '../utils/email-utils';

export default function emailMsgTemplate(email, tgMsgTo, tgMsgFrom, tgMsgText) {

    let template = `<b>${email.subject}</b>`

    if (tgMsgFrom === 'only-name') {
        template += `\n\nFrom\u200B：${email.name}`
    }

    if (tgMsgFrom === 'show') {
        template += `\n\nFrom\u200B：${email.name}  &lt;${email.sendEmail}&gt;`
    }

    if (tgMsgTo === 'show' && tgMsgFrom === 'hide') {
        template += `\n\nTo：\u200B${email.toEmail}`
    } else if (tgMsgTo === 'show') {
        template += `\nTo：\u200B${email.toEmail}`
    }

    if (tgMsgText === 'show') {
        // 1. 获取原始文本并进行基础清洗
        let cleanedText = (emailUtils.formatText(email.text) || emailUtils.htmlToText(email.content)) || "";

        // 2. 正则过滤：删除图片占位符、删除所有链接、删除残留尖括号
        cleanedText = cleanedText
            .replace(/\[image:.*?\]/g, "")    // 剔除 [image: xxx]
            .replace(/https?:\/\/[^\s]+/g, "") // 剔除 http/https 链接
            .replace(/[<>]/g, "")             // 剔除 < 和 > 防止解析错误
            .trim();

        // 3. 长度截断与动态折叠判断
        const finalText = cleanedText.substring(0, 3800);

        if (finalText.length > 300) {
            // 长文本：套用可折叠引用
            template += `\n\n<blockquote expandable>${finalText}</blockquote>`;
        } else {
            // 中短文本：直接平铺展示
            template += `\n\n${finalText}`;
        }
    }

    return template;
}
