import React from 'react';
import { motion } from 'framer-motion';

export default function PhoneMockup({ imageSrc, imgUrl, videoUrl, alt }) {
  return (
    <motion.div 
      className="phone-mockup"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'relative',
        maxWidth: '320px',
        width: '100%',
        padding: '12px',
        backgroundColor: '#1a1a1a',
        borderRadius: '40px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 0 2px #333',
        border: '4px solid #000'
      }}
    >
      <div 
        className="phone-notch"
        style={{
          position: 'absolute',
          top: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120px',
          height: '25px',
          backgroundColor: '#000',
          borderBottomLeftRadius: '16px',
          borderBottomRightRadius: '16px',
          zIndex: 10
        }}
      ></div>
      <div 
        style={{
          borderRadius: '28px',
          overflow: 'hidden',
          backgroundColor: '#000',
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {videoUrl ? (
          <video 
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: 'auto', display: 'block', aspectRatio: '9/19.5', objectFit: 'cover' }}
          />
        ) : (
          <img 
            src={imageSrc || imgUrl} 
            alt={alt || "App Demo"} 
            loading="lazy" 
            style={{ width: '100%', height: 'auto', display: 'block', aspectRatio: '9/19.5', objectFit: 'cover' }} 
          />
        )}
      </div>
    </motion.div>
  );
}
