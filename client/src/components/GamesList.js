import React from "react";

import GameInfo from "./GameInfo";

export default props => (
    <div className="games-list mg-top-medium">
        {props.games.map((game, i) => <GameInfo game={game} key={i} />)}
    </div>
);
