# TIC TAC TOE WORLD CHAMPIONSHIP!

A fun & simple modification by Francis Kim.

![](demo.gif)

## What was done

- Added build step in `package.json` to copy compiled/built files to relevant `WS` directory.
- Fix O and X to the player (instead of the player taking turn always being X) for consistency when watching.
- Add a new React view to allow watching.
- Modify and add socket.io functionalities to allow watching by multiple viewers across the world.
- Improve little things like allow `Enter/Return` key to work immediately (add `form` tag, autofocus on input) when entering player name.

## What was not done

- Code linting / tidy
- Allow multiple games to be broadcasted simultaneously 
- Optimise socket.io code

# A simple example of a full multiplayer game web app built with React.js and Node.js stack

Major libraries used on front end:
- react
- webpack
- babel
- react-router
- ampersand
- sass
- jest

Major libraries used on server:
- node.js
- socket.io
- express

### Folder structure:
- **WS** - server side and compiled front end
- **react_ws_src** - React development source and testing

---

### View it online at 
https://x-ttt.herokuapp.com/

#### Configurable with external XML file - 
https://x-ttt.herokuapp.com/ws_conf.xml

---

##For demonstration purposes only.
