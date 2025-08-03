import rickAndMortyLogo from 'assets/images/rick-and-morty-logo.png'

export default function AppInfo() {
    return (
        <div className="container reverse">
        <div className="info-text">
          <h2>About the Application</h2>
          <p>
            Rick and Morty Character Search is a React application that allows
            users to search and explore characters from the Rick and Morty REST
            API, based on the television show Rick and Morty. Users can view
            detailed information about each character and easily navigate
            through results using pagination.
          </p>
        </div>
        <img src={rickAndMortyLogo} alt="Rick and Morty logo image" className='about-image'/>
      </div>
    )
}