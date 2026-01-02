import { InstagramEmbed } from "react-social-media-embed";

const InstagramFeed = () => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <InstagramEmbed
      url="https://www.instagram.com/valorpowerboats?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
      width={328}
      captioned
    />
  </div>
);

export default InstagramFeed
