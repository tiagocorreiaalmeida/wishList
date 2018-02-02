import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import GamesList from "./GamesList";
import { editGameSearch } from "../actions/currentSearch";
import { setMessages } from "../actions/messages";

export class Dashboard extends React.Component {
    getGames() {
        axios
            .get(
                `/api/idgb?search=${this.props.currentSearch.search}&offset=${
                    this.props.currentSearch.offset
                }`
            )
            .then(response => {
                this.props.editSearch({
                    games: this.props.currentSearch.games.concat(response.data),
                    searching: false,
                    lastSearch: this.props.currentSearch.search
                });
            })
            .catch(e => {
                let stateChanges = {
                    searching: false,
                    lastSearch: this.props.currentSearch.search
                };
                let error;
                switch (e.response.data.error) {
                    case "not-found":
                        error = "No games found based on your search";
                        break;
                    case "all-games-listed":
                        error = "All the games are allready listed";
                        stateChanges.complete = true;
                        break;
                    default:
                        error =
                            "Something went wrong please refresh the page and try again";
                }
                this.props.editSearch(stateChanges);
                this.props.setMessages({
                    error,
                    success: ""
                });
            });
    }
    onSearchChange = e => {
        this.props.setMessages({
            error: "",
            success: ""
        });
        let search = e.target.value;
        this.props.editSearch({
            search,
            offset: 0,
            games: []
        });
    };

    showMore = () => {
        this.props.setMessages({
            error: "",
            success: ""
        });
        this.props.editSearch({
            offset: (this.props.currentSearch.offset += 4),
            searching: true
        });
        this.getGames();
    };

    onKeyPress = e => {
        if (
            e.key === "Enter" &&
            this.props.currentSearch.search !== "" &&
            this.props.currentSearch.search !==
                this.props.currentSearch.lastSearch
        ) {
            this.props.setMessages({
                error: "",
                success: ""
            });
            this.props.editSearch({
                searching: true
            });
            this.getGames();
        }
    };

    search = () => {
        if (
            this.props.currentSearch.search !== "" &&
            this.props.currentSearch.search !==
                this.props.currentSearch.lastSearch
        ) {
            this.props.setMessages({
                error: "",
                success: ""
            });
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
                <div className="wrapper mg-bottom-medium">
                    <div className="text-center mg-bottom-medium">
                        <input
                            className="search-input"
                            type="text"
                            onChange={this.onSearchChange}
                            value={this.props.currentSearch.search}
                            placeholder="Search by game name"
                            disabled={this.props.currentSearch.searching}
                            onKeyPress={this.onKeyPress}
                        />
                        <button
                            className="search-input__button"
                            onClick={this.search}
                            disabled={this.props.currentSearch.searching}
                        >
                            Search
                        </button>
                    </div>
                    <GamesList games={this.props.currentSearch.games} />
                    <div
                        className={`sk-fading-circle ${
                            this.props.currentSearch.searching ? "active" : ""
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
                    {this.props.currentSearch.games.length > 0 &&
                        !this.props.messages.error && (
                            <div className="text-center">
                                <button
                                    className="btn btn--dark"
                                    onClick={this.showMore}
                                    disabled={
                                        this.props.currentSearch.searching
                                    }
                                >
                                    Show more<i className="ion-arrow-down-c btn--dark__icon" />
                                </button>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentSearch: state.currentSearch,
    messages: state.messages
});

const mapDispatchToProps = dispatch => ({
    editSearch: updates => dispatch(editGameSearch(updates)),
    setMessages: messages => dispatch(setMessages(messages))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
