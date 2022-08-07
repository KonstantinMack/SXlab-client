import "./ClubHouse.scss";

import axios from "axios";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import Card from "../../components/Card/Card";

export default function ClubHouse() {
  const [selectedSport, , accountAddress] = useOutletContext();

  if (!accountAddress) {
    return (
      <Card>
        <h2>Soory we can't find your Club House</h2>
        <p>Please connect your MetaMask wallet</p>
      </Card>
    );
  }

  return (
    <Card>
      <h2>Welcome to your Club House:</h2>
    </Card>
  );
}
