import React from "react";

const Footer = () => {
    return (
        <div className="container-fluid bg-secondary text-white">
            <div className="row p-4">
                {/* Location Section */}
                <div className="col-md-4">
                    <h4 className="text-center">LOCATION</h4>
                    <p className="text-center">
                        We are located at Toll, Juja, 300 meters off the Thika Super Highway near Ruiru Sports Club.
                    </p>
                    {/* Embedded Google Map */}
                    <iframe
                        title="Caleb Motors Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.123456789!2d36.9581234!3d-1.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1a123456789%3A0xabcdef123456789!2sToll%2C%20Juja!5e0!3m2!1sen!2ske!4v1681234567890!5m2!1sen!2ske"
                        width="100%"
                        height="200"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>

                {/* Company Motto Section */}
                <div className="col-md-4 text-center">
                    <img src="images/ribon.jpg" alt="Caleb Motors" width="300" /><br /><br />
                    <h2>WE MAKE YOUR WISH COME TRUE</h2>
                </div>

                {/* Contact Section */}
                <div className="col-md-4">
                    <h4 className="text-center">CONTACT US</h4>
                    <form>
                        <textarea
                            className="form-control bg-secondary text-white"
                            placeholder="Leave a comment"
                            rows="5"
                        ></textarea>
                        <button className="btn btn-primary mt-3 w-100">Submit</button>
                    </form>
                    <h2 className="text-center mt-4">QUALITY THINGS FOR QUALITY PEOPLE</h2>
                </div>
            </div>

            {/* Marquee Section */}
            <marquee behavior="scroll" direction="left" className="text-warning">
                DRIVE SAFE
            </marquee>

            {/* Footer Section */}
            <footer className="text-white bg-dark text-center p-2">
                <h5>Developed by Caleb.M.Waweru &copy; 2025. All rights reserved.</h5>
            </footer>
        </div>
    );
};

export default Footer;