import "./HeroBanner.css";

export default function HeroBanner({totalLetters = 0}) {
    return (<section className="hero">
        <div className="hero__overlay"/>

        <div className="hero__container">
            <div className="hero__content">
          <span className="hero__eyebrow">
            NUESTRAS CARTAS
          </span>

                <h1 className="hero__title">
                    Cartas para Ti
                    <span className="hero__title-heart" aria-hidden="true">
              ♡
            </span>
                </h1>

                <p className="hero__description">
                    Un espacio solo nuestro,
                    <br/>
                    donde guardo todas las cosas que siento.
                    <br/>
                    Palabras, recuerdos, canciones y momentos
                    <br/>
                    que hacen única nuestra historia.
                </p>

                <p className="hero__signature">
                    Gracias por ser mi persona
                    <span aria-hidden="true"> ♡</span>
                </p>
            </div>

            <div className="hero__counter">
          <span
              className="hero__counter-heart"
              aria-hidden="true"
          >
            ♡
          </span>

                <strong className="hero__counter-number">
                    {totalLetters}
                </strong>

                <span className="hero__counter-label">
            cartas
          </span>

                <p className="hero__counter-description">
                    y seguimos
                    <br/>
                    escribiendo
                    <br/>
                    nuestra historia
                </p>

                <span
                    className="hero__counter-footer-heart"
                    aria-hidden="true"
                >
            ♡
          </span>
            </div>
        </div>
    </section>);
}