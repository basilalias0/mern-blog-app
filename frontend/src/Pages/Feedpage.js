import * as React from "react";
import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import ViewPost from "../components/ViewPost";


function FeedPage() {
  return (
    <div>
      <Navbar/>
      <CreatePost/>
      <ViewPost/>
      
    </div>
  );
}

export default FeedPage;