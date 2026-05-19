import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Hero() {
  return (
    <>
      <h2>
        A Real-Time Collaborative Whiteboard{" "}
        <Typography variant="body2" component="span" gutterBottom>
          By Pramod Boda
        </Typography>
      </h2>
      <h3>How to Test</h3>
      <Typography variant="body1">
        <ol>
          <li>Open the whiteboard application.</li>
          <li>Draw something on the canvas using the pen tool.</li>
          <li>
            Open the same URL:{" "}
            <Link
              href="https://collaborative-whiteboard-nu.vercel.app/"
              target="_blank"
            >
              Collaborative Whiteboard
            </Link>
            <ul>
              <li>in a new browser tab</li>
              <li>in another browser</li>
              <li>or on different devices connected to the internet</li>
            </ul>
          </li>
          <li>Start drawing from any device or tab.</li>
          <li>
            Watch all changes appear instantly across every connected screen in
            real time.
          </li>
        </ol>
      </Typography>
      {/* <Typography variant="h4" gutterBottom>
        A Real-Time Collaborative Whiteboard
      </Typography> */}
    </>
  );
}
