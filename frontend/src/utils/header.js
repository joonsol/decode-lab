
export const headerConfig = {
logo: {
    light: {
      src: "/logo-fill-bl.svg",
      alt: "DECODE.Lab Light Logo"
    },
    dark: {
      src: "/logo-fill-wh.svg",
      alt: "DECODE.Lab Dark Logo"
    }

  },
  menu: [
    { label: "HOME", link: "/" },
    { label: "SERVICE", link: "/service" },
    { label: "WORKS", link: "/works" },
    { label: "NOTICE", link: "/notice" },
    { label: "CONTACT", link: "/contact" },
  ],
  themeToggle: {
    default: "dark", // or 'light'
    id: "themeToggle",
    label: {
      light: "Light",
      dark: "Dark",
    },
    style: {
      border: true,
      borderRadius: "999px",
      fontSize: "1.4rem",
      padding: "0.4rem 1rem",
    },
  },
};
