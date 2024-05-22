import styled, { css } from "styled-components";
import { Color } from "../../styles";

// ICONS
import Activity from "./assets/icons/activity.svg";
import Analysis from "./assets/icons/analysis.svg";
import ArrowDown from "./assets/icons/arrow-down.svg";
import ArrowLeft from "./assets/icons/arrow-left.svg";
import ArrowRight from "./assets/icons/arrow-right.svg";
import ArrowUp from "./assets/icons/arrow-up.svg";
import Business from "./assets/icons/business.svg";
import Calendar from "./assets/icons/calendar.svg";
import Chart from "./assets/icons/chart.svg";
import CircleCheckFill from "./assets/icons/check-circle-fill.svg";
import CircleCheck from "./assets/icons/check-circle.svg";
import Check from "./assets/icons/check.svg";
import ChevronDown from "./assets/icons/chevron-down.svg";
import ChevronLeft from "./assets/icons/chevron-left.svg";
import ChevronRight from "./assets/icons/chevron-right.svg";
import ChevronUp from "./assets/icons/chevron-up.svg";
import Copy from "./assets/icons/copy.svg";
import Customize from "./assets/icons/customize.svg";
import Dashboard from "./assets/icons/dashboard.svg";
import Doc from "./assets/icons/doc.svg";
import Dollar from "./assets/icons/dollar.svg";
import Download from "./assets/icons/download.svg";
import Drag from "./assets/icons/drag.svg";
import Exchange from "./assets/icons/exchange.svg";
import Grid from "./assets/icons/grid.svg";
import Guidance from "./assets/icons/guidance.svg";
import Hedge from "./assets/icons/hedge.svg";
import Hide from "./assets/icons/hide.svg";
import Indicator from "./assets/icons/indicator.svg";
import Information from "./assets/icons/information.svg";
import Label from "./assets/icons/label.svg";
import Lightbulb from "./assets/icons/lightbulb.svg";
import List from "./assets/icons/list.svg";
import Loading from "./assets/icons/loading.svg";
import Management from "./assets/icons/management.svg";
import Margin from "./assets/icons/margin.svg";
import MarkToMarket from "./assets/icons/mark-to-market.svg";
import Market from "./assets/icons/market.svg";
import Menu from "./assets/icons/menu.svg";
import Message from "./assets/icons/message.svg";
import Notification from "./assets/icons/notification.svg";
import Payments from "./assets/icons/payments.svg";
import Pencil from "./assets/icons/pencil.svg";
import Percent from "./assets/icons/percent.svg";
import Pin from "./assets/icons/pin.svg";
import Playground from "./assets/icons/playground.svg";
import Plus from "./assets/icons/plus.svg";
import Premium from "./assets/icons/premium.svg";
import Question from "./assets/icons/question.svg";
import Remove from "./assets/icons/remove.svg";
import Reset from "./assets/icons/reset.svg";
import Search from "./assets/icons/search.svg";
import Settings from "./assets/icons/settings.svg";
import Share from "./assets/icons/share.svg";
import Show from "./assets/icons/show.svg";
import SidebarCollapse from "./assets/icons/sidebar-nav-collapse.svg";
import SidebarExpand from "./assets/icons/sidebar-nav-expand.svg";
import Strategy from "./assets/icons/strategy.svg";
import TickDown from "./assets/icons/tick-down.svg";
import TickUp from "./assets/icons/tick-up.svg";
import Trash from "./assets/icons/trash.svg";
import Upload from "./assets/icons/upload.svg";
import Warning from "./assets/icons/warning.svg";
import X from "./assets/icons/x.svg";

