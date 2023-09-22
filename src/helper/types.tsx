import { NavigationProp, Route, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  ImageStyle,
  TextStyle,
  ViewStyle,
  ImageSourcePropType,
  TextInputProps,
  KeyboardTypeOptions,
  ImageURISource,
  StyleProp,
  ReturnKeyType,
} from "react-native";
import { RootStackParamList } from "../navigations/StackNavigator";
import store from "../redux";
import { ImageRequireSource } from "react-native";

type UniversalScreenRouteProp = RouteProp<RootStackParamList>;

type UniversalScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type UniversalProps = {
  route: UniversalScreenRouteProp;
  navigation: UniversalScreenNavigationProp;
};

export interface RouterProps {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type SignInBtnProps = {
  iconName: ImageSourcePropType;
  title: string;
  onBtnPress: () => void;
  containerStyle?: ViewStyle;
  iconStyles?: ImageStyle;
  titleStyle?: TextStyle;
};

export type InputProps = {
  placeholder: string;
  label: string;
  value: string;
  onChangeText: (params: string) => void;
  isShowEyeIcon?: boolean;
  secureTextEntry?: boolean;
  onPressEye?: () => void;
  onSubmitEditing?: () => void;
  theme?: string;
  autoCorrect?: boolean;
  rest?: TextInputProps[];
  inputRef?: any;
  returnKeyType?: ReturnKeyType;
};

export type SecondaryInputProps = {
  placeholder: string;
  value: string;
  onChangeText: (params: string) => void;
  theme?: string;
  keyboardType?: KeyboardTypeOptions;
  onPressMapIcon?: () => void;
  onPressInput?: () => void;
  editable?: boolean;
  maxLength?: number;
  inputStyle?: TextStyle;
  ref?: any;
  returnKeyType?: ReturnKeyType;
  onSubmitEditing?: () => void;
};

export type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  isAddIconShow?: boolean;
};

export type CheckBoxProps = {
  onPress: () => void;
  isValue: boolean;
};
export type AuthHeaderProps = {
  title?: string;
  borderBottomWidth?: number;
  onBackPressScreen?: () => void;
  onPressClearAll?: () => void;
  isHeartIcon?: boolean;
  onPressHeart?: () => void;
  onPressDelete?: () => void;
  icon?: ImageRequireSource;
  isHeartLoading?: boolean;
  isClearIcon?: boolean;
  isDeleteIcon?: boolean;
};
export type PhoneInputProps = {
  countryCode: string;
  value: string;
  onDownArrowPress?: () => void;
  onChangeText: (params: string) => void;
  ref?: any;
  inputStyle?: TextStyle;
  autoFocus?: boolean;
  returnKeyType?: ReturnKeyType;
  onSubmitEditing?: () => void;
};

export type HomeHeaderProps = {
  profileIcon: ImageSourcePropType | undefined | null;
  onCartPress?: () => void;
  userName: string;
  isGuest?: boolean;
};

export type SearchBarProps = {
  value: string;
  onChangeText: (params: string) => void;
  containerStyle?: ViewStyle;
  isFilterIcon?: boolean;
  onPressFilter?: () => void;
  onTouchStart?: () => void;
  onPressClose?: () => void;
  isBackVisible?: boolean;
  editable?: boolean;
  ref?: any;
  isCloseIcon?: boolean;
  autoFocus?: boolean;
};

export type ViewAllHeaderProps = {
  headerTitle: string;
  onPressViewAll: () => void;
};

export type CarouselViewProps = {
  data: Array<string | number>;
  onPressHeart?: () => void;
  onPressBack?: () => void;
  is_favourite?: number;
  isHeartLoading?: boolean;
};

export type SizeItemProps = {
  onPressItem: () => void;
  data: any;
  selected?: number | null | undefined | string;
  containerStyle?: ViewStyle;
  index?: number;
  onlyItem?: boolean;
};

export type CircleIconProps = {
  icon: ImageSourcePropType;
  onPress: () => void;
};
export type QuantityManagerProps = {
  quantity: number;
  minQuantity?: number;
  setQuantity: (params: number) => void;
};

export type ColorsItemProps = {
  data: any;
  selectedColor: number | null | undefined;
  onPress: () => void;
  index: number;
};

export type RatingAndReviewsItemProps = {
  data: any;
};

export type RowItemProps = {
  value: string;
  title: string;
  font_family?: string;
  textStyle?: TextStyle;
};

