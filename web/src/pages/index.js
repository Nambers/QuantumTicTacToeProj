import React from 'react'
import './index.css'
import {Game} from '../components/game.js'
import '@elastic/eui/dist/eui_theme_light.css'
import {EuiProvider} from '@elastic/eui';

const index = () => {
  return (
    <EuiProvider colorMode="light">
      <Game />
    </EuiProvider>
  )
}
export default index;