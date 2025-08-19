import { useEffect, useState } from "react";
import type { Hero } from "../../types/hero";
import { useParams } from "react-router-dom";
import { fetchOneHero } from "../../functions/api";
import { ErrorPortal } from "../ErrorPortal/ErrorPortal";

export const CreateUpdatePage = () => {
  const { id } = useParams();
  const [heroToEdit, setHeroToEdit] = useState<Hero | null>(null);
  const [nickname, setNickname] = useState("");
  const [real_name, setRealname] = useState("");
  const [error, setError] = useState("");
  const [origin_description, setOriginDescription] = useState("");
  const [superpowers, setSuperpowers] = useState<string[]>([]);
  const [catch_phrase, setCatchPhrase] = useState("");
  const [images, setImages] = useState<Hero["images"]>([]);

  useEffect(() => {
    if (id && Number.isFinite(+id)) {
      const getHero = async () => {
        try {
          const result = await fetchOneHero(+id);

          if (result.message) {
            setError(result.message);
            throw new Error();
          }

          setHeroToEdit(result);
        } catch (error) {
          setError("Error while fetching user to update");
          console.log(error);
          throw new Error();
        }
      };

      getHero();
    }
  }, [id]);

  useEffect(() => {
    if (heroToEdit) {
        setCatchPhrase(heroToEdit.catch_phrase);
        setImages(heroToEdit.images);
        setNickname(heroToEdit.nickname);
        setOriginDescription(heroToEdit.origin_description);
        setRealname(heroToEdit.real_name);
        setSuperpowers(heroToEdit.superpowers);
    }
  }, [heroToEdit]);

  return (
    <div className="create">
      {!!error && <ErrorPortal message={error} setError={setError} />}
    </div>
  );
};
