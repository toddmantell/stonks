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
    isLoading: true
  };
  apiUrl = getDevOrProdAPIURL();

  async componentDidMount() {
    if (this.state.stonks.length) return;
    try {
      const userResult = await get(
        `${this.apiUrl}/api/user/3a2d78d0-fccb-11e9-89d5-ed165fddd755`
      );

      const updated = this.checkForUpdatedStonks(userResult.stonks);

      if (updated === false && localStorage.stonks)
        return this.setState({
          user: userResult,
          stonks: JSON.parse(localStorage.stonks),
          isLoading: false
        });

      this.setState({
        user: userResult,
        stonks: userResult.stonks,
        isLoading: false
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
    console.log("userId", userId);

    const payload = { userId, stonk };

    // change this to add it to the user
    const result = await post(`${this.apiUrl}/api/stock/add`, payload);
    result && this.setState({ stonks: [...this.state.stonks, result] });
    return true;
  };

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
