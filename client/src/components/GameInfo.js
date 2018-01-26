import React from "react";
import { connect } from "react-redux";
import { addGame } from "../actions/wishList";
import { removeGameFromSearch } from "../actions/currentSearch";

export class GameInfo extends React.Component {
    onClick = () => {
        this.props.dispatch(
            addGame({
                id: this.props.game.id,
                name: this.props.game.name,
                summary: this.props.game.summary,
                cover: this.props.game.cover,
                url: this.props.game.url,
                rating: this.props.game.rating
            })
        );
        this.props.dispatch(removeGameFromSearch({ id: this.props.game.id }));
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
                <button
                    className="ion-heart games-list__item__button"
                    onClick={this.onClick}
                />
            </div>
        );
    }
}

export default connect()(GameInfo);