// FLAGS
import Algeria from "./assets/flags/algeria.svg";
import Angola from "./assets/flags/angola.svg";
import Argentina from "./assets/flags/argentina.svg";
import Australia from "./assets/flags/australia.svg";
import Azerbaijan from "./assets/flags/azerbaijan.svg";
import Belize from "./assets/flags/belize.svg";
import Bolivia from "./assets/flags/bolivia.svg";
import Botswana from "./assets/flags/botswana.svg";
import Brazil from "./assets/flags/brazil.svg";
import Bulgaria from "./assets/flags/bulgaria.svg";
import Burma from "./assets/flags/burma.svg";
import Canada from "./assets/flags/canada.svg";
import CentralAfricanRepublic from "./assets/flags/central-african-republic.svg";
import Chile from "./assets/flags/chile.svg";
import China from "./assets/flags/china.svg";
import Colombia from "./assets/flags/colombia.svg";
import Congo from "./assets/flags/congo.svg";
import CostaRica from "./assets/flags/costa-rica.svg";
import Croatia from "./assets/flags/croatia.svg";
import Czech from "./assets/flags/czech.svg";
import Denmark from "./assets/flags/denmark.svg";
import DominicanRepublic from "./assets/flags/dominican-republic.svg";
import Egypt from "./assets/flags/egypt.svg";
import Eswatini from "./assets/flags/eswatini.svg";
import Ethiopia from "./assets/flags/ethiopia.svg";
import EuropeanUnion from "./assets/flags/european-union.svg";
import Fiji from "./assets/flags/fiji.svg";
import Gambia from "./assets/flags/gambia.svg";
import Georgia from "./assets/flags/georgia.svg";
import Ghana from "./assets/flags/ghana.svg";
import Guatemala from "./assets/flags/guatemala.svg";
import Guinea from "./assets/flags/guinea.svg";
import Honduras from "./assets/flags/honduras.svg";
import HongKong from "./assets/flags/hong-kong.svg";
import Hungary from "./assets/flags/hungary.svg";
import Iceland from "./assets/flags/iceland.svg";
import India from "./assets/flags/india.svg";
import Indonesia from "./assets/flags/indonesia.svg";
import Iran from "./assets/flags/iran.svg";
import Israel from "./assets/flags/israel.svg";
import IvoryCoast from "./assets/flags/ivory-coast.svg";
import Japan from "./assets/flags/japan.svg";
import Jordan from "./assets/flags/jordan.svg";
import Kazakhstan from "./assets/flags/kazakhstan.svg";
import Kenya from "./assets/flags/kenya.svg";
import Kyrgyzstan from "./assets/flags/kyrgyzstan.svg";
import Laos from "./assets/flags/laos.svg";
import Lesotho from "./assets/flags/lesotho.svg";
import Liberia from "./assets/flags/liberia.svg";
import Madagascar from "./assets/flags/madagascar.svg";
import Malaysia from "./assets/flags/malaysia.svg";
import Mexico from "./assets/flags/mexico.svg";
import Mongolia from "./assets/flags/mongolia.svg";
import Morocco from "./assets/flags/morocco.svg";
import Mozambique from "./assets/flags/mozambique.svg";
import Namibia from "./assets/flags/namibia.svg";
import Nepal from "./assets/flags/nepal.svg";
import NewZealand from "./assets/flags/new-zealand.svg";
import Nigeria from "./assets/flags/nigeria.svg";
import Niue from "./assets/flags/niue.svg";
import Norway from "./assets/flags/norway.svg";
import Pakistan from "./assets/flags/pakistan.svg";
import Paraguay from "./assets/flags/paraguay.svg";
import Peru from "./assets/flags/peru.svg";
import Philippines from "./assets/flags/philippines.svg";
import PitcairnIslands from "./assets/flags/pitcairn-islands.svg";
import Poland from "./assets/flags/poland.svg";
import Romania from "./assets/flags/romania.svg";
import Russia from "./assets/flags/russia.svg";
import Rwanda from "./assets/flags/rwanda.svg";
import Samoa from "./assets/flags/samoa.svg";
import Senegal from "./assets/flags/senegal.svg";
import SierraLeone from "./assets/flags/sierra-leone.svg";
import Singapore from "./assets/flags/singapore.svg";
import SolomonIslands from "./assets/flags/solomon-islands.svg";
import SouthAfrica from "./assets/flags/south-africa.svg";
import SouthKorea from "./assets/flags/south-korea.svg";
import Sweden from "./assets/flags/sweden.svg";
import Switzerland from "./assets/flags/switzerland.svg";
import Taiwan from "./assets/flags/taiwan.svg";
import Tajikistan from "./assets/flags/tajikistan.svg";
import Thailand from "./assets/flags/thailand.svg";
import Togo from "./assets/flags/togo.svg";
import Tokelau from "./assets/flags/tokelau.svg";
import Tonga from "./assets/flags/tonga.svg";
import Tunisia from "./assets/flags/tunisia.svg";
import Turkey from "./assets/flags/turkey.svg";
import Turkmenistan from "./assets/flags/turkmenistan.svg";
import Uganda from "./assets/flags/uganda.svg";
import Ukraine from "./assets/flags/ukraine.svg";
import UnitedArabEmirates from "./assets/flags/united-arab-emirates.svg";
import UnitedKingdom from "./assets/flags/united-kingdom.svg";
import UnitedStates from "./assets/flags/united-states.svg";
import Uruguay from "./assets/flags/uruguay.svg";
import Vanuatu from "./assets/flags/vanuatu.svg";
import Venezuela from "./assets/flags/venezuela.svg";
import Vietnam from "./assets/flags/vietnam.svg";
import WesternSahara from "./assets/flags/western-sahara.svg";

// LOGOS
import Deaglo from "./logos/deaglo.svg";

