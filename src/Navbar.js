import React from 'react'
import { Flex, Image } from '@chakra-ui/react'
import './styles/App.scss'
import pitch_icon from './images/new_pitch_logo.png'
import discord_icon from './images/discord_button.png'
import twitter_icon from './images/twitter_button.png'
import opensea_icon from './images/opensea_button.png'

function Navbar() {
  const url = window.location.href
  const isMintPage = url.includes('mint')
  return (
    <Flex
      className="pitchNavbar"
      marginTop={['4%', '1%']}
      justify="space-between"
    >
      <Image src={pitch_icon} className="pitchNavbarLogo" h="80%" />

      <Flex>
        <div style={{ cursor: 'pointer' }}>
          <Image
            src={opensea_icon}
            className="pitchOpenseaIcon"
            onClick={() =>
              window.open(
                'https://opensea.io/collection/pitch-og-pass',
                '_BLANK',
              )
            }
          />
        </div>
        <div style={{ cursor: 'pointer' }}>
          <Image
            src={discord_icon}
            className="pitchDiscordIcon"
            onClick={() =>
              window.open('http://discord.gg/HhJNjZjupz', '_BLANK')
            }
          />
        </div>
        <div style={{ cursor: 'pointer' }}>
          <Image
            src={twitter_icon}
            className="pitchTwitterIcon"
            onClick={() =>
              window.open('https://twitter.com/pitchweb3', '_BLANK')
            }
          />
        </div>
      </Flex>
    </Flex>
  )
}

export default Navbar
