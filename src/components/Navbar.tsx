/* eslint-disable jsx-a11y/anchor-is-valid */
import { useHistory } from "react-router";
import { DatabaseService } from "../services/database.service";

const database = new DatabaseService()
const Navbar: React.FC<{ isBackButton: boolean }> = ({ isBackButton }) => {
  const history = useHistory()
  const user = database.getUser()
  const handleBack = () => {
    history.goBack()
  }

  const handleLogout = () => {
    database.clear()
    history.push('/login')
  }
  return (<>
    <div className="navbar bg-primary ">
      {isBackButton && <div className="flex-none text-white" onClick={handleBack}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></div>}
      <div className="flex-1 text-white">
        <a href="#" className="btn btn-ghost normal-case text-xl">CT POS</a>
      </div>
      <div className="flex-none">
        {/* <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </label>
            <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
              <div className="card-body">
                <span className="font-bold text-lg">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">View cart</button>
                </div>
              </div>
            </div>
          </div> */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full bg-white">
              {/* <img src="https://placeimg.com/80/80/people" alt="Profile" /> */}
              <p className="items-center my-3"> {user.name
                ? user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join(".")
                  .toUpperCase()
                : ""}</p>
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {/* <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li> */}
            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  </>)
}

export default Navbar;