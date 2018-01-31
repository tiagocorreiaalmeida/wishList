import React from "react";
import { connect } from "react-redux";

import GameInfo from "./GameInfo";
import { setMessages } from "../actions/messages";

class GameList extends React.Component {
    componentDidMount() {
        this.props.setMessages({
            error: "",
            success: ""
        });
    }
    render() {
        return (
            <div>
                {this.props.messages.error && (
                    <p className="text-center">
                        <i className="ion-ios-information" />{" "}
                        {this.props.messages.error}
                    </p>
                )}
                {this.props.messages.success && (
                    <p className="text-center">
                        <i className="ion-checkmark-circled" />{" "}
                        {this.props.messages.success}
                    </p>
                )}
                <div className="games-list">
                    {this.props.games.map((game, i) => (
                        <GameInfo
                            game={game}
                            wishList={this.props.wishList}
                            key={i}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    messages: state.messages
});

const mapDispatchToProps = dispatch => ({
    setMessages: messages => dispatch(setMessages(messages))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameList);
