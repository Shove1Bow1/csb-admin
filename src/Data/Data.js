// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilPhone,
  UilSignOutAlt,
} from "@iconscout/react-unicons";

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

// Recent Card Imports
import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";

// Sidebar Data
export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Dashboard",
  },
  {
    icon: UilClipboardAlt,
    heading: "Unban List",
  },
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "6 mounth",
    color: {
      backGround: "#008b8b",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 81,
    value: "811",
    png: UilPhone,
    series: [
      {
        name: "Phone",
        data: [31, 40, 28, 51, 42, 109],
      },
    ],
  },
];

// Recent Update Card Data
export const UpdatesData = [
  {
    img: img1,
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery.",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Iron Man",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
  },
];

export const DataUnbanExample =[
  {
    id:1,
    phoneNumber: "0902103242",
    averageCall: 1320,
    totalReport: 59
  },
  {
    id:2,
    phoneNumber: "0922106282",
    averageCall: 1320,
    totalReport: 59
  },
  {
    id:3,
    phoneNumber: "0882103242",
    averageCall: 1090,
    totalReport: 59
  },
  {
    id:4,
    phoneNumber: "0902103266",
    averageCall: 1470,
    totalReport: 25
  },
  {
    id:5,
    phoneNumber: "0322743242",
    averageCall: 1300,
    totalReport: 51
  },
  {
    id:6,
    phoneNumber: "0322749332",
    averageCall: 1620,
    totalReport: 52
  },
  {
    id:7,
    phoneNumber: "0552773242",
    averageCall: 1520,
    totalReport: 53
  },
  {
    id:8,
    phoneNumber: "0322755242",
    averageCall: 1321,
    totalReport: 50
  }
]