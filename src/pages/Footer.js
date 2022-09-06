import React from 'react';

const Footer = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 mt-5">
                    <p className="text-muted text-center">Copyrigth &copy; {new Date().getFullYear()}</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;