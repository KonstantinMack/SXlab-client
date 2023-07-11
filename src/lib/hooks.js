import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../config";

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
};

export const useFavourites = (userId) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if (userId) {
      axios
        .get(`${API_URL}/tipster/favourites?address=${userId}`)
        .then((favs) => setFavourites(favs.data))
        .catch((err) => console.log(err));
    } else {
      setFavourites([]);
    }
  }, [userId]);

  return [favourites, setFavourites];
};
