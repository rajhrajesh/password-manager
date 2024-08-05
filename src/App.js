import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

const colorList = ['yellow', 'green', 'light-blue', 'orange', 'blue', 'red']

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    initialList: [],
    isTrue: false,
    isShow: false,
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeCheckBox = event => {
    this.setState({isShow: event.target.checked})
  }

  onDeleteList = id => {
    const {initialList} = this.state
    const updatedList = initialList.filter(eachItem => eachItem.id !== id)
    this.setState({
      initialList: updatedList,
      isTrue: updatedList.length > 0,
    })
  }

  onSubmitInputs = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const className = colorList[Math.floor(Math.random() * colorList.length)]
    const newValues = {
      id: uuidv4(),
      initialValue: initial,
      webSite: website,
      userName: username,
      Password: password,
      classNameAdd: className,
    }
    this.setState(prevState => ({
      initialList: [...prevState.initialList, newValues],
      website: '',
      username: '',
      password: '',
      searchInput: '',
      isTrue: true,
    }))
  }

  render() {
    const {website, username, password, isShow, searchInput, initialList} =
      this.state
    let {isTrue} = this.state
    const newList = initialList.filter(eachItem =>
      eachItem.webSite.toLowerCase().includes(searchInput.toLowerCase()),
    )
    isTrue = newList.length > 0

    return (
      <div className="appContainer">
        <div className="app-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
        </div>
        <div className="inputs-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-image1"
          />
          <form className="form" onSubmit={this.onSubmitInputs}>
            <h1 className="form-heading">Add New Password</h1>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-images"
              />
              <input
                type="text"
                className="input-element"
                placeholder="Enter Website"
                onChange={this.onChangeWebsite}
                value={website}
              />
            </div>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-images"
              />
              <input
                type="text"
                className="input-element"
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
                value={username}
              />
            </div>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-images"
              />
              <input
                type="password"
                className="input-element"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-image2"
          />
        </div>
        <div className="result-container">
          <div className="result-header">
            <div className="header-part1">
              <h1 className="your-password">Your Passwords</h1>
              <p className="counter">{newList.length}</p>
            </div>
            <div className="header-part2">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                className="search-input"
                onChange={this.onChangeInput}
                value={searchInput}
                placeholder="Search"
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="show-password">
            <input
              type="checkbox"
              className="check-box"
              onChange={this.onChangeCheckBox}
              id="check"
            />
            <label htmlFor="check" className="check-label">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="empty-state">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="empty-state-image"
              />
              <p className="no-password">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="list-container">
              {newList.map(eachItem => (
                <li id={eachItem.id} key={eachItem.id} className="list-item">
                  <div className="initial-and-details">
                    <p className={`initial ${eachItem.classNameAdd}`}>
                      {eachItem.initialValue}
                    </p>
                    <div className="list-details">
                      <p className="website">{eachItem.webSite}</p>
                      <p className="website">{eachItem.userName}</p>
                      {!isShow && (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                          className="website-stars"
                        />
                      )}
                      {isShow && <p className="website">{eachItem.Password}</p>}
                    </div>
                  </div>
                  <button
                    data-testid="delete"
                    className="delete-button"
                    type="button"
                    onClick={() => this.onDeleteList(eachItem.id)}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="delete-icon"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
