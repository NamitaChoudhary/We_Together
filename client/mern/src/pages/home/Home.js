import React from 'react';
import Toolbar from '../../components/toolbar/Toolbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar';
import './home.css'

function Home() {
  return (<>
      <Toolbar />
      <div className='homeContainer'>
        <Sidebar/>
        <Feed/>
        <Rightbar/>
      </div>
     
  </>
  )
}

export default Home;
