import React from "react";

const DubaiMap = () => {
  // Replace this URL with your actual business location share link from Google Maps
  const mapLocation =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1m3!1d115507.28827471616!2d55.20165561110055!3d25.19720182873833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae";

  return (
    <div className="w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl border border-gray-100">
      <iframe
        title="Valor Boats Dubai Location"
        src={mapLocation}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="grayscale-[0.2] contrast-[1.1]" // Subtle styling to match your luxury UI
      ></iframe>
    </div>
  );
};

export default DubaiMap;
