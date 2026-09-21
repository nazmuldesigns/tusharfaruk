export interface TelegramNotificationPayload {
  name: string;
  email: string;
  message: string;
}

export async function sendTelegramNotification(
  payload: TelegramNotificationPayload
): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.log(
      "Telegram notification skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured."
    );
    return false;
  }

  const text = `🚀 *New Portfolio Contact Submission* 🚀\n\n` +
    `👤 *Name:* ${escapeMarkdown(payload.name)}\n` +
    `📧 *Email:* ${escapeMarkdown(payload.email)}\n` +
    `💬 *Message:*\n${escapeMarkdown(payload.message)}\n\n` +
    `🕒 *Time:* ${new Date().toLocaleString()}`;

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "MarkdownV2",
      }),
    });

    const data = await response.json();
    if (!response.ok || !data.ok) {
      console.error("Telegram API error:", data);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Failed to send Telegram notification:", error);
    return false;
  }
}

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");
}
