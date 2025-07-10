
import icon1 from "../assets/icon1.svg"
import icon2 from "../assets/icon2.svg"
import icon3 from "../assets/icon3.svg"
import icon1Wh from "../assets/icon1-wh.svg"
import icon2Wh from "../assets/icon2-wh.svg"
import icon3Wh from "../assets/icon3-wh.svg"
import footlogoBl from "../assets/foot-logo-bl.svg"
import footlogoWh from "../assets/foot-logo-wh.svg"

const footerData = {
  brand: {
    dark: {
      src: footlogoBl,

    },
    light: {
      src: footlogoWh,

    },
    alt: "We decode ideas into impactful design."

  },
  quickLinks: [
    { label: "HOME", link: "/" },
    { label: "SERVICE", link: "/service" },
    { label: "WORKS", link: "/works" },
    { label: "NOTICE", link: "/notice" },
    { label: "CONTACT", link: "/contact" },
  ],
  address: {
    location: "서울특별시 강남구 삼성동 123번지",
    phone: "02-1234-5678",
    email: "info@example.com",
  },
  snsLinks:
  {
    dark: [
      { icon: icon1, link: "#" },        // 예: 카카오톡
      { icon: icon2, link: "#" },
      { icon: icon3, link: "#" },
    ],
    light: [

      { icon: icon1Wh, link: "#" },        // 예: 카카오톡
      { icon: icon2Wh, link: "#" },
      { icon: icon3Wh, link: "#" },
    ]
  },
  copyright: {
    year: 2025,
    text: "© 2025 DECODE.Lab. All rights reserved."
  }
};

export default footerData