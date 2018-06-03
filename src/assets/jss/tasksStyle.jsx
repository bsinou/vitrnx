
import { defaultFont, primaryColor, secondaryColor, dangerColor } from "./common.jsx";

const taskAvatar = {
  margin: 10,
  width: 32,
  height: 32,
  textAlign: "center",
  color: '#fff',
};

const tasksStyle = {
  table: {
    marginBottom: "0",
    overflow: "visible",
  },
  tableRow: {
    position: "relative",
    borderBottom: "1px solid #dddddd"
  },
  tableActions: {
    display: "flex",
    border: "none",
    padding: "12px 8px !important",
    verticalAlign: "left"
  },
  tableCell: {
    ...defaultFont,
    padding: "4px",
    verticalAlign: "middle",
    border: "none",
    lineHeight: "1.20",
    fontSize: "14px"
  },
  tableActionButton: {
    width: "27px",
    height: "27px"
  },
  tableActionButtonIcon: {
    width: "17px",
    height: "17px"
  },
  edit: {
    backgroundColor: "transparent",
    color: primaryColor,
    boxShadow: "none"
  },
  close: {
    backgroundColor: "transparent",
    color: dangerColor,
    boxShadow: "none"
  },
  checked: {
    width: "17px",
    height: "17px",
    color: secondaryColor
  },
  avatarRed: {
    backgroundColor: primaryColor,
    color: "#ffffff",
  },
  avatarAssignee: {
    ...taskAvatar,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: 'sans-serif',
  },
  avatarCategory: {
    ...taskAvatar,
    fontSize: 16,
    fontFamily: 'sans-serif',
  },
  checkedIcon: {
    width: "14px",
    height: "14px",
    border: "1px solid rgba(0, 0, 0, .54)",
    borderRadius: "2px"
  },
  uncheckedIcon: {
    width: "0px",
    height: "0px",
    padding: "7px",
    border: "1px solid rgba(0, 0, 0, .54)",
    borderRadius: "2px"
  },
  tooltip: {
    padding: "10px 15px",
    minWidth: "130px",
    color: "#555555",
    lineHeight: "1.7em",
    background: "#FFFFFF",
    border: "none",
    borderRadius: "3px",
    boxShadow:
      "0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2)",
    maxWidth: "200px",
    textAlign: "center",
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: "400",
    textShadow: "none",
    textTransform: "none",
    letterSpacing: "normal",
    wordBreak: "normal",
    wordSpacing: "normal",
    wordWrap: "normal",
    whiteSpace: "normal",
    lineBreak: "auto"
  }
};
export default tasksStyle;
