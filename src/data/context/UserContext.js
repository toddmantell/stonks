import React, { Component } from "react";
import getStonks, { getDevOrProdAPIURL } from "../getStonks";
import { get, post } from "../fetchWrapper";

const UserContext = React.createContext();
export default UserContext;

//the old class way
export class UserProvider extends Component {
  state = { user: {}, stonks: [], updated: false, isLoading: true };
  apiUrl = getDevOrProdAPIURL();
  async componentDidMount() {
    if (this.state.stonks.length) return;
    try {
      const result = await get(
        `${this.apiUrl}/api/user/3a2d78d0-fccb-11e9-89d5-ed165fddd755`
      );
      // We can probably get rid of the getStonks method since we're storing them with the user
      // const result = await getStonks();

      if (!result.stonks.length) {
        // we probably would rather have a better UX for this, but for a ProofOfC this suffices
        window.alert("Failed to retrieve stonks. You are viewing stale data.");
        return this.setState({ stonks: JSON.parse(localStorage.stonks) });
      }

      return this.checkForUpdatedStonks(result);
    } catch (error) {
      console.log(error);
    }
  }

  checkForUpdatedStonks(user) {
    const { updated } = this.state;

    if (localStorage.stonks) {
      for (let i = 0; i < user.stonks.length; i += 1) {
        const stonksInLocalStorage =
          localStorage.stonks && JSON.parse(localStorage.stonks);

        const currentStonkInStorage = stonksInLocalStorage.find(
          stonk => stonk.localTicker === user.stonks[i].localTicker
        );

        if (currentStonkInStorage.latestPrice !== user.stonks[i].latestPrice) {
          this.setState({ updated: true });
        }
      }
    }

    if (updated === false && localStorage.stonks)
      return this.setState({ stonks: JSON.parse(localStorage.stonks) });

    this.setState({ user, stonks: user.stonks, isLoading: false });
    // stringify is necessary because items in local storage are stored as strings
    localStorage.stonks = JSON.stringify(user.stonks);
  }

  async addStonkToStonks(stonk, stonkQuote) {
    const { symbol, latestPrice } = stonkQuote;
    const stonkToSend = { ...stonk, ticker: symbol, latestPrice };

    // change this to add it to the user
    const result = await post(`${this.apiUrl}/api/stock/add`, stonkToSend);
    this.setState({ stonks: [...this.state.stonks, stonkToSend] });
    return true;
  }

  render() {
    return (
      <UserContext.Provider
        value={{ state: this.state, addStonkToStonks: this.addStonkToStonks }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

// hooks way (this is failing, possibly at the useEffect level)
// function UserContextProvider(props) {
//   console.log("context is executing");

//   const [stonks, setStonks] = useState([]);
//   const [updated, setUpdated] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await getStonks();

//         console.log("result", result);

//         if (!result.length) {
//           // we probably would rather have a better UX for this, but for a ProofOfC this suffices
//           window.alert(
//             "Failed to retrieve stonks. You are viewing stale data."
//           );
//           return setStonks(JSON.parse(localStorage.stonks));
//         }

//         return checkForUpdatedStonks(result);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     function checkForUpdatedStonks(fetchResult) {
//       for (let i = 0; i < fetchResult.length; i += 1) {
//         const stonksInLocalStorage =
//           localStorage.stonks && JSON.parse(localStorage.stonks);

//         const currentStonkInStorage = stonksInLocalStorage.find(
//           stonk => stonk.localTicker === fetchResult[i].localTicker
//         );

//         if (currentStonkInStorage.latestPrice !== fetchResult[i].latestPrice) {
//           setUpdated(true);
//         }
//       }

//       if (!updated) return setStonks(JSON.parse(localStorage.stonks));

//       setStonks(fetchResult);
//       // stringify is necessary because items in local storage are stored as strings
//       localStorage.stonks = JSON.stringify(fetchResult);
//     }

//     fetchData();
//   }, []);

//   console.log("stonks in context", stonks);

//   return (
//     <UserContext.Provider value={{ stonks, updated }}>
//       {props.children}
//     </UserContext.Provider>
//   );
// }
