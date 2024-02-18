import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ReactPlayer from "react-player";
import PauseIcon from "@mui/icons-material/Pause";
import { useState, useRef } from "react";

export default function SongTab({ nft }) {
  const [played, setPlayed] = useState(0);
  const playerRef = useRef(null);

  const handlePlay = () => {
    setIsPlaying(true);
    playerRef.current.seekTo(played);
  };

  const handleSeek = (e) => {
    setPlayed(parseFloat(e.target.value));
    playerRef.current.seekTo(parseFloat(e.target.value));
  };

  const handleProgress = (state) => {
    if (!isPlaying) {
      setPlayed(state.played);
    }
  };

  const theme = useTheme();
  const [isPlaying, setIsPlaying] = React.useState(false);
  console.log("nft in songtab", nft);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ display: "flex", background: "black" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                sx={{ color: "white", fontWeight: "bold" }}
                component="div"
                variant="h5"
              >
                {nft.nftName}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                {nft.nftDescription}
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              <IconButton aria-label="previous">
                {theme.direction === "rtl" ? (
                  <SkipNextIcon />
                ) : (
                  <SkipPreviousIcon />
                )}
              </IconButton>
              <IconButton aria-label="play/pause" onClick={handleTogglePlay}>
                {isPlaying ? (
                  <PauseIcon
                    sx={{
                      color: "white",
                      height: 38,
                      width: 38,
                    }}
                  />
                ) : (
                  <PlayArrowIcon
                    sx={{ color: "white", height: 38, width: 38 }}
                  />
                )}
              </IconButton>
              <IconButton aria-label="next">
                {theme.direction === "rtl" ? (
                  <SkipPreviousIcon />
                ) : (
                  <SkipNextIcon />
                )}
              </IconButton>
            </Box>
          </Box>
          <ReactPlayer
            url={nft.nftUrl}
            playing={isPlaying}
            height="0"
            width="0"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onProgress={handleProgress}
          />
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={played}
            onChange={handleSeek}
            style={{ width: "100%" }}
          />
          <button onClick={handlePlay}>Play from {played} second</button>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            src={nft.thumbnailUrl}
            alt={nft.nftName}
          />
        </Card>
      </div>
    </>
  );
}
