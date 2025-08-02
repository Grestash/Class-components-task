
export default function AboutPage() {
  return (
    <div className="aboutWraper">
      <div className="appInfo">
        Rick and Morty Character Search is a React application that allows users
        to search and explore characters from the Rick and Morty REST API, based
        on the television show Rick and Morty. Users can view detailed
        information about each character and easily navigate through results
        using pagination.
      </div>
      <div className="technologiesWrapper">
        <p>Technologies Used</p>
        <ul>
          <li>React</li>
          <li>TypeScript</li>
          <li>React Router</li>
          <li>REST API</li>
          <li>Vite</li>
        </ul>
      </div>
      <div className="authorInfo">
        <p>
          I am a second-year student at Belarusian State University of
          Informatics and Radioelectronics (BSUIR), currently studying Computer
          Engineering, specializing in programming hardware and developing
          software for embedded mobile systems. As a participant in the RS
          School React course, I am expanding my skills in modern frontend
          development.
        </p>
      </div>
      <footer>
        <p>Created by Pavel Shliatskiy</p>
        <div className="links">
          <a href="">
            <img src="" alt="" />
          </a>
          <a href="">
            <img src="" alt="" />
          </a>
        </div>
      </footer>
    </div>
  );
}
