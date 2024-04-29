import React from 'react'

function Loader() {
    return (
        <div className="loading-container">
            <div className="loader">
                <div className="cube">
                    <div className="face"></div>
                    <div className="face"></div>
                    <div className="face"></div>
                    <div className="face"></div>
                    <div className="face"></div>
                    <div className="face"></div>
                </div>
            </div>
            {/* <div className="fire">
                <div className="fire-left">
                    <div className="main-fire"></div>
                    <div className="particle-fire"></div>
                </div>
                <div className="fire-center">
                    <div className="main-fire"></div>
                    <div className="particle-fire"></div>
                </div>
                <div className="fire-right">
                    <div className="main-fire"></div>
                    <div className="particle-fire"></div>
                </div>
                <div className="fire-bottom">
                    <div className="main-fire"></div>
                </div>
            </div> */}
        </div>
    )
}

export default Loader