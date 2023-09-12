import "./FavStar.scss";
import axios from "axios";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import { API_URL } from "../../config";
import ModalComponent from "../ModalComponent/ModalComponent";
import { ReactComponent as StarIcon } from "../../assets/icons/star.svg";

export default function FavStar({ bettor }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [, userId, favourites, setFavourites] = useOutletContext();

  const clickHandler = (bettor) => {
    if (!userId) {
      setModalIsOpen(true);
      return;
    }

    if (favourites.includes(bettor)) {
      axios.delete(`${API_URL}/tipster/unstar`, {
        data: {
          address: userId,
          bettor,
        },
      });
      setFavourites((state) => state.filter((item) => item !== bettor));
    } else {
      axios.post(`${API_URL}/tipster/star`, {
        address: userId,
        bettor,
      });
      setFavourites((state) => [...state, bettor]);
    }
  };

  return (
    <>
      <ModalComponent modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
        Please sign in first in order to save your favourite tipsters.
      </ModalComponent>
      <StarIcon
        className={
          favourites.includes(bettor)
            ? "fav-star__icon fav-star__icon--selected"
            : "fav-star__icon"
        }
        onClick={() => clickHandler(bettor)}
      />
    </>
  );
}
