import * as React from "react";
import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import ViewPost from "../components/ViewPost";

function FeedPage() {
  return (
    <div>
      <Navbar/>
      <CreatePost/>
      <ViewPost
        author="Name of the Creator"
        date="Date"
        title="Title of the content"
        content="Content of the post"
      />
    </div>
  );
}

export default FeedPage;