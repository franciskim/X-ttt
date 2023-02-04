import React, { Component } from 'react'
import { Link } from 'react-router'

import SetName from './SetName'
import SetGameType from './SetGameType'

import GameMain from './GameMain'

export default class Watch extends Component {

    constructor(props) {
        super(props)

        this.state = {
            game_step: this.set_game_step()
        }
    }

    //	------------------------	------------------------	------------------------

    render() {

        const { game_step } = this.state

        console.log(game_step)

        return (
            <section id='TTT_game'>
                <div id='page-container'>
                    {game_step == 'set_name' && <SetName
                        onSetName={this.saveUserName.bind(this)}
                    />}

                    {game_step != 'set_name' &&
                        <div>
                            <h2>Welcome, {app.settings.curr_user.name}</h2>
                        </div>
                    }

                    {game_step == 'set_game_type' && <SetGameType
                        onSetType={this.saveGameType.bind(this)}
                    />}
                    {game_step == 'start_game' && <GameMain
                        game_type={this.state.game_type}
                        onEndGame={this.gameEnd.bind(this)}
                    />}

                </div>
            </section>
        )
    }

}

//	------------------------	------------------------	------------------------

Watch.propTypes = {
    params: React.PropTypes.any
}

Watch.contextTypes = {
    router: React.PropTypes.object.isRequired
}