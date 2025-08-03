import authorImage from 'assets/images/Author-image2.png'


export default function AuthorInfo() {
    return (
        <div className="container reverse">
        <div className="info-text">
          <h2>About the Author</h2>
          <p>
            I am a second-year student at Belarusian State University of
            Informatics and Radioelectronics (BSUIR), currently studying
            Computer Engineering, specializing in programming hardware and
            developing software for embedded mobile systems. As a participant in
            the RS School React course, I am expanding my skills in modern
            frontend development.
          </p>
        </div>
        <img src={authorImage} alt="" className='about-image'/>
      </div>
    )
}