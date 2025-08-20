import { useNavigate, useParams } from "react-router-dom";
import "./HeroPage.scss";
import { useEffect, useState } from "react";
import type { Hero } from "../../types/hero";
import { fetchOneHero } from "../../functions/api";
import { MdEdit } from "react-icons/md";
import { Loader } from "../Loader/Loader";
import { ErrorPortal } from "../ErrorPortal/ErrorPortal";

export const HeroPage = () => {
  const { id } = useParams();
  const [hero, setHero] = useState<Hero | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState<{
    id: number;
    mimeType: string;
    data: string;
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id && Number.isFinite(+id)) {
      const getHero = async () => {
        setIsLoading(true);
        try {
          const result = await fetchOneHero(+id);

          if (result.message) {
            setError(result.message);
            throw new Error();
          }

          setHero(result);
        } catch (error) {
          setError("Error while fetching Super Hero");
          console.log(error);
          throw new Error();
        }

        setIsLoading(false);
      };

      getHero();
    }
  }, [id]);

  useEffect(() => {
    if (hero) setCurrentImage(hero.images[0]);
  }, [hero]);

  if (!hero) {
    return <h1>Not Found</h1>;
  }

  return (
    <div className="hero">
      {isLoading && <Loader />}
      {!!error && <ErrorPortal message={error} setError={setError} />}
      <h1 className="hero_header">{hero.nickname}</h1>
      <div className="hero_photoblock">
        <div className="hero_photoblock-all">
          {hero.images.map((img) => (
            <div
              className="hero_photoblock-all-item"
              onClick={() => setCurrentImage(img)}
              key={img.id}
            >
              <img
                src={img.data}
                alt={hero.nickname}
                className="hero_photoblock-all-item-img"
              />
            </div>
          ))}
        </div>
        <div className="hero_photoblock-selected">
          <img
            src={currentImage?.data}
            alt={hero.nickname}
            className="hero_photoblock-selected-img"
          />
        </div>
      </div>

      <div className="hero_info">
        <h2 className="hero_info-header">{hero.real_name}</h2>
        <h3 className="hero_info-big">{hero.catch_phrase}</h3>

        <p className="hero_info-text">
          Origin Description: <br></br>
          {hero.origin_description}
        </p>

        <p className="hero_info-text">Superpowers:</p>

        {hero.superpowers.map((superpower, i) => (
          <p className="hero_info-text power" key={i}>
            {superpower}
          </p>
        ))}

        <button
          className="hero_info-button"
          onClick={() => navigate(`/update/${hero.id}`)}
        >
          Edit Super Hero <MdEdit />
        </button>
      </div>
    </div>
  );
};
