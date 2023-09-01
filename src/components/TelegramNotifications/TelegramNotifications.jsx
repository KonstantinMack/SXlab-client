import "./TelegramNotifications.scss";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

import { API_URL, TELEGRAM_BOT_NAME } from "../../config";
import TelegramIcon from "../../assets/icons/telegram.svg";

export default function TelegramNotifications() {
  const { userId } = useAuth();

  const telegramQuery = useQuery(
    ["club-house", "telegram", userId],
    () => {
      return axios
        .get(`${API_URL}/tipster/is-subbed?address=${userId}`)
        .then((res) => res.data);
    },
    {
      enabled: !!userId,
    }
  );

  const clickHandler = () => {
    axios
      .delete(`${API_URL}/tipster/unsub`, {
        data: {
          address: userId,
        },
      })
      .then(() => {
        telegramQuery.refetch();
      });
  };

  if (!telegramQuery.data && userId) {
    return (
      <a
        className="tg__button"
        href={`https://t.me/${TELEGRAM_BOT_NAME}?start=${userId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={TelegramIcon} alt="telegram icon" className="tg-icon" />
        <p className="tg__button-text">Get bet notifications</p>
      </a>
    );
  } else {
    return (
      <button className="tg__button tg__button--stop" onClick={clickHandler}>
        <img src={TelegramIcon} alt="telegram icon" className="tg-icon" />
        <p className="tg__button-text">Stop notifications</p>
      </button>
    );
  }
}
