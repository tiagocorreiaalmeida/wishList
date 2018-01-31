import React from "react";
import { connect } from "react-redux";
import GamesList from "./GamesList";

const WishList = props => (
    <div>
        <div className="page-heading">
            <div className="wrapper">
                <h1 className="heading-primary">Your wishlist</h1>
            </div>
        </div>
        <div className="wrapper mg-bottom-medium">
            <GamesList games={props.wishList} wishList={true} />
        </div>
    </div>
);

const mapStateToProps = state => ({
    wishList: state.wishList
});

export default connect(mapStateToProps)(WishList);
