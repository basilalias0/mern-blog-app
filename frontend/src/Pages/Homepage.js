import * as React from "react";
import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import ViewPost from "../components/ViewPost";


function HomePage() {
  return (
    <div>
      <Navbar/>
      <CreatePost/>
      <ViewPost/>
      
    </div>
  );
}

export default HomePage;