function HourLoader() {
    return (
        <div className="loader-container show-top">
            <div className="hourglassBackground ">
                <div className="hourglassContainer">
                    <div className="hourglassCurves"></div>
                    <div className="hourglassCapTop"></div>
                    <div className="hourglassGlassTop"></div>
                    <div className="hourglassSand"></div>
                    <div className="hourglassSandStream"></div>
                    <div className="hourglassCapBottom"></div>
                    <div className="hourglassGlass"></div>
                </div>
            </div>
            <p>Waiting for the opponent to join...</p>
        </div>
    )
}

export default HourLoader