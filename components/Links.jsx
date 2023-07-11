import React from "react";

const Links = (socialLinks) => {
  return (
    <div className="social-contain flex-row justify-center items-center w-auto">
      {socialLinks.socialLinks.map((social, index) => (
        <div
          className="logo w-8 h-8 md:h-10 md:w-10 inline-block px-1"
          key={index}
        >
          <a
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            key={social.name}
            className="social-link"
          >
            <social.logo alt={social.name} className="social-logo" />
          </a>
        </div>
      ))}
    </div>
  );
};

export default Links;
