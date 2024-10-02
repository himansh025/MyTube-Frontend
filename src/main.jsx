import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Home from "./pages/Home.jsx";
import VideoPage from "./pages/VideoPage.jsx";
import Container from "./components/Container.jsx";
import CreatorProfile from "./pages/CreatorProfile.jsx";
import CustomizeChannel from "./pages/CustomizeChannel.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UploadVideo from "./components/UploadVideo.jsx";
import UploadTweet from "./components/UploadTweet.jsx";
import Subscribed from "./pages/Subscribed.jsx";
import UpdateTweet from "./components/UpdateTweet.jsx";
import UpdateVideo from "./components/UpdateVideo.jsx";
// import SearchResult from "./components/SearchResult.jsx";
import PlaylistPageOfUser from "./pages/PlaylistPageOfUser.jsx";
import Playlist from "./components/Playlist.jsx";
import CommentList from "./components/CommentList.jsx";
import Logout from "./components/Logout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "logout", // No leading slash here
        element: <Logout />,
      },
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/",
            element: <Container />,
          },
          {
            path: "creatorProfile/:username", // No leading slash here
            element: <CreatorProfile />,
            children: [
              {
                path: "videos", // No leading slash here
                element: <Container />,
              },
            
              {
                path: "tweets", // No leading slash here
                element: <CommentList />,
              },
              {
                path: "playlists", // No leading slash here
                element: <PlaylistPageOfUser />,
              },
            ],
          },
          {
            path: "customizeChannel",
            element: <CustomizeChannel />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "uploadVideo",
            element: <UploadVideo />,
          },
          {
            path: "postTweet",
            element: <UploadTweet />,
          },
          {
            path: "subscribed",
            element: <Subscribed />,
          },
          {
            path: "tweets/:tweetId",
            element: <UpdateTweet />,
          },
          {
            path: "update/video/:videoId",
            element: <UpdateVideo />,
          },
        ],
      },
      {
        path: "videos/:videoId",
        element: <VideoPage />,
      },
      {
        path: "playlist/:playlistId",
        element: <Playlist />,
      },
    ],
  },
]);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