export type TopTabBarItemProps = {
  data: any;
  onTabItemPress?: () => void;
  containerStyle?: ViewStyle;
};

export type CategoriesTypeProps = {
  data: any;
  selected: number;
  index: number;
  onPressItem: () => void;
};

export type CategoriesItemProps = {
  data: any;
  imgStyle?: StyleProp<ImageStyle>;
  containerStyle?: ViewStyle;
  onItemPress: () => void;
  nameTextStyle?: TextStyle;
};

export type FashionItemProps = {
  data: any;
  onPressItem?: () => void;
};

export type RowWithLabelViewAllProps = {
  label: string;
  onPressViewAll?: () => void;
  isHideViewAll?: boolean;
};

export type WrapListProps = {
  data: any;
  onItemPress: (params: string | number) => void;
  keyName?: string | number | null | undefined;
};

export type ThumbProps = {
  name: string;
  low: number;
  high: number;
};

export type RecentlyViewItemProps = {
  data: any;
  containerStyle?: ViewStyle;
  onPressScreenItem?: () => void;
  onPressHeart?: () => void;
  isShowHeart?: boolean;
  isHeartLoading?: boolean;
  isScreenApiCall?: boolean;
  currentItem?: any;
};

export type BusinessesItemProps = {
  onStarPress?: () => void;
  onItemPress?: () => void;
  containerStyle?: ViewStyle;
  avgRate: number;
  totalRate: number;
  description: string;
  image: string;
  name: string;
  seller_id?: number;
  disabled?: boolean;
};

export type SortModalProps = {
  selectedIndex: number | null | undefined;
  onItemPress: (param: number) => void;
  onPressClose?: () => void;
  isVisible: boolean;
};

export type RadioItemProps = {
  data: any;
  index: number;
  onPress: () => void;
  selectedIndex: number;
};
export type RatingViewProps = {
  rating: number;
  onStarPress: (params: number) => void;
};

export type SearchItemProps = {
  isShowCleanIcon?: boolean;
  containerStyle?: ViewStyle;
  title: string;
  onItemPress?: () => void;
  onPressClear?: () => void;
  disabled?: boolean;
};

export type AccountItemProps = {
  data: {
    id: number;
    label: string;
    icon: ImageSourcePropType;
    isHideArrow?: boolean;
    disabled?: boolean;
    screenName?: string | undefined;
  };
  index: number;
  onPress: () => void;
};

export type EditProfileInputProps = {
  label: string;
  placeholder?: string;
  value: string;
  phoneCode?: string;
  keyboardType?: KeyboardTypeOptions;
  onChangeText: (params: string) => void;
  maxLength?: number;
  editable?: boolean;
};

export type ImagePickerProps = {
  params?: object;
  onSucess: (params: object) => void;
  onFail?: (params: { message: string }) => void | undefined;
};

export type AddessItemProps = {
  data: any;
  onPresSetDefault: () => void;
  onPressDelete: () => void;
};

export type IconButtonProps = {
  icon: ImageSourcePropType;
  label: string;
  containerStyle?: ViewStyle;
  onPress: () => void;
  isSelected: boolean;
};

export type PaymentItemProps = {
  data: any;
  onItemPress?: () => void;
  selectedId: number | null | undefined | string;
  index: number;
  cashAmount?: number;
};

export type OrderItemProps = {
  data: any;
};

export type BannerItemProps = {
  id: number;
  image: string | undefined;
  link_to: string | undefined;
  link_id: string | undefined;
  created_at: string | undefined;
};

export type CartItemProps = {
  data: any;
  onUpdateQuantity: (value: number) => void;
  itemContainer?: ViewStyle;
  onPressRemoveItem: () => void;
};
export type MyOrderItemProps = {
  data: any;
  onPress: () => void;
};

export type RemoveModalProps = {
  isVisible: boolean;
  title: string;
  question: string;
  onPressYes: () => void;
  onPressCancel: () => void;
};
export type LogoutModalProps = {
  isVisible: boolean;
  title: string;
  question: string;
  onPressYes: () => void;
  onPressNo: () => void;
  source: ImageRequireSource;
  iconStyle?: ImageStyle;
};

export type CardItemProps = {
  data: any;
};

export type NotificationItemProps = {
  data: any;
};

export type DropdownComponentProps = {
  value: string;
  data: any;
  setValue: (value: string) => void;
  label?: string;
  placeholder: string;
  containerStyle?: ViewStyle;
  onBlur?: () => void;
  onFocus?: () => void;
};
