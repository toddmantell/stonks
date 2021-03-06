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
    stonksAreFromLocalStorage: false,
    VOO: {},
  };
  apiUrl = getDevOrProdAPIURL();

  async componentDidMount() {
    if (this.state.stonks.length) return;
    try {
      await this.setStateFromServerOrLocalStorage();
    } catch (error) {
      console.log("Error in componentDidMount: ", error);
    }
  }

  async setStateFromServerOrLocalStorage() {
    try {
      if (localStorage.stonks && localStorage.stonks === "undefined")
        localStorage.removeItem("stonks");

      const VOOResult = await get(`${this.apiUrl}/api/stock/quote/VOO`);

      const userResult = await get(
        `${this.apiUrl}/api/user/3a2d78d0-fccb-11e9-89d5-ed165fddd755`
      );

      // if either of the fetches fail, DON't check for updated stonks
      if (
        userResult.stonks &&
        userResult.stonks.length &&
        VOOResult &&
        VOOResult.symbol
      ) {
        return await this.checkForUpdatesAndUpdateLocalStorage(
          userResult,
          VOOResult
        );
      }

      this.updateFromLocalIfNoUpdates();
    } catch (error) {
      console.log("An error occurred: ", error);
      this.updateFromLocalIfNoUpdates();
    }
  }

  // if we get valid results from fetch, check to see if any values are new
  async checkForUpdatesAndUpdateLocalStorage(userResult, VOOResult) {
    const updated = this.checkForUpdatedStonks(userResult.stonks);

    if (updated) {
      // stringify is necessary because items in local storage are stored as strings
      localStorage.stonks = JSON.stringify(userResult.stonks);
      localStorage.VOO = JSON.stringify(VOOResult);
    }

    this.setState({
      isLoading: false,
      stonks: userResult.stonks,
      stonksAreFromLocalStorage: false,
      user: userResult,
      VOO: VOOResult,
    });
  }

  checkForUpdatedStonks(stonks) {
    if (localStorage.stonks) {
      for (let i = 0; i < stonks.length; i += 1) {
        const stonksInLocalStorage = JSON.parse(localStorage.stonks);

        const currentStonkInStorage =
          stonksInLocalStorage.length &&
          stonksInLocalStorage.find(
            (stonk) => stonk.symbol === stonks[i].symbol
          );

        if (
          currentStonkInStorage &&
          currentStonkInStorage.latestPrice !== stonks[i].latestPrice
        ) {
          return true;
        }
      }
    }

    return false;
  }

  updateFromLocalIfNoUpdates() {
    if (
      this.state.updated === false &&
      localStorage.stonks &&
      localStorage.VOO
    ) {
      this.setState({
        isLoading: false,
        stonks: JSON.parse(localStorage.stonks),
        stonksAreFromLocalStorage: true,
        user: {},
        VOO: JSON.parse(localStorage.VOO),
      });
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

  removeStonk = async (stonkSymbol) => {
    try {
      const result = await post(`${this.apiUrl}/api/stock/remove`, stonkSymbol);
      if (result)
        return this.setState({
          stonks: this.state.stonks.filter(
            (stonk) => stonk.symbol !== stonkSymbol
          ),
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
          removeStonk: this.removeStonk,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
