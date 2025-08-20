import "./Footer.scss";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_git">
        <FaGithub />

        <div className="footer_git-block">
          <p className="footer_git-block-text">
            Back-end Github repository link
          </p>
          <a
            href="https://github.com/Reaffith/superhero_back"
            className="footer_git-block-link"
            target="_blank"
          >
            here
          </a>
        </div>

        <div className="footer_git-block">
          <p className="footer_git-block-text">
            Front-end Github repository link
          </p>
          <a
            href="https://github.com/Reaffith/superhero_front"
            className="footer_git-block-link"
            target="_blank"
          >
            here
          </a>
        </div>
      </div>

      <div className="footer_center">
        <h2 className="footer_center-text">
          This is a test task for JavaScipt Ninjas
        </h2>
      </div>

      <div className="footer_contacts">
        <p className="footer_contacts-text">Email: </p>
        <a
          href="mailto:taras.nechyporuk.dev@gmail.com"
          className="footer_contacts-link"
        >
          taras.nechyporuk.dev@gmail.com
        </a>
      </div>
    </div>
  );
};
