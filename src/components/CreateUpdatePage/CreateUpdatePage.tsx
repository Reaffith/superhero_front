import { useEffect, useState } from "react";
import type { Hero } from "../../types/hero";
import { useNavigate, useParams } from "react-router-dom";
import { createHero, fetchOneHero, updateHero } from "../../functions/api";
import { ErrorPortal } from "../ErrorPortal/ErrorPortal";
import { Loader } from "../Loader/Loader";
import { FaWindowClose } from "react-icons/fa";
import "./CreateUpdatePage.scss";

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
  const [currentImage, setCurrentImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [deleteImagesIds, setDeleteImagesIds] = useState<number[]>([]);
  const [currentSuperPower, setCurrentSuperPower] = useState("");
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

          setHeroToEdit(result);
        } catch (error) {
          setError("Error while fetching user to update");
          console.log(error);
          throw new Error();
        }

        setIsLoading(false);
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

  const confirmPhoto = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (currentImage) {
      e.preventDefault();
      setNewImages((prev) => [...prev, currentImage]);
      setCurrentImage(null);
    }
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();

    formData.append("nickname", nickname);
    formData.append("real_name", real_name);
    formData.append("origin_description", origin_description);
    formData.append("catch_phrase", catch_phrase);

    superpowers.forEach((pow) => formData.append("superpowers", pow));

    newImages.forEach((img) =>
      formData.append(heroToEdit ? "newImages" : "images", img)
    );

    if (heroToEdit && id) {
      const updatedHero = await updateHero(+id, formData, deleteImagesIds);

      if (updatedHero.message) {
        setError(updatedHero.message);
      }

      if (updatedHero.nickname) {
        navigate(`/hero/${id}`);
      }
    } else {
      const createdHero = await createHero(formData);

      if (createdHero.message) {
        setError(createdHero.message);
      }

      if (createdHero.nickname) {
        navigate(`/hero/${id}`);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="create">
      {!!error && <ErrorPortal message={error} setError={setError} />}
      {isLoading && <Loader />}

      <h1 className="create_header">
        {heroToEdit ? "Update" : "Create"} a Super Hero
      </h1>

      <form className="create_form" onSubmit={onFormSubmit}>
        <label htmlFor="nickname" className="create_form-label">
          Nickname
        </label>
        <input
          type="text"
          className="create_form-input"
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Nickname"
          required
        />
        <label htmlFor="RealName" className="create_form-label">
          Real Name
        </label>
        <input
          type="text"
          className="create_form-input"
          id="RealName"
          value={real_name}
          onChange={(e) => setRealname(e.target.value)}
          required
          placeholder="Real Name"
        />
        <label htmlFor="catch" className="create_form-label">
          Catch Phrase
        </label>
        <input
          type="text"
          className="create_form-input"
          id="catch"
          value={catch_phrase}
          onChange={(e) => setCatchPhrase(e.target.value)}
          required
          placeholder="Catch Phrase"
        />
        <label htmlFor="Origin" className="create_form-label">
          Origin description
        </label>
        <textarea
          className="create_form-input"
          id="Origin"
          value={origin_description}
          onChange={(e) => setOriginDescription(e.target.value)}
          placeholder="Origin description"
        ></textarea>

        <label htmlFor="superpowers" className="create_form-label">
          Super Powers
        </label>
        <div className="powerblock">
          <input
            type="text"
            className="create_form-input"
            id="superpowers"
            value={currentSuperPower}
            onChange={(e) => setCurrentSuperPower(e.target.value)}
            placeholder="Super Power"
          />
          <button
            className="create_form-powerbutton"
            onClick={(e) => {
              e.preventDefault();
              setSuperpowers((prev) => [...prev, currentSuperPower]);
              setCurrentSuperPower("");
            }}
          >
            Confirm Superpower
          </button>
        </div>

        <div className="create_form-powers">
          {superpowers.map((power) => (
            <div key={power} className="create_form-powers-block">
              <p className="create_form-powers-block-text">{power}</p>
              <button
                className="create_form-powers-block-button"
                onClick={() =>
                  setSuperpowers((prev) => [...prev].filter((p) => p !== power))
                }
              >
                <FaWindowClose />
              </button>
            </div>
          ))}
        </div>

        <div className="img">
          <label htmlFor="image" className="img_label">
            Upload image
          </label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            id="image"
            onChange={(e) =>
              setCurrentImage(e.target.files ? e.target.files[0] : null)
            }
          />
          <button
            className="img_button"
            onClick={confirmPhoto}
            disabled={!currentImage}
          >
            Confirm picture
          </button>
          <div className="create_form-picblock">
            {images.map((img) => (
              <div key={img.id}>
                <img src={img.data} alt="Picture" />
                <button
                  onClick={() => {
                    setDeleteImagesIds((prev) => [...prev, img.id]);
                    setImages((prev) =>
                      [...prev].filter((i) => i.id !== img.id)
                    );
                  }}
                >
                  <FaWindowClose />
                </button>
              </div>
            ))}

            {newImages.map((img) => (
              <div key={img.name + img.size}>
                <img
                  src={typeof img === "string" ? img : URL.createObjectURL(img)}
                  alt="Picture"
                />
                <button
                  onClick={() => {
                    setNewImages((prev) =>
                      [...prev].filter((i) => i.name !== img.name)
                    );
                  }}
                >
                  <FaWindowClose />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button className="create_form-button" type="submit">
          {heroToEdit ? "Update" : "Create"} a Super Hero
        </button>
      </form>
    </div>
  );
};
