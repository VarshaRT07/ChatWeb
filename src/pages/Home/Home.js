import './Home.css'
import { Sidebar } from '../Sidebar/Sidebar'
import Chat from '../../components/Chat/Chat'

export default function Home() {
  return (
    <div className="home">
      <div className="container">
  
     
        <Sidebar></Sidebar>
      
        <Chat></Chat>
      

      </div>
    </div>
  )
}
