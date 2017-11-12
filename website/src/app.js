import React from 'react'
import gameIcon from './gameIcon.png'

export default () => (
  <div style={{ textAlign: 'center' }}>
    <img src={gameIcon} style={{ width: '256px' }} />
    <h1 className="header">Sombrio</h1>
    <div className="background" />
    <div className="downloads">
      <a className="download" href={process.env.MAC_DOWNLOAD_URL || '#mac'}>
        Mac x64
      </a>
      <a className="download" href={process.env.WINDOWS_DOWNLOAD_URL || '#windows'}>
        Windows x64
      </a>
      <a className="download" href={process.env.LINUX_DOWNLOAD_URL || '#linux'}>
        Linux x64 (*)
      </a>
    </div>
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}
    >
      <GitHubIcon />
      <a
        style={{ color: 'white', textAlign: 'center', marginLeft: '10px' }}
        href="https://github.com/Hackbit/nko2017-sombrio"
      >
        Fork me on GitHub
      </a>
    </div>
    <div>
      <p>{process.env.APP_VERSION}</p>
    </div>
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: '#FFFFFF',
        margin: '10px 0',
      }}
    >
      <div className="instructions">
        <p>
          <strong>There is a Monster chasing you.</strong> Your objective is escaping your horrible
          fate by running around the strange Maze Reality you are in while building/removing walls.
          The longer you survive the better ;)
        </p>
        <p>
          Some walls will vanish or appear now and then, blocking your way or heping you (who knows,
          huh?). It is the very magical nature of the Maze Reality affecting you. Only this is not
          completely true.
        </p>
        <p>
          Sombrio is a peer-to-peer game built on top of SSB (Secure Scuttlebut). Just gather your
          friends and play a LAN game.
        </p>
      </div>
      <div>
        <h2>Linux preconditions</h2>
        <p>
          To run Sombrio on Linux you need to have <strong>libgconf-2.so.4</strong> installed.
        </p>
        <p>Example (Ubuntu):</p>
        <pre>sudo apt-get install libgconf-2-4</pre>
      </div>
    </div>
  </div>
)

const GitHubIcon = () => (
  <span style={{ width: '30px', display: 'inline-block' }}>
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="white"
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
      />
    </svg>
  </span>
)
