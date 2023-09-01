const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BACKEND_URL_PROD
    : process.env.REACT_APP_BACKEND_URL_DEV;

const TELEGRAM_BOT_NAME =
  process.env.NODE_ENV === "production" ? "sx_lab_bot" : "sx_lab_dev_bot";

export { API_URL, TELEGRAM_BOT_NAME };
