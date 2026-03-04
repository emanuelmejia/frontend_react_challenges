import React from "react";

//imports
import cardImage from "../../img/project-image.png";
import Navbar from "./navbar";
import Jumbotron from "./jumbotron";
import SingleCard from "./card";
import Footer from "./footer";

const defCardTitle = "Card Title";
const defCardText =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime tempora cupiditate optio asperiores cumque voluptatibus, quidem illo? Aliquam sapiente, eveniet, consequuntur explicabo cumque omnis architecto quidem iste dolor, tempora optio!";

//create your first component
const Home = () => {
  return (
    <div className="text-center">
      <Navbar />
      <Jumbotron />
      <div className="container-fluid">
        <div class="row mx-4">
          <SingleCard
            title={defCardTitle}
            text={defCardText}
            imageURL={cardImage}
          />
          <SingleCard
            title={defCardTitle}
            text={defCardText}
            imageURL={cardImage}
          />
          <SingleCard
            title={defCardTitle}
            text={defCardText}
            imageURL={cardImage}
          />
          <SingleCard
            title={defCardTitle}
            text={defCardText}
            imageURL={cardImage}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
