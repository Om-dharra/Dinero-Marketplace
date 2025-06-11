import Image from "next/image";
import React from "react";

const socialLinks = [
  {
    href: "https://linkedin.com/in/om-dharra-b55422225",
    img: "https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg",
    alt: "LinkedIn",
  },
  {
    href: "https://instagram.com/om_dharra",
    img: "https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg",
    alt: "Instagram",
  },
  {
    href: "https://www.leetcode.com/programmer_om",
    img: "https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/leet-code.svg",
    alt: "LeetCode",
  },
];

const tools = [
  {
    href: "https://www.cprogramming.com/",
    img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg",
    alt: "C",
  },
  {
    href: "https://www.w3schools.com/cpp/",
    img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg",
    alt: "C++",
  },
  {
    href: "https://expressjs.com",
    img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg",
    alt: "Express",
  },
  {
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
    alt: "JavaScript",
  },
  {
    href: "https://nodejs.org",
    img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg",
    alt: "Node.js",
  },
];

const mainProjects = [
  {
    title: "Ecommerce Website made with Node and Express",
    link: "https://final-ecommerce-om.onrender.com/login",
    label: "Ecomm",
  },
  {
    title:
      "Carbon Tracker with AI powered Recommendation . Selected in top 15 teams in FITT (IIT DELHI STARTUP CELL)",
    link: "https://deploycarbontracker.onrender.com/login",
    label: "Frontend",
  },
];

const miniProjects = [
  {
    title: "Headphones site using CSS and HTML only",
    link: "http://om-headphones-website.netlify.app",
    label: "Headphones_site",
  },
  {
    title: "Snake game using canvas in JavaScript",
    link: "https://magical-crumble-a0739a.netlify.app",
    label: "Snake_game",
  },
  {
    title: "Partial responsive Coffee website",
    link: "http://partial-responsive-coffee.netlify.app",
    label: "Coffee_site",
  },
  {
    title: "Spotify-clone using Bootstrap",
    link: "https://spotifyclonend.netlify.app/",
    label: "Spotify_clone",
  },
];

const page = () => {
  return (
    <div
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 32,
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
        fontFamily: "Segoe UI, Arial, sans-serif",
        color: "#222",
        position: "relative", // Ensures absolutely positioned children are contained
        overflow: "hidden",   // Optional: prevents overflow of the image
      }}
    >
      
      <h1 style={{ textAlign: "left", fontSize: 38, marginBottom: 8 }}>
        Hi 👋, I am <span style={{ color: "#0078d4" }}>OM DHARRA</span>
      </h1>
      <h3 style={{ textAlign: "left", fontWeight: 400, color: "#555", marginBottom: 24 }}>
        A Computer Science Undergrad Student (DTU)
      </h3>

      <ul style={{ listStyle: "none", padding: 0, marginBottom: 32 }}>
        <li style={{ marginBottom: 8 }}>
          <span role="img" aria-label="seedling">
            🌱
          </span>{" "}
          Currently learning Competitive Programming on <b>Codeforces</b>
        </li>
        <li>
          <span role="img" aria-label="mail">
            📫
          </span>{" "}
          Reach me at <b>omdharra4104@gmail.com</b>
        </li>
      </ul>

      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 8, color: "#0078d4" }}>Connect with me</h3>
        <div style={{ display: "flex", gap: 20 }}>
          {socialLinks.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                transition: "transform 0.2s",
              }}
            >
              <Image
                src={s.img}
                alt={s.alt}
                height={36}
                width={36}
                style={{
                  filter: "grayscale(0.2)",
                  transition: "filter 0.2s",
                }}
              />
            </a>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 8, color: "#0078d4" }}>Languages and Tools</h3>
        <div style={{ display: "flex", gap: 18 }}>
          {tools.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-block",
                background: "#f5f5f5",
                borderRadius: 8,
                padding: 6,
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <Image src={tool.img} alt={tool.alt} width={36} height={36} />
            </a>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h3 style={{ color: "#0078d4" }}>Main Projects</h3>
        <ul style={{ paddingLeft: 18 }}>
          {mainProjects.map((proj, i) => (
            <li key={i} style={{ marginBottom: 8 }}>
              {proj.title}{" "}
              {proj.link && (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#0078d4", textDecoration: "underline" }}
                >
                  {proj.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h3 style={{ color: "#0078d4" }}>Mini Projects</h3>
        <ul style={{ paddingLeft: 18 }}>
          {miniProjects.map((proj, i) => (
            <li key={i} style={{ marginBottom: 8 }}>
              {proj.title}{" "}
              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#0078d4", textDecoration: "underline" }}
              >
                {proj.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <h2 style={{ textAlign: "center", color: "#0078d4", marginTop: 40 }}>
        Thank You
      </h2>
    </div>
  );
};

export default page;