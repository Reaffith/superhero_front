import { useEffect, useState } from "react";
import type { Hero } from "../../types/hero";
import { ErrorPortal } from "../ErrorPortal/ErrorPortal";
import { fetchHeroes, fetchPagesCount } from "../../functions/api";
import { HeroCardMemo } from "../HeroCard/HeroCard";
import { useSearchParams } from "react-router-dom";
import './HeroesList.scss';
import { Loader } from "../Loader/Loader";

export const HeroesList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getHeroes = async () => {
      setIsLoading(true);
      try {
        const result = await fetchHeroes(page);

        if (!Array.isArray(result)) {
          setError("Error fetching superheroes");
          throw new Error();
        }

        setHeroes(result);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    setSearchParams({ page: page.toString() });

    getHeroes();
  }, [page]);

  useEffect(() => {
    const getPagesCount = async () => {
      setIsLoading(true);
      const result = await fetchPagesCount();

      setPageCount(result);
     setIsLoading(false);
    };

    getPagesCount();
  }, []);

  return (
    <div className="heroeslist">
      {!!error && <ErrorPortal message={error} setError={setError} />}
      {isLoading && <Loader />}

      <h1 className="heroeslist_header">Super Heroes</h1>

      <div className="heroeslist_list">
        {heroes.map((hero) => (
          <HeroCardMemo hero={hero} key={hero.id} />
        ))}
      </div>

      <div className="heroeslist_pagination">
        {Array.from({ length: pageCount }, (_, k) => k + 1).map((num) => (
          <button
            className="heroeslist_pagination--button"
            onClick={() => setPage(num)}
            key={num}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};
