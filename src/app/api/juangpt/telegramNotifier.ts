import TelegramBot from 'node-telegram-bot-api';

export default function sendTelegramNotification(prompt: string, response: string) {
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    try {
        const message = "New JuanGPT submission\! Details as follows:\n\n" +
            "\# Prompt:\n" +
            prompt +
            "\n" +
            "\# Response\n" +
            response;

        if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
            console.info("Notification not sent because either bot token or chat ID is not present in env variables.")
            return;
        }

        const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, {polling: false});
        bot.sendMessage(TELEGRAM_CHAT_ID, message, {parse_mode: "Markdown"})

    } catch (e) {
        console.error(`Error sending message to Telegram\n${e}`)
    }

}