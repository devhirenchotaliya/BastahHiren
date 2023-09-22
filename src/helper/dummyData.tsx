import { Platform } from "react-native";
import { icons } from "../theme/Icons";
import { screenName } from "./constants";
import { isIos } from "./globalFunctions";

export const categoriesList = [
  {
    id: 1,
    name: "Clothing",
    image:
      "https://images.pexels.com/photos/2916814/pexels-photo-2916814.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 2,
    name: "Beauty & Fragrance",
    image:
      "https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 3,
    name: "Jewellery & Accessories",
    image:
      "https://images.pexels.com/photos/2836486/pexels-photo-2836486.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 4,
    name: "Test",
    image:
      "https://images.pexels.com/photos/1661471/pexels-photo-1661471.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 5,
    name: "New",
    image:
      "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export const bestSellerList = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/1113554/pexels-photo-1113554.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export const recentlyViewedList = [
  {
    id: 1,
    name: "Perty Dress",
    image:
      "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    name: "Gray Snoopy Shirt",
    image:
      "https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    name: "Top Shining Dress",
    image:
      "https://images.pexels.com/photos/10818959/pexels-photo-10818959.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    name: "Perty Dress",
    image:
      "https://images.pexels.com/photos/17388673/pexels-photo-17388673/free-photo-of-portrait-of-a-male-model-wearing-a-black-suit-leaning-on-a-wall.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 5,
    name: "Perty Dress",
    image:
      "https://images.pexels.com/photos/17389793/pexels-photo-17389793/free-photo-of-young-man-in-a-trendy-outfit-standing-against-a-concrete-wall.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 6,
    name: "Perty Dress",
    image:
      "https://images.pexels.com/photos/1862557/pexels-photo-1862557.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 7,
    name: "Perty Dress",
    image:
      "https://images.pexels.com/photos/2169267/pexels-photo-2169267.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export const imageDataList: string[] = [
  "https://images.pexels.com/photos/2584279/pexels-photo-2584279.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1846944/pexels-photo-1846944.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1117054/pexels-photo-1117054.jpeg?auto=compress&cs=tinysrgb&w=600",
];

export const sizesList = ["XS", "S", "M", "L"];

export const colorsList = [
  "#C46CD3",
  "#413933",
  "#8C6154",
  "#4FB87F",
  "#E94E4E",
  "#45A1E4",
];

export const categorieTypeList = [
  { id: 1, name: "Best Seller" },
  { id: 2, name: "New" },
  { id: 3, name: "Women" },
  { id: 4, name: "Men" },
  { id: 5, name: "Kids" },
  { id: 6, name: "Test" },
];

export const fashionList = [
  {
    id: 1,
    name: "High Fashion",
    image:
      "https://images.pexels.com/photos/2755612/pexels-photo-2755612.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    name: "Bodysuits",
    image:
      "https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    name: "T-shirts",
    image:
      "https://images.pexels.com/photos/2058664/pexels-photo-2058664.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    name: "Ath",
    image:
      "https://images.pexels.com/photos/1020488/pexels-photo-1020488.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export const filterCategories = [
  "Fashion",
  "Beauty & Fragrance",
  "Jewellery & Accessories",
  "Kids & Babies",
  "Home & Kitchen",
  "Arts & Crafts",
  "Gift",
  "Others",
];

export const filterBrand = [
  "Gucci",
  "Versace",
  "Burberry",
  "Ralph Lauren",
  "Saint Laurent",
];

export const filterBestProduct = ["New day", "New this week", "Top sell"];

export const sortList = [
  { id: 1, title: "New", source: icons.hot, sort_by: "latest" },
  {
    id: 2,
    title: "Price (High to Low)",
    source: icons.price,
    sort_by: "price_desc",
  },
  {
    id: 3,
    title: "Price (Low to High)",
    source: icons.price,
    sort_by: "price_asc",
  },
];
export const accountList = [
  {
    id: 1,
    label: "Profile Data",
    icon: icons.profileGrey,
    screenName: screenName.edit_profile,
  },
  {
    id: 2,
    label: "My Favorite",
    icon: icons.myFavorite,
    screenName: screenName.my_favorite,
  },
  {
    id: 3,
    label: "My Addresses",
    icon: icons.location,
    screenName: screenName.my_address,
  },
  {
    id: 5,
    label: "My Orders",
    icon: icons.location,
    screenName: screenName.my_orders,
  },
  {
    id: 6,
    label: "Change Password",
    icon: icons.changePassword,
    screenName: screenName.edit_profile,
    disabled: true,
  },
  {
    id: 7,
    label: "Privacy Policy",
    icon: icons.privacy,
    screenName: screenName.edit_profile,
    disabled: true,
  },
  {
    id: 8,
    label: "Terms & Conditions",
    icon: icons.terms,
    screenName: screenName.edit_profile,
    disabled: true,
  },
  {
    id: 9,
    label: "Logout",
    icon: icons.logout,
    isHideArrow: true,
    screenName: screenName.edit_profile,
  },
];

export const paymentMethods = isIos
  ? [
      {
        id: 1,
        label: "Payment with Card",
        cardNumber: "* * * * 3697",
        isCard: true,
        icon: icons.card,
        payment_method: "Card",
      },
      {
        id: 2,
        label: "Payment with Cash",
        addtional_fee: "Extra service fee of ",
        isCash: true,
        icon: icons.cash,
        payment_method: "Cash",
      },
      {
        id: 3,
        label: "Apple Pay",
        icon: icons.applePay,
        payment_method: "Apple Pay",
      },
    ]
  : [
      {
        id: 1,
        label: "Payment with Card",
        cardNumber: "* * * * 3697",
        isCard: true,
        icon: icons.card,
        payment_method: "Card",
      },
      {
        id: 2,
        label: "Payment with Cash",
        addtional_fee: "Extra service fee of ",
        isCash: true,
        icon: icons.cash,
        payment_method: "Cash",
      },
      {
        id: 3,
        label: "Google Pay",
        icon: icons.googlePay,
        payment_method: "Google Pay",
      },
    ];
