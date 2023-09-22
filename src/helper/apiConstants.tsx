export const api = {
  BASE_URL: "https://master.devicebee.com/Bastah/api/",
  GOOGLE_MAP_BASE_URL: "https://maps.googleapis.com/maps/api/geocode/json",

  // Auth
  login: "login",
  logout: "logout",
  guest_login: "guestLogin",
  register: "register",
  send_verify_code: "sendVerifyCode",
  verify_OTP: "verifyOTP",
  forgot_password: "forgot-password",
  google_signin: "google-signin",
  apple_signin: "apple-signin",

  // Home
  dashboard: "getDashboard",
  item_details: "getItemDetails",

  // favourite
  my_favourite_items: "myFavouriteItems",
  add_remove_favourite: "addRemoveFavourite",

  //Categories
  categories: "getCategories",
  sub_categories: "getSubCategories",
  get_items: "getItems",

  // cart
  get_cart: "getCart",
  add_cart: "addCart",
  update_cart: "updateCart",
  empty_cart: "emptyCart",

  get_address: "getAddress",
  add_address: "addAddress",
  remove_address: "removeAddress",
  make_address_default: "makeAddressDefault",

  // settings for
  get_settings: "getSettings",
  get_cities: "getCities",

  // order
  place_order: "placeOrder",
  my_orders: "myOrders",
  order_details: "getOrderDetails",
  rate_order: "rateOrder",

  //payment
  setup_intent: "setupIntent",

  //seller
  get_seller_profile: "getSellerProfile",
  get_sellers_list: "getSellersList",

  //profile
  get_profile: "getProfile",
  update_profile: "update-profile",
  delete_account: "delete-account",

  // filter
  get_filter_data: "getFilterData",
  filter: "filter",
  search: "search",
  add_recent_search: "addRecentSearch",
  clear_recent_search: "clearRecentSearch",

  my_cards: "myCards",
  get_notifications: "getNotifications",
  clear_all_notifications: "clearAllNotifications",
};

export const POST = "POST";
export const GET = "GET";

export const GOOGLE_API_KEY = "AIzaSyDEjeEjROHSLP3YfRln7Sk1GxUQSTGOGCI";

export const STRIPE_PUBLIC_KEY = __DEV__
  ? "pk_test_51NAaB2GML9XZKHRnmCllWLNV59tS8F25b54bznODpbv9zwEUWTH6Zn1zJ4aVxJtKIdqqEMhZ0jk1mA7imgaJlkoa00LuNx1bt4"
  : "pk_live_51NAaB2GML9XZKHRnN0DsRSrvR3jTkEW4R1D9eoSc6rLyx7AhW2Sgx1PrZXf53MBfPbCEQ0jxT81PH4CR8jiFIIOd00X4HAscON";

export const APPLE_MERCHANT_ID = "merchant.com.bastah";

export const GOOGLE_WEB_CLINET_ID =
  "526631932163-b85he687v4kb3l89variiacc6eiphmdf.apps.googleusercontent.com";

export const stripeConfig = {
  merchantName: "CODE RED PORTAL (bastah)",
  merchantCountryCode: "AE",
  currencyCode: "AED",
};
