import { Link } from "react-router-dom";
import type { Hero } from "../../types/hero";
import { memo } from "react";
import './HeroCard.scss'

type Props = {
  hero: Hero;
};

const HeroCard: React.FC<Props> = ({ hero }) => {
  return (
    <article className="herocard">
      <img src={hero.images[0].data} alt={hero.nickname} />

      <Link className="herocard_link" to={`hero/${hero.id}`}>{hero.nickname}</Link>

    </article>
  );
};

export const HeroCardMemo = memo(HeroCard);
