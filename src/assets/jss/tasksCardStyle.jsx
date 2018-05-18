import {
  card,
  cardHeader,
  defaultFont,
  primaryBoxShadow
} from "./common.jsx";

const tasksCardStyle = theme => ({
  card,
  cardHeader: {
    flex: "none",
    ...cardHeader,
    ...defaultFont,
    background: "linear-gradient(60deg, #ab47bc, #8e24aa)",
    ...primaryBoxShadow
  },
  cardTitle: {
    ...defaultFont,
    float: "left",
    fontWeight: "500",
    marginTop: "2px",
    padding: "2px 2px 2px 0",
    lineHeight: "16px",
    fontSize: "14px",
    color: "#FFFFFF"
  },
  tabWrapper: {
    minWidth: "32px",
    width: "32px",
    display: "flex",
    // alignItems: "inherit",
    flexDirection: "row",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "row",
    }
  },
  tabIcon: {
    float: "left",
    [theme.breakpoints.down("sm")]: {
      marginTop: "-2px"
    }
  },
  displayNone: {
    display: "none"
  },
  labelIcon: {
    height: "32px",
    width: "32px",
    minWidth: "32px",
    paddingLeft: "14px",
    borderRadius: "3px"
  },
  tabsContainer: {
    marginTop: "2px",
    color: "#FFFFFF",
    // [theme.breakpoints.down("sm")]: {
    //   display: "grid"
    // }
  },
  tabs: {
    width: "32px",
    minWidth: "32px",
    paddingLeft: "8px"
  },
  cardHeaderContent: {
    flex: "none"
  },
  label: {
    lineHeight: "19px",
    textTransform: "uppercase",
    fontSize: "12px",
    fontWeight: "500",
    marginLeft: "-10px"
  },
  textColorInheritSelected: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    transition: "background-color .4s"
  }
});

export default tasksCardStyle;
