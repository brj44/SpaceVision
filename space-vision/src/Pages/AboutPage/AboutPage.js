import './AboutPage.css'
function AboutPage(){



    return(
        <>
            <h1 className="header">About SpaceVision</h1>
            <div className="About">SpaceVision was made to allow users to access data from NASA API's without having to generate their own key.
            Users can search the NASA Photo and Video library by keywords using the search bar, and can also see the picture of the day from NASA on the APOD page. There are still more feautures available for use.
            SpaceVision was created in 2022 as a team project for the semester.
            </div>
            
            <p className="createdBy">Created by Benito Juarez, Tara Meazell, Matvey Lubaev and Rayyan Khan </p>
        </>
    )
}

export default AboutPage;