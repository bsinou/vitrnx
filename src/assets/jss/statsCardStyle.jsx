import {
  card,
  cardHeader,
  defaultFont,
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  blueCardHeader,
  purpleCardHeader,
  cardActions,
  grayColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  primaryColor,
  roseColor
} from "./common.jsx";

const statsCardStyle = {
  card,
  cardHeader: {
    ...cardHeader,
    float: "left",
    textAlign: "center"
  },
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  blueCardHeader,
  purpleCardHeader,
  cardContent: {
    textAlign: "right",
    paddingTop: "10px",
    padding: "8px 8px"
  },
  cardIcon: {
    width: "32px",
    height: "30px",
    fill: "#fff"
  },
  cardAvatar: {
    margin: "2px"
  },
  cardCategory: {
    marginBottom: "0",
    color: grayColor,
    margin: "0 0 10px",
    ...defaultFont
  },
  cardTitle: {
    margin: "0",
    ...defaultFont,
    fontSize: "1.625em"
  },
  cardTitleSmall: {
    fontSize: "65%",
    fontWeight: "400",
    lineHeight: "1",
    color: "#777"
  },
  cardActions: {
    ...cardActions,
    padding: "0!important"
  },
  cardStats: {
    lineHeight: "22px",
    color: grayColor,
    fontSize: "12px",
    display: "inline-block",
    margin: "0!important"
  },
  cardStatsIcon: {
    position: "relative",
    top: "3px",
    width: "16px",
    height: "16px"
  },
  warningCardStatsIcon: {
    color: warningColor
  },
  primaryCardStatsIcon: {
    color: primaryColor
  },
  dangerCardStatsIcon: {
    color: dangerColor
  },
  successCardStatsIcon: {
    color: successColor
  },
  infoCardStatsIcon: {
    color: infoColor
  },
  roseCardStatsIcon: {
    color: roseColor
  },
  grayCardStatsIcon: {
    color: grayColor
  },
  cardStatsLink: {
    color: primaryColor,
    textDecoration: "none",
    ...defaultFont
  }
};

export default statsCardStyle;
