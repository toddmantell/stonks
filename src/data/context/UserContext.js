import React, { Component } from "react";
import { getDevOrProdAPIURL } from "../getStonks";
import { get, post } from "../fetchWrapper";

const UserContext = React.createContext();
export default UserContext;

export class UserProvider extends Component {
  state = {
    user: {},
    stonks: [],
    updated: false,
    isLoading: true,
    VOO: {}
  };
  apiUrl = getDevOrProdAPIURL();

  async componentDidMount() {
    if (this.state.stonks.length) return;
    try {
      const userResult = await get(
        `${this.apiUrl}/api/user/3a2d78d0-fccb-11e9-89d5-ed165fddd755`
      );

      const VOOResult = await get(`${this.apiUrl}/api/stock/quote/VOO`);

      const updated = this.checkForUpdatedStonks(userResult.stonks);

      if (updated === false && localStorage.stonks)
        return this.setState({
          user: userResult,
          stonks: JSON.parse(localStorage.stonks),
          isLoading: false,
          VOO: VOOResult
        });

      this.setState({
        user: userResult,
        stonks: userResult.stonks,
        isLoading: false,
        VOO: VOOResult
      });
      // stringify is necessary because items in local storage are stored as strings
      localStorage.stonks = JSON.stringify(userResult.stonks);
    } catch (error) {
      console.log(error);
    }
  }

  checkForUpdatedStonks(stonks) {
    if (localStorage.stonks) {
      for (let i = 0; i < stonks.length; i += 1) {
        const stonksInLocalStorage =
          localStorage.stonks && JSON.parse(localStorage.stonks);

        const currentStonkInStorage = stonksInLocalStorage.find(
          stonk => stonk.symbol === stonks[i].symbol
        );

        if (currentStonkInStorage.latestPrice !== stonks[i].latestPrice) {
          return true;
        }
      }
    }
  }

  addStonkToStonks = async (userId, stonk) => {
    try {
      const payload = { userId, stonk };

      // change this to add it to the user
      const result = await post(`${this.apiUrl}/api/stock/add`, payload);
      result && this.setState({ stonks: [...this.state.stonks, result] });
      return true;
    } catch (error) {
      console.log("An error occurred: ", error);
    }
  };

  removeStonk = async stonkSymbol => {
    try {
      const result = await post(`${this.apiUrl}/api/stock/remove`, stonkSymbol);
      if (result)
        return this.setState({
          stonks: this.state.stonks.filter(
            stonk => stonk.symbol !== stonkSymbol
          )
        });
    } catch (error) {
      console.log("An error occurred: ", error);
    }
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          state: this.state,
          addStonkToStonks: this.addStonkToStonks,
          removeStonk: this.removeStonk
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
