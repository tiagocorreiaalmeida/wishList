import React from "react";
import { connect } from "react-redux";
import { addGameSync, removeGameSync } from "../actions/wishList";
import { removeGameFromSearch } from "../actions/currentSearch";

export class GameInfo extends React.Component {
    onClick = () => {
        if (!this.props.wishList) {
            this.props.addGame({
                id: this.props.game.id,
                name: this.props.game.name,
                summary: this.props.game.summary,
                cover: this.props.game.cover,
                url: this.props.game.url,
                rating: this.props.game.rating
            });
            this.props.removeFromSearch(this.props.game.id);
        } else {
            this.props.removeGames(this.props.game.id);
        }
    };
    render() {
        return (
            <div className="games-list__item">
                <div className="games-list__item__top">
                    <img
                        className="games-list__item__top__img"
                        src={this.props.game.cover ? this.props.game.cover : ""}
                        alt="game cover"
                    />
                    <div className="games-list__item__top__rating">
                        <i className="ion-ios-star games-list__item__top__rating__icon" />
                        <p className="games-list__item__top__rating__rate">
                            {this.props.game.rating}
                        </p>
                    </div>
                </div>
                <div className="games-list__item__bottom">
                    <a
                        href={this.props.game.url}
                        target="_blank"
                        className="games-list__item__bottom__title"
                    >
                        {this.props.game.name}
                    </a>
                    <p>
                        {this.props.game.summary
                            ? this.props.game.summary
                            : "No description found"}
                    </p>
                </div>
                {this.props.game.owned ? (
                    <button className="games-list__item__button games-list__item__button--active">
                        <i className="ion-checkmark-circled" /> owned
                    </button>
                ) : (
                    <button
                        className={
                            this.props.wishList
                                ? "ion-trash-a games-list__item__button"
                                : "ion-heart games-list__item__button"
                        }
                        onClick={this.onClick}
                    />
                )}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addGame: game => dispatch(addGameSync(game)),
    removeFromSearch: id => dispatch(removeGameFromSearch(id)),
    removeGames: id => dispatch(removeGameSync(id))
});

export default connect(undefined, mapDispatchToProps)(GameInfo);
