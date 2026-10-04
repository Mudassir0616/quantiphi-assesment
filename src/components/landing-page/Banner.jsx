import { ChevronRight } from "@mui/icons-material";
import React from "react";

const title = "Own your enterprise intelligence. Compound your edge.";

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="container">
        <div className="banner-title">
          <h1 aria-label={title}>
            {title.split(" ").map((word, i) => (
              <span
                key={i}
                className="word"
                aria-hidden="true"
                style={{ "--i": i }}
              >
                {word}
              </span>
            ))}
          </h1>
        </div>
        <div className="cta-btn">
          Unlock AI-Powered Growth <ChevronRight />
        </div>
      </div>
    </div>
  );
};

export default Banner;
