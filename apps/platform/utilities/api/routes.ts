export enum APIRoute {
  // ANALYSIS
  ANALYSIS = "/analysis/",
  STRATEGY_SIM = "/strategy-simulation/",
  MARGIN_SIM = "/margin-simulation/",
  HEDGE_SIM = "/hedge-simulation/",
  WORKSPACE = "/analysis/workspaces/",

  // AUTH
  GET_OTP = "/auth/get-otp/",
  VERIFY_OTP = "/auth/verify-otp/",
  REFRESH = "/auth/refresh/",
  SIGN_IN = "/auth/signin/",
  SIGN_UP = "/auth/signup/",
  CHANGE_PASSWORD = "/auth/change-password/",
  SIGN_IN_WITH_LINKEDIN = "/auth/linkedin/",
  LINK_WITH_LINKEDIN = "/auth/linkedin/link/",
  LINKEDIN_EXIST = "/auth/linkedin-exist/",
  FORGOT_PASSWORD = "/auth/forgot-password/",
  USER = "/auth/user/",

  // DEFAULT MARKET
  DEFAULT_MARKET = "/market/",

  // FWD EFFECIENCY
  FWD_EFFICIENCY = "/market/fwd-efficiency/",

  // FX MOVEMENT
  FX_MOVEMENT = "/market/fx-movement/",

  // SPOT HISTORY
  SPOT_HISTORY = "/market/spot-history/",

  // STRATEGY
  STRATEGY = "/strategy-simulation/strategy/",

  // CURRENCY
  CURRENCIES_LIST = "/currency/",

  // PRICING
  SPOT_RATE = "/market/pricing/spot",
  FORWARD_RATE = "/market/pricing/forward",
  OPTION_PRICING = "/market/pricing/option",

  // SPOT DATA
  SPOT_DATA = "/time-series/spot-history/",
}
