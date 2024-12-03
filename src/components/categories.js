import spcake from "../assets/image/layer-cake.jpg";
import pfour from "../assets/image/fourfrais.png";
import gcake from "../assets/image/gateaux1.png";
import sroll from "../assets/image/swiss1.png";
import eb from "../assets/image/eb1.png";
import qb from "../assets/image/qb1.png";

export const CATEGORY_DATA = {
  "Specialty Cake": {
    words: [
      "CHEESECAKE",
      "BUTTERCREAM",
      "CHARLOTTE",
      "PORTIONING",
      "DECORATION",
    ],
    image: spcake,
  },
  "Petit Fours": {
    words: ["PASTILLAGE", "ÉCLAIR", "GATEAUX", "MARZIPAN", "GLACÉE"],
    image: pfour,
  },
  Gâteaux: {
    words: ["GANACHE", "CRÈME", "GATEAUX", "SPLIT", "DECORATION"],
    image: gcake,
  },
  "Swiss Roll": {
    words: ["SWISS", "ROLL", "BUTTERCREAM", "GLAZING", "ROLLER"],
    image: sroll,
  },
  "Enriched Bread": {
    words: ["ENRICHED", "BRIOCHE", "CHALLAH", "NANTERRE", "EGG WASH"],
    image: eb,
  },
  "Quick Bread": {
    words: ["MUFFIN", "SCONES", "BANANA BREAD", "BISCUIT", "SOAKING"],
    image: qb,
  },
};