export const ICON_NAMES = [
  "activity",
  "analysis",
  "arrow-down",
  "arrow-left",
  "arrow-right",
  "arrow-up",
  "business",
  "calendar",
  "chart",
  "check",
  "copy",
  "chevron-down",
  "chevron-left",
  "chevron-right",
  "chevron-up",
  "circle-check",
  "circle-check-fill",
  "customize",
  "dashboard",
  "doc",
  "dollar",
  "download",
  "drag-and-drop",
  "exchange",
  "grid",
  "guidance",
  "hedge",
  "hide",
  "indicator",
  "info",
  "label",
  "lightbulb",
  "list",
  "loading",
  "management",
  "margin",
  "market",
  "mark-to-market",
  "menu",
  "message",
  "notification",
  "payments",
  "pencil",
  "percent",
  "pin",
  "playground",
  "plus",
  "premium",
  "question",
  "remove",
  "reset",
  "search",
  "settings",
  "share",
  "show",
  "sidebar-collapse",
  "sidebar-expand",
  "strategy",
  "tick-down",
  "tick-up",
  "trash",
  "upload",
  "USA",
  "warning",
  "x",
] as const;

export const FLAG_NAMES = [
  "Algeria",
  "Angola",
  "Argentina",
  "Australia",
  "Azerbaijan",
  "Belize",
  "Bolivia",
  "Botswana",
  "Brazil",
  "Bulgaria",
  "Burma",
  "Canada",
  "Central African Republic",
  "Chile",
  "China",
  "Colombia",
  "Democratic Republic of the Congo",
  "Costa Rica",
  "Croatia",
  "Czech",
  "Denmark",
  "Dominican Republic",
  "Egypt",
  "Eswatini",
  "Ethiopia",
  "European Union",
  "Fiji",
  "Gambia",
  "Georgia",
  "Ghana",
  "Guatemala",
  "Guinea",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Israel",
  "Ivory Coast",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kyrgyzstan",
  "Laos",
  "Lesotho",
  "Liberia",
  "Madagascar",
  "Malaysia",
  "Mexico",
  "Mongolia",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "New Zealand",
  "Nigeria",
  "Niue",
  "Norway",
  "Pakistan",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn Islands",
  "Poland",
  "Romania",
  "Russia",
  "Rwanda",
  "Samoa",
  "Senegal",
  "Sierra Leone",
  "Singapore",
  "Solomon Islands",
  "South Africa",
  "South Korea",
  "Sweden",
  "Switzerland",
  "Taiwan",
  "Tajikistan",
  "Thailand",
  "Togo",
  "Tokelau",
  "Tonga",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom of Great Britain",
  "United States of America",
  "Uruguay",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Western Sahara",
] as const;

export const LOGO_NAMES = ["deaglo"] as const;

type SvgComponent = React.FC<React.SVGProps<SVGSVGElement>>;
export type IconName = (typeof ICON_NAMES)[number];
export type Flag = (typeof FLAG_NAMES)[number];
export type Logo = (typeof LOGO_NAMES)[number];

const styledIcon = (src: SvgComponent) => {
  return styled(src)<{
    color?: Color;
    fill?: Color;
    stroke?: Color;
    isFilled: boolean;
    isFlag: boolean;
  }>`
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
    min-width: max-content;
    ${(props) =>
      props.isFlag &&
      css`
        border-radius: 24px;
        border: 1px solid ${Color.NEUTRAL_500};
        overflow: hidden;
      `}
    & path {
      ${(props) => (props.isFilled ? `fill: ${props.color}` : `stroke: ${props.color}`)};
      ${(props) => props.fill && `fill: ${props.fill}`};
      ${(props) => props.stroke && `stroke: ${props.stroke}`};
      transition:
        0.3s ease fill,
        0.3s ease stroke;
    }
    & circle {
      ${(props) => props.color && `stroke: ${props.color}`};
      ${(props) => props.stroke && `stroke: ${props.stroke}`};
      transition: 0.15s ease stroke;
    }
  `;
};

const createIconRegistry = <T extends Record<string, SvgComponent>>(icons: T) => {
  return Object.fromEntries(Object.entries(icons).map(([name, svg]) => [name, styledIcon(svg)]));
};

