import React, { Component } from "react";
import getStonks from "../getStonks";

//the old class way
class UserContextProvider extends Component {
  state = { stonks: [], updated: false };

  async componentDidMount() {
    try {
      const result = await getStonks();

      if (!result.length) {
        // we probably would rather have a better UX for this, but for a ProofOfC this suffices
        window.alert("Failed to retrieve stonks. You are viewing stale data.");
        return this.setState({ stonks: JSON.parse(localStorage.stonks) });
      }

      return this.checkForUpdatedStonks(result);
    } catch (error) {
      console.log(error);
    }
  }

  checkForUpdatedStonks(fetchResult) {
    const { stonks, updated } = this.state;

    if (localStorage.stonks) {
      for (let i = 0; i < fetchResult.length; i += 1) {
        const stonksInLocalStorage =
          localStorage.stonks && JSON.parse(localStorage.stonks);

        const currentStonkInStorage = stonksInLocalStorage.find(
          stonk => stonk.localTicker === fetchResult[i].localTicker
        );

        if (currentStonkInStorage.latestPrice !== fetchResult[i].latestPrice) {
          this.setState({ updated: true });
        }
      }
    }

    if (updated === false && localStorage.stonks)
      return this.setState({ stonks: JSON.parse(localStorage.stonks) });

    this.setState({ stonks: fetchResult });
    // stringify is necessary because items in local storage are stored as strings
    localStorage.stonks = JSON.stringify(fetchResult);
  }

  render() {
    const { stonks } = this.state;
    return (
      <UserContext.Provider
        value={{ user: undefined, stonks }}
      ></UserContext.Provider>
    );
  }
}

const UserContext = React.createContext(UserContextProvider);

export default UserContextProvider;

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
