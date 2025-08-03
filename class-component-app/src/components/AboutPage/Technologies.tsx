import technologiesImage from 'assets/images/technologies.png';

export default function Technologies() {
  return (
    <div className="container">
      <div className="info-text">
        <h2>Technologies Used</h2>
        <p>
          The app is built with React and TypeScript, making the code more
          organized and easier to work with. It uses React Router to let users
          move between pages without reloading. Data comes from a REST API, and
          everything runs smoothly thanks to Vite, which helps the app load and
          build really fast.
        </p>
      </div>
      <img src={technologiesImage} alt="" className="about-image" />
    </div>
  );
}
