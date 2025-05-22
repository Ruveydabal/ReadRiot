import "../css/Profile.scss";
import Nav from "./Nav.jsx";
import ProfileDetails from "./ProfileDetails.jsx";
import ProfileMessages from "./ProfileMessages.jsx";
import Footer from "./Footer.jsx";

const ProfileDetailsPage = () => {

    return (
        <div>
            <Nav />
            <ProfileDetails />
            <ProfileMessages />
            <Footer />
        </div>
    )   
}

export default ProfileDetailsPage;