import { SignOutBar } from "./SignOutBar";
import { useLocation } from "react-router-dom";

export const Banner = () => {
  const location = useLocation();

  return (
    <div className="banner">
      <div className="banner-content">
        {location.pathname !== "/#" && (
          <div className="signoutbar-container">
            <SignOutBar />
          </div>
        )}
        <div className="banner-text">
          ChoiceReads
        </div>
      </div>
    </div>
  );
};
