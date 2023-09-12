import "./BetHistoryButton.scss";

import { useState, useRef } from "react";
import { CSVLink } from "react-csv";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FileTextIcon, SymbolIcon } from "@radix-ui/react-icons";
import ModalComponent from "../ModalComponent/ModalComponent";
import { API_URL } from "../../config";

export default function BetHistoryButton({ address }) {
  const [, userId, ,] = useOutletContext();
  const linkRef = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { isFetching, data, refetch } = useQuery(
    ["bet-history", address],
    () => {
      return axios
        .get(`${API_URL}/user-stats/address/bet-history?address=${address}`)
        .then((res) => res.data);
    },
    {
      staleTime: 1000 * 60 * 5,
      enabled: false,
      initialData: [],
    }
  );

  const clickHandler = () => {
    if (!userId) {
      setModalIsOpen(true);
      return;
    }
    if (data.length === 0) {
      refetch().then(() => {
        setTimeout(() => {
          linkRef.current.link.click();
        }, 100);
      });
    } else {
      linkRef.current.link.click();
    }
  };

  return (
    <div className="history__wrapper">
      <ModalComponent modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
        Please log in first to download bet history
      </ModalComponent>
      {isFetching && <div>{isFetching}</div>}
      {!isFetching ? (
        <button className="history__button" onClick={clickHandler}>
          <FileTextIcon />
          <p className="history__button-text">Download CSV</p>
        </button>
      ) : (
        <button className="history__button history__button--loading" disabled>
          <SymbolIcon />
          <p className="history__button-text">Fetching data...</p>
        </button>
      )}
      <CSVLink
        ref={linkRef}
        data={data}
        filename={`betHistory-${address}.csv`}
        className="history__button--hidden"
        target="_blank"
      >
        Download me
      </CSVLink>
    </div>
  );
}
