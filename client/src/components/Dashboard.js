import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import GamesList from "./GamesList";
import { setSearch } from "../actions/currentSearch";

export class Dashboard extends React.Component {
    state = {
        search: "",
        error: "",
        offset: 0,
        games: [],
        searching: false,
        complete: false,
        lastSearch: ""
    };
    componentDidMount() {
        let state = this.props.currentSearch;
        this.setState(() => state);
    }
    componentDidUpdate() {
        //error:adding to wishlist updates the state on the action and on the component stoping it from changing
        this.props.dispatch(setSearch(this.state));
    }

    getGames = () => {
        axios
            .get(
                `/api/idgb?search=${this.state.search}&offset=${
                    this.state.offset
                }`
            )
            .then(response => {
                this.setState(prevState => ({
                    games: prevState.games.concat(response.data),
                    searching: false,
                    error: "",
                    lastSearch: this.state.search
                }));
            })
            .catch(e => {
                let stateChanges = {
                    searching: false,
                    lastSearch: this.state.search
                };
                switch (e.response.data.error) {
                    case "not-found":
                        stateChanges.error =
                            "No games found based on your search";
                        break;
                    case "all-games-listed":
                        stateChanges.error =
                            "All the games are allready listed";
                        stateChanges.complete = true;
                        break;
                    default:
                        console.log(e.response.data.error);
                        stateChanges.error =
                            "Something went wrong please refresh the page and try again";
                }
                this.setState(() => stateChanges);
            });
    };

    onSearchChange = e => {
        let search = e.target.value;
        this.setState(() => ({
            search,
            offset: 0,
            games: []
        }));
    };

    showMore = () => {
        this.setState(
            prevState => {
                return { offset: (prevState.offset += 5), searching: true };
            },
            () => {
                this.getGames();
            }
        );
    };

    onKeyPress = e => {
        if (
            e.key === "Enter" &&
            this.state.search !== "" &&
            this.state.search !== this.state.lastSearch
        ) {
            this.setState(
                () => {
                    return { searching: true };
                },
                () => {
                    this.getGames();
                }
            );
        }
    };

    search = () => {
        if (
            this.state.search !== "" &&
            this.state.search !== this.state.lastSearch
        ) {
            this.getGames();
        }
    };

    render() {
        return (
            <div>
                <div className="page-heading">
                    <div className="wrapper">
                        <h1 className="heading-primary">
                            Add games to your wishlist
                        </h1>
                    </div>
                </div>
                <div className="wrapper">
                    <input
                        type="text"
                        onChange={this.onSearchChange}
                        value={this.state.search}
                        placeholder="Search by game name"
                        disabled={this.state.searching}
                        onKeyPress={this.onKeyPress}
                    />
                    <button
                        onClick={this.search}
                        disabled={this.state.searching}
                    >
                        Search
                    </button>
                    <GamesList games={this.state.games} />
                    <div
                        className={`sk-fading-circle ${
                            this.state.searching ? "active" : ""
                        }`}
                    >
                        <div className="sk-circle1 sk-circle" />
                        <div className="sk-circle2 sk-circle" />
                        <div className="sk-circle3 sk-circle" />
                        <div className="sk-circle4 sk-circle" />
                        <div className="sk-circle5 sk-circle" />
                        <div className="sk-circle6 sk-circle" />
                        <div className="sk-circle7 sk-circle" />
                        <div className="sk-circle8 sk-circle" />
                        <div className="sk-circle9 sk-circle" />
                        <div className="sk-circle10 sk-circle" />
                        <div className="sk-circle11 sk-circle" />
                        <div className="sk-circle12 sk-circle" />
                    </div>
                    {this.state.error && <p>{this.state.error}</p>}
                    {this.state.games.length > 0 &&
                        !this.state.error && (
                            <button
                                onClick={this.showMore}
                                disabled={this.state.searching}
                            >
                                Show more
                            </button>
                        )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentSearch: state.currentSearch
});

export default connect(mapStateToProps)(Dashboard);
