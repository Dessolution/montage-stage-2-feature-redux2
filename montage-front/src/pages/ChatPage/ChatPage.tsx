import { Link } from "react-router-dom"
import { AppRoute } from "../../utils/const"
import './ChatPage.css'

const ChatPage: React.FC = () => {
  return (
    <div className="ChatPage">
      <h2>Chat</h2>
      <Link to={AppRoute.OrdersCurrent}><button>back</button></Link>
    </div>
  )
}

export default ChatPage;