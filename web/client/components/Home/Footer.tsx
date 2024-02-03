import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-center py-10">
      <p>© {currentYear} Finvest.</p>
    </footer>
  );
};

export default Footer;
