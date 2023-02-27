import * as React from 'react';
import CookieBanner from 'react-cookie-banner';

const styles = {
  banner: {
    fontFamily: 'Nunito',
    height: 80,
    background: 'rgba(31, 39, 49, 0.95)',
    backgroundSize: '30px 30px',
    backgroundColor: '',
    fontSize: '16px',
    fontWeight: 600,
    position: 'fixed',
    top: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 999,
    borderRadius: 5,
    // marginBottom: -10,
    // marginTop: -10
  },
  button: {
    position: 'static',
    border: '1px solid white',
    borderRadius: 4,
    width: 120,
    height: 40,
    background: 'transparent',
    color: 'white',
    fontSize: '14px',
    fontWeight: 600,
    opacity: 1,
    top: 0,
    marginTop: 0,
    right: 0,
    marginLeft: 40,
    marginRight: 32,
  },
  message: {
    display: 'block',
    lineHeight: 1.5,
    textAlign: 'left',
    color: '#ff4b4b',
    marginLeft: 32,
    // fontWeight: "bold"
    fontSize: '17px',
  },
  link: {
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export const Disclaimer = () => (
  <CookieBanner
    styles={styles}
    message="The Harmony Bitcoin bridge has been sunset. Users would not be able to bridge Bitcoin to Harmony. Existing users may redeem Bitcoin, which will be manually processed."
    onAccept={() => {}}
    cookie="btc-sunset-disclaimer"
    dismissOnScroll={false}
    dismissOnClick={false}
  />
);

// export const Disclaimer = () => (
//   <CookieBanner
//     styles={styles}
//     message="The BTC Bridge under maintenance. We will resume operation in under 24 hours."
//     onAccept={() => {}}
//     cookie="onebtc-info-accept-1"
//     cookieExpiration={{ "years": 0 }}
//     dismissOnScroll={false}
//     dismissOnClick={false}
//   />
// );