// TODO: add assets here as required
export const iconRegistry = createIconRegistry({
  // ICONS
  activity: Activity,
  analysis: Analysis,
  "arrow-down": ArrowDown,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "arrow-up": ArrowUp,
  business: Business,
  calendar: Calendar,
  chart: Chart,
  check: Check,
  copy: Copy,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "chevron-up": ChevronUp,
  "circle-check": CircleCheck,
  "circle-check-fill": CircleCheckFill,
  customize: Customize,
  dashboard: Dashboard,
  doc: Doc,
  dollar: Dollar,
  download: Download,
  "drag-and-drop": Drag,
  exchange: Exchange,
  grid: Grid,
  guidance: Guidance,
  hedge: Hedge,
  hide: Hide,
  indicator: Indicator,
  info: Information,
  label: Label,
  lightbulb: Lightbulb,
  list: List,
  loading: Loading,
  management: Management,
  margin: Margin,
  market: Market,
  "mark-to-market": MarkToMarket,
  menu: Menu,
  message: Message,
  notification: Notification,
  payments: Payments,
  pencil: Pencil,
  percent: Percent,
  pin: Pin,
  playground: Playground,
  plus: Plus,
  premium: Premium,
  question: Question,
  remove: Remove,
  reset: Reset,
  search: Search,
  settings: Settings,
  share: Share,
  show: Show,
  "sidebar-collapse": SidebarCollapse,
  "sidebar-expand": SidebarExpand,
  strategy: Strategy,
  "tick-up": TickUp,
  "tick-down": TickDown,
  trash: Trash,
  upload: Upload,
  warning: Warning,
  x: X,

  // FLAGS
  Algeria: Algeria,
  Angola: Angola,
  Argentina: Argentina,
  Australia: Australia,
  Azerbaijan: Azerbaijan,
  Belize: Belize,
  Bolivia: Bolivia,
  Botswana: Botswana,
  Brazil: Brazil,
  Bulgaria: Bulgaria,
  Burma: Burma,
  Canada: Canada,
  "Central African Republic": CentralAfricanRepublic,
  Chile: Chile,
  China: China,
  Colombia: Colombia,
  "Democratic Republic of the Congo": Congo,
  "Costa Rica": CostaRica,
  Croatia: Croatia,
  Czech: Czech,
  Denmark: Denmark,
  "Dominican Republic": DominicanRepublic,
  Egypt: Egypt,
  Eswatini: Eswatini,
  Ethiopia: Ethiopia,
  "European Union": EuropeanUnion,
  Fiji: Fiji,
  Gambia: Gambia,
  Georgia: Georgia,
  Ghana: Ghana,
  Guatemala: Guatemala,
  Guinea: Guinea,
  Honduras: Honduras,
  "Hong Kong": HongKong,
  Hungary: Hungary,
  Iceland: Iceland,
  India: India,
  Indonesia: Indonesia,
  Iran: Iran,
  Israel: Israel,
  "Ivory Coast": IvoryCoast,
  Japan: Japan,
  Jordan: Jordan,
  Kazakhstan: Kazakhstan,
  Kenya: Kenya,
  Kyrgyzstan: Kyrgyzstan,
  Laos: Laos,
  Lesotho: Lesotho,
  Liberia: Liberia,
  Madagascar: Madagascar,
  Malaysia: Malaysia,
  Mexico: Mexico,
  Mongolia: Mongolia,
  Morocco: Morocco,
  Mozambique: Mozambique,
  Namibia: Namibia,
  Nepal: Nepal,
  "New Zealand": NewZealand,
  Nigeria: Nigeria,
  Niue: Niue,
  Norway: Norway,
  Pakistan: Pakistan,
  Paraguay: Paraguay,
  Peru: Peru,
  Philippines: Philippines,
  "Pitcairn Islands": PitcairnIslands,
  Poland: Poland,
  Romania: Romania,
  Russia: Russia,
  Rwanda: Rwanda,
  Samoa: Samoa,
  Senegal: Senegal,
  "Sierra Leone": SierraLeone,
  Singapore: Singapore,
  "Solomon Islands": SolomonIslands,
  "South Africa": SouthAfrica,
  "South Korea": SouthKorea,
  Sweden: Sweden,
  Switzerland: Switzerland,
  Taiwan: Taiwan,
  Tajikistan: Tajikistan,
  Thailand: Thailand,
  Togo: Togo,
  Tokelau: Tokelau,
  Tonga: Tonga,
  Tunisia: Tunisia,
  Turkey: Turkey,
  Turkmenistan: Turkmenistan,
  Uganda: Uganda,
  Ukraine: Ukraine,
  "United Arab Emirates": UnitedArabEmirates,
  "United Kingdom of Great Britain": UnitedKingdom,
  "United States of America": UnitedStates,
  Uruguay: Uruguay,
  Vanuatu: Vanuatu,
  Venezuela: Venezuela,
  Vietnam: Vietnam,
  "Western Sahara": WesternSahara,

  // LOGOS
  deaglo: Deaglo,
});

// These icons should be styled via fill instead of stroke
// TODO: add assets here as required
export const fillIcons: Array<IconName | Flag> = [
  "circle-check-fill",
  "indicator",
  "payments",
  "management",
  "playground",
  "premium",
  "guidance",
  "pencil",
  "tick-up",
  "tick-down",
  "hide",
  "upload",
  "warning",
];
