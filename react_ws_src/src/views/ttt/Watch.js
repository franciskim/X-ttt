import React, { Component } from 'react'
import { Link } from 'react-router'
import io from 'socket.io-client'

import SetName from './SetName'
import SetGameType from './SetGameType'

import TweenMax from 'gsap'

export default class Watch extends Component {

    constructor(props) {
        super(props);
        this.win_sets = [
            ['c1', 'c2', 'c3'],
            ['c4', 'c5', 'c6'],
            ['c7', 'c8', 'c9'],

            ['c1', 'c4', 'c7'],
            ['c2', 'c5', 'c8'],
            ['c3', 'c6', 'c9'],

            ['c1', 'c5', 'c9'],
            ['c3', 'c5', 'c7']
        ]

        this.sock_start();
        this.state = {
            cell_vals: {}
        }
        // this.state = {
        //     game_step: this.set_game_step()
        // }
    }

    //	------------------------	------------------------	------------------------

    sock_start() {
        this.socket = io(app.settings.ws_conf.loc.SOCKET__io.u);
        this.socket.on('connect', function (data) {
            console.log('socket connected', data)
            this.socket.emit('watch');
        }.bind(this));
        this.socket.on('game_info', (data) => {
            console.log('gameinfo!', data);
            this.setState({
                player_x: data.player_x,
                player_o: data.player_o,
                cell_vals: data.cell_vals
            });
            console.log(this.state);
        });
        this.socket.on('turn', this.turn_live.bind(this));
    }

    turn_live(data) {

        console.log('turn_live', data);

        let { cell_vals } = this.state
        let empty_cells_arr = []

        const c = data.cell_id
        cell_vals[c] = data.side

        TweenMax.from(this.refs[c], 0.7, { opacity: 0, scaleX: 0, scaleY: 0, ease: Power4.easeOut })


        this.setState({
        	cell_vals: cell_vals
        })

        // this.state.cell_vals = cell_vals

        console.log(this.state);

        this.check_turn()
    }

    check_turn() {

        const { cell_vals } = this.state

        let win = false
        let set
        let fin = true


        for (let i = 0; !win && i < this.win_sets.length; i++) {
            set = this.win_sets[i]
            if (cell_vals[set[0]] && cell_vals[set[0]] == cell_vals[set[1]] && cell_vals[set[0]] == cell_vals[set[2]])
                win = true
        }


        for (let i = 1; i <= 9; i++)
            !cell_vals['c' + i] && (fin = false)

        // win && console.log('win set: ', set)

        if (win) {
            console.log('win!');
            this.refs[set[0]].classList.add('win')
            this.refs[set[1]].classList.add('win')
            this.refs[set[2]].classList.add('win')

            TweenMax.killAll(true)
            TweenMax.from('td.win', 1, { opacity: 0, ease: Linear.easeIn })

            this.setState({
                game_stat: (cell_vals[set[0]] == this.state.game_side ? 'You' : 'Opponent') + ' win',
                game_play: false
            })

            // this.socket && this.socket.disconnect();

        }
    }

    cell_cont(c) {
        const { cell_vals } = this.state

        return (<div>
            {cell_vals && cell_vals[c] == 'x' && <i className="fa fa-times fa-5x"></i>}
            {cell_vals && cell_vals[c] == 'o' && <i className="fa fa-circle-o fa-5x"></i>}
        </div>)
    }

    render() {
        const { cell_vals } = this.state
        console.log(cell_vals)

        return (
            <section id='TTT_game'>
                <div id='page-container'>
                    <div id='GameMain'>

                        <h1>{this.state.player_x} (X) VS {this.state.player_o} (O)</h1>

                        <div id="game_board">
                            <table>
                                <tbody>
                                    <tr>
                                        <td id='game_board-c1' ref='c1' > {this.cell_cont('c1')} </td>
                                        <td id='game_board-c2' ref='c2' className="vbrd"> {this.cell_cont('c2')} </td>
                                        <td id='game_board-c3' ref='c3' > {this.cell_cont('c3')} </td>
                                    </tr>
                                    <tr>
                                        <td id='game_board-c4' ref='c4' className="hbrd"> {this.cell_cont('c4')} </td>
                                        <td id='game_board-c5' ref='c5' className="vbrd hbrd"> {this.cell_cont('c5')} </td>
                                        <td id='game_board-c6' ref='c6' className="hbrd"> {this.cell_cont('c6')} </td>
                                    </tr>
                                    <tr>
                                        <td id='game_board-c7' ref='c7' > {this.cell_cont('c7')} </td>
                                        <td id='game_board-c8' ref='c8' className="vbrd"> {this.cell_cont('c8')} </td>
                                        <td id='game_board-c9' ref='c9' > {this.cell_cont('c9')} </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
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